import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { initialMenu } from "../data/menu";
import { initialInventory } from "../data/inventory";
import { initialCustomers } from "../data/customers";
import { initialStaff } from "../data/staff";
import { initialTables } from "../data/tables";
import { initialBookings } from "../data/bookings";
import { initialOffers } from "../data/offers";
import { initialOrders } from "../data/orders";
import { initialStandalonePayments } from "../data/payments";
import { initialNotifications } from "../data/notifications";
import { nextId } from "../utils/id";

const RestaurantContext = createContext(null);

const startOfDay = (d) => new Date(new Date(d).setHours(0, 0, 0, 0));
const isSameDay = (a, b) => startOfDay(a).getTime() === startOfDay(b).getTime();
const daysAgo = (n) => new Date(Date.now() - n * 86400000);

export function RestaurantProvider({ children }) {
  const [menu, setMenu] = useState(initialMenu);
  const [inventory, setInventory] = useState(initialInventory);
  const [customers, setCustomers] = useState(initialCustomers);
  const [staff, setStaff] = useState(initialStaff);
  const [tables, setTables] = useState(initialTables);
  const [bookings, setBookings] = useState(initialBookings);
  const [offers, setOffers] = useState(initialOffers);
  const [orders, setOrders] = useState(initialOrders);
  const [standalonePayments] = useState(initialStandalonePayments);
  const [notifications, setNotifications] = useState(initialNotifications);

  /* ---------------- DERIVED / COMPUTED STATE (the "wiring") ---------------- */

  const activeOffersByMenuId = useMemo(() => {
    const map = {};
    const now = new Date();
    offers
      .filter((o) => o.status === "Active" && new Date(o.startDate) <= now && new Date(o.endDate) >= now)
      .forEach((o) => o.appliesTo.forEach((mId) => { map[mId] = o; }));
    return map;
  }, [offers]);

  const menuWithLiveData = useMemo(() => {
    return menu.map((item) => {
      const lowIngredient = item.ingredients?.some((ing) => {
        const inv = inventory.find((i) => i.id === ing.id);
        return inv && inv.stock <= inv.threshold;
      });
      const offer = activeOffersByMenuId[item.id];
      const discountedPrice = offer ? Math.round(item.price * (1 - offer.discountPercent / 100)) : item.price;
      return { ...item, lowStock: !!lowIngredient, offer, discountedPrice };
    });
  }, [menu, inventory, activeOffersByMenuId]);

  const payments = useMemo(() => {
    const fromOrders = orders.map((o) => ({
      id: `PAY-${o.id.split("-")[1]}`,
      orderId: o.id,
      customerName: o.customerName,
      amount: o.total ?? o.items.reduce((s, i) => s + i.qty * i.price, 0),
      method: o.paymentMethod,
      status: o.paymentStatus,
      date: o.createdAt,
    }));
    return [...fromOrders, ...standalonePayments].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [orders, standalonePayments]);

  const ordersEnriched = useMemo(() => {
    return orders.map((o) => {
      const subtotal = o.items.reduce((s, i) => s + i.qty * i.price, 0);
      const discount = o.discount || 0;
      const tax = Math.round((subtotal - discount) * 0.05);
      const total = subtotal - discount + tax;
      return { ...o, subtotal, tax, total };
    });
  }, [orders]);

  const lowStockItems = useMemo(() => inventory.filter((i) => i.stock <= i.threshold), [inventory]);

  const kpis = useMemo(() => {
    const today = ordersEnriched.filter((o) => isSameDay(o.createdAt, new Date()));
    const weekAgo = daysAgo(7);
    const monthAgo = daysAgo(30);
    const paidOnly = (list) => list.filter((o) => o.paymentStatus === "Paid");

    const todayRevenue = paidOnly(today).reduce((s, o) => s + o.total, 0);
    const weekRevenue = paidOnly(ordersEnriched.filter((o) => new Date(o.createdAt) >= weekAgo)).reduce((s, o) => s + o.total, 0);
    const monthRevenue = paidOnly(ordersEnriched.filter((o) => new Date(o.createdAt) >= monthAgo)).reduce((s, o) => s + o.total, 0);
    const completedOrders = ordersEnriched.filter((o) => o.status === "Completed");
    const avgOrderValue = completedOrders.length
      ? Math.round(completedOrders.reduce((s, o) => s + o.total, 0) / completedOrders.length)
      : 0;

    return {
      todayRevenue,
      weekRevenue,
      monthRevenue,
      todayOrders: today.length,
      pendingOrders: ordersEnriched.filter((o) => o.status === "Pending").length,
      preparingOrders: ordersEnriched.filter((o) => o.status === "Preparing").length,
      completedOrders: completedOrders.length,
      cancelledOrders: ordersEnriched.filter((o) => o.status === "Cancelled").length,
      avgOrderValue,
      availableTables: tables.filter((t) => t.status === "Available").length,
      occupiedTables: tables.filter((t) => t.status === "Occupied").length,
      reservations: bookings.filter((b) => b.status === "Confirmed" || b.status === "Waitlist").length,
      lowStockCount: lowStockItems.length,
    };
  }, [ordersEnriched, tables, bookings, lowStockItems]);

  const topSelling = useMemo(() => {
    const counts = {};
    ordersEnriched.forEach((o) => {
      if (o.status === "Cancelled") return;
      o.items.forEach((i) => {
        counts[i.name] = counts[i.name] || { name: i.name, qty: 0, revenue: 0 };
        counts[i.name].qty += i.qty;
        counts[i.name].revenue += i.qty * i.price;
      });
    });
    return Object.values(counts).sort((a, b) => b.qty - a.qty).slice(0, 6);
  }, [ordersEnriched]);

  const categorySales = useMemo(() => {
    const byCat = {};
    ordersEnriched.forEach((o) => {
      if (o.status === "Cancelled") return;
      o.items.forEach((i) => {
        const menuItem = menu.find((m) => m.id === i.menuId);
        const cat = menuItem?.category || "Other";
        byCat[cat] = (byCat[cat] || 0) + i.qty * i.price;
      });
    });
    return Object.entries(byCat).map(([name, value]) => ({ name, value }));
  }, [ordersEnriched, menu]);

  const paymentDistribution = useMemo(() => {
    const byMethod = {};
    payments.forEach((p) => {
      byMethod[p.method] = (byMethod[p.method] || 0) + p.amount;
    });
    return Object.entries(byMethod).map(([name, value]) => ({ name, value }));
  }, [payments]);

  const revenueTrend = useMemo(() => {
    const days = [...Array(7)].map((_, idx) => daysAgo(6 - idx));
    return days.map((d) => ({
      name: d.toLocaleDateString("en-US", { weekday: "short" }),
      revenue: ordersEnriched
        .filter((o) => o.paymentStatus === "Paid" && isSameDay(o.createdAt, d))
        .reduce((s, o) => s + o.total, 0),
    }));
  }, [ordersEnriched]);

  const ordersTrend = useMemo(() => {
    const days = [...Array(7)].map((_, idx) => daysAgo(6 - idx));
    return days.map((d) => ({
      name: d.toLocaleDateString("en-US", { weekday: "short" }),
      orders: ordersEnriched.filter((o) => isSameDay(o.createdAt, d)).length,
    }));
  }, [ordersEnriched]);

  const liveAlerts = useMemo(() => {
    return lowStockItems.map((i) => ({
      id: `alert-${i.id}`,
      type: "inventory",
      message: `${i.name} is low on stock (${i.stock}${i.unit} left)`,
      time: new Date().toISOString(),
      read: false,
      live: true,
    }));
  }, [lowStockItems]);

  const recentActivity = useMemo(() => {
    const activities = [];
    ordersEnriched.slice(0, 8).forEach((o) =>
      activities.push({ id: `act-${o.id}`, time: o.createdAt, text: `Order ${o.id} (${o.type}) — ${o.status}` })
    );
    bookings.slice(0, 4).forEach((b) =>
      activities.push({ id: `act-${b.id}`, time: b.time, text: `Table booking for ${b.customerName} — ${b.status}` })
    );
    return activities.sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10);
  }, [ordersEnriched, bookings]);

  /* ---------------- ACTIONS ---------------- */

  const createOrder = useCallback((draft) => {
    const id = nextId("ORD");
    const subtotal = draft.items.reduce((s, i) => s + i.qty * i.price, 0);
    const discount = draft.discount || 0;
    const tax = Math.round((subtotal - discount) * 0.05);
    const total = subtotal - discount + tax;
    const order = {
      id,
      customerId: draft.customerId || "CUST-07",
      customerName: draft.customerName || "Walk-in Customer",
      type: draft.type || "Dine-in",
      tableId: draft.tableId || null,
      items: draft.items,
      status: "Pending",
      paymentStatus: draft.paymentStatus || "Pending",
      paymentMethod: draft.paymentMethod || "Cash",
      createdAt: new Date().toISOString(),
      chef: null,
      discount,
      subtotal,
      tax,
      total,
    };
    setOrders((prev) => [order, ...prev]);

    setInventory((prev) =>
      prev.map((inv) => {
        let used = 0;
        draft.items.forEach((line) => {
          const menuItem = menu.find((m) => m.id === line.menuId);
          const ing = menuItem?.ingredients?.find((x) => x.id === inv.id);
          if (ing) used += ing.qty * line.qty;
        });
        return used ? { ...inv, stock: Math.max(0, +(inv.stock - used).toFixed(2)) } : inv;
      })
    );

    if (draft.tableId) {
      setTables((prev) => prev.map((t) => (t.id === draft.tableId ? { ...t, status: "Occupied" } : t)));
    }

    setNotifications((prev) => [
      { id: nextId("NTF"), type: "order", message: `New order ${id} received (${order.type})`, time: new Date().toISOString(), read: false },
      ...prev,
    ]);

    return order;
  }, [menu]);

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    if (status === "Completed" || status === "Cancelled") {
      setOrders((prev) => {
        const order = prev.find((o) => o.id === orderId);
        if (order?.tableId) {
          setTables((tprev) => tprev.map((t) => (t.id === order.tableId ? { ...t, status: "Cleaning" } : t)));
        }
        return prev;
      });
    }
  }, []);

  const assignChef = useCallback((orderId, chefId) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, chef: chefId } : o)));
  }, []);

  const deleteOrder = useCallback((orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  }, []);

  const updatePaymentStatus = useCallback((orderId, status) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: status } : o)));
  }, []);

  const upsertMenuItem = useCallback((item) => {
    setMenu((prev) => {
      const exists = prev.some((m) => m.id === item.id);
      if (exists) return prev.map((m) => (m.id === item.id ? { ...m, ...item } : m));
      return [{ ...item, id: nextId("MENU") }, ...prev];
    });
  }, []);

  const deleteMenuItem = useCallback((id) => setMenu((prev) => prev.filter((m) => m.id !== id)), []);

  const upsertOffer = useCallback((offer) => {
    setOffers((prev) => {
      const exists = prev.some((o) => o.id === offer.id);
      if (exists) return prev.map((o) => (o.id === offer.id ? { ...o, ...offer } : o));
      return [{ ...offer, id: nextId("OFR"), used: 0 }, ...prev];
    });
  }, []);

  const deleteOffer = useCallback((id) => setOffers((prev) => prev.filter((o) => o.id !== id)), []);

  const upsertInventoryItem = useCallback((item) => {
    setInventory((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) return prev.map((i) => (i.id === item.id ? { ...i, ...item } : i));
      return [{ ...item, id: nextId("INV") }, ...prev];
    });
  }, []);

  const deleteInventoryItem = useCallback((id) => setInventory((prev) => prev.filter((i) => i.id !== id)), []);

  const restockInventory = useCallback((id, amount) => {
    setInventory((prev) => prev.map((i) => (i.id === id ? { ...i, stock: i.stock + amount } : i)));
  }, []);

  const upsertStaff = useCallback((member) => {
    setStaff((prev) => {
      const exists = prev.some((s) => s.id === member.id);
      if (exists) return prev.map((s) => (s.id === member.id ? { ...s, ...member } : s));
      return [{ ...member, id: nextId("STF") }, ...prev];
    });
  }, []);

  const deleteStaff = useCallback((id) => setStaff((prev) => prev.filter((s) => s.id !== id)), []);

  const upsertBooking = useCallback((booking) => {
    setBookings((prev) => {
      const exists = prev.some((b) => b.id === booking.id);
      if (exists) return prev.map((b) => (b.id === booking.id ? { ...b, ...booking } : b));
      return [{ ...booking, id: nextId("BKG") }, ...prev];
    });
    if (booking.tableId) {
      const nextStatus = booking.status === "Seated" ? "Occupied" : booking.status === "Confirmed" ? "Reserved" : undefined;
      if (nextStatus) setTables((prev) => prev.map((t) => (t.id === booking.tableId ? { ...t, status: nextStatus } : t)));
    }
  }, []);

  const deleteBooking = useCallback((id) => setBookings((prev) => prev.filter((b) => b.id !== id)), []);

  const updateTableStatus = useCallback((id, status) => {
    setTables((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }, []);

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const value = {
    menu: menuWithLiveData,
    rawMenu: menu,
    inventory,
    customers,
    staff,
    tables,
    bookings,
    offers,
    orders: ordersEnriched,
    payments,
    notifications: [...liveAlerts, ...notifications],
    kpis,
    topSelling,
    categorySales,
    paymentDistribution,
    revenueTrend,
    ordersTrend,
    lowStockItems,
    recentActivity,
    activeOffersByMenuId,

    createOrder,
    updateOrderStatus,
    assignChef,
    deleteOrder,
    updatePaymentStatus,
    upsertMenuItem,
    deleteMenuItem,
    upsertOffer,
    deleteOffer,
    upsertInventoryItem,
    deleteInventoryItem,
    restockInventory,
    upsertStaff,
    deleteStaff,
    upsertBooking,
    deleteBooking,
    updateTableStatus,
    markNotificationRead,
    markAllNotificationsRead,
  };

  return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>;
}

export const useRestaurant = () => {
  const ctx = useContext(RestaurantContext);
  if (!ctx) throw new Error("useRestaurant must be used within RestaurantProvider");
  return ctx;
};
