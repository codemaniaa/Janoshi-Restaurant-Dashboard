import React, { useState, useMemo } from "react";
import {
  PiXBold,
  PiPlusBold,
  PiMinusBold,
  PiTrashBold,
  PiShoppingCartBold,
  PiForkKnifeBold,
  PiCreditCardBold,
  PiStorefrontBold,
  PiTruckBold,
  PiUserBold,
  PiPhoneBold,
  PiMapPinLineBold,
  PiHashBold,
  PiTagBold,
  PiPercentBold,
  PiNotePencilBold,
  PiMagnifyingGlassBold,
  PiCheckCircleBold,
} from "react-icons/pi";

const CATEGORIES = [
  "All",
  "Food",
  "Starter",
  "BBQ",
  "Pizza",
  "Burger",
  "Sandwich",
  "Pasta",
  "Rice",
  "Dessert",
  "Cold Drinks",
  "Hot Drinks",
  "Ice Cream",
  "Juice",
  "Others",
];

const MENU_ITEMS = [
  { id: 1, name: "Chicken Karahi", category: "Food", price: 1450 },
  { id: 2, name: "Beef Nihari", category: "Food", price: 950 },
  { id: 3, name: "Daal Chawal", category: "Food", price: 350 },
  { id: 4, name: "Chicken Wings", category: "Starter", price: 550 },
  { id: 5, name: "Spring Rolls", category: "Starter", price: 400 },
  { id: 6, name: "Seekh Kebab", category: "BBQ", price: 600 },
  { id: 7, name: "Chicken Tikka Boti", category: "BBQ", price: 700 },
  { id: 8, name: "Fajita Pizza", category: "Pizza", price: 1100 },
  { id: 9, name: "Margherita Pizza", category: "Pizza", price: 950 },
  { id: 10, name: "Zinger Burger", category: "Burger", price: 500 },
  { id: 11, name: "Beef Burger", category: "Burger", price: 550 },
  { id: 12, name: "Club Sandwich", category: "Sandwich", price: 480 },
  { id: 13, name: "Grilled Chicken Sandwich", category: "Sandwich", price: 460 },
  { id: 14, name: "Alfredo Pasta", category: "Pasta", price: 750 },
  { id: 15, name: "Arrabiata Pasta", category: "Pasta", price: 700 },
  { id: 16, name: "Chicken Biryani", category: "Rice", price: 450 },
  { id: 17, name: "Beef Pulao", category: "Rice", price: 500 },
  { id: 18, name: "Chicken Fried Rice", category: "Rice", price: 420 },
  { id: 19, name: "Gulab Jamun", category: "Dessert", price: 250 },
  { id: 20, name: "Chocolate Cake", category: "Dessert", price: 400 },
  { id: 21, name: "Coca Cola", category: "Cold Drinks", price: 150 },
  { id: 22, name: "Sprite", category: "Cold Drinks", price: 150 },
  { id: 23, name: "Green Tea", category: "Hot Drinks", price: 200 },
  { id: 24, name: "Coffee", category: "Hot Drinks", price: 350 },
  { id: 25, name: "Vanilla Scoop", category: "Ice Cream", price: 300 },
  { id: 26, name: "Chocolate Sundae", category: "Ice Cream", price: 380 },
  { id: 27, name: "Mango Juice", category: "Juice", price: 280 },
  { id: 28, name: "Orange Juice", category: "Juice", price: 280 },
  { id: 29, name: "Garlic Bread", category: "Others", price: 320 },
  { id: 30, name: "French Fries", category: "Others", price: 280 },
];

const TABLES = Array.from({ length: 12 }, (_, i) => `T-${i + 1}`);

const ORDER_TYPES = [
  { key: "Dine In", icon: PiForkKnifeBold },
  { key: "Takeaway", icon: PiStorefrontBold },
  { key: "Delivery", icon: PiTruckBold },
];

const PAYMENT_METHODS = ["Cash", "Card", "Online", "Wallet"];

const formatRs = (n) =>
  `Rs ${Number(n || 0).toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;

const NewOrderModal = ({ open, onClose }) => {
  const [orderType, setOrderType] = useState("Dine In");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tableNumber, setTableNumber] = useState(TABLES[0]);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [orderItems, setOrderItems] = useState([]);

  const [discountType, setDiscountType] = useState("fixed");
  const [discountValue, setDiscountValue] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [notes, setNotes] = useState("");

  const filteredMenu = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const addItem = (item) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setOrderItems((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id) => {
    setOrderItems((prev) => prev.filter((i) => i.id !== id));
  };

  const subtotal = useMemo(
    () => orderItems.reduce((sum, i) => sum + i.price * i.qty, 0),
    [orderItems]
  );

  const discountAmount = useMemo(() => {
    const val = Number(discountValue) || 0;
    if (discountType === "fixed") return Math.min(val, subtotal);
    return subtotal * (Math.min(val, 100) / 100);
  }, [discountType, discountValue, subtotal]);

  const afterDiscount = Math.max(subtotal - discountAmount, 0);
  const taxAmount = afterDiscount * 0.1;
  const grandTotal = afterDiscount + taxAmount;

  const resetForm = () => {
    setOrderType("Dine In");
    setCustomerName("");
    setPhoneNumber("");
    setTableNumber(TABLES[0]);
    setDeliveryAddress("");
    setActiveCategory("All");
    setSearchQuery("");
    setOrderItems([]);
    setDiscountType("fixed");
    setDiscountValue(0);
    setPaymentMethod("Cash");
    setNotes("");
  };

  const handleClearOrder = () => {
    setOrderItems([]);
    setDiscountValue(0);
    setNotes("");
  };

  const handleCreateOrder = () => {
    if (orderItems.length === 0) return;
    resetForm();
    onClose && onClose();
  };

  const handleClose = () => {
    onClose && onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
      <div className="w-full max-w-6xl max-h-[95vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 bg-[#0B1F4D] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
              <PiShoppingCartBold className="text-[#D4AF37] text-xl" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg leading-tight">
                New Order
              </h2>
              <p className="text-white/60 text-xs">Create a new restaurant order</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <PiXBold className="text-lg" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-4 sm:p-6">
            {/* LEFT: Order type, customer info, menu */}
            <div className="lg:col-span-2 space-y-5">
              {/* Order Type */}
              <div>
                <h3 className="text-sm font-semibold text-[#0B1F4D] mb-2">
                  Order Type
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {ORDER_TYPES.map(({ key, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setOrderType(key)}
                      className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border-2 transition-all duration-200 hover:-translate-y-0.5 ${
                        orderType === key
                          ? "border-[#0B1F4D] bg-[#0B1F4D] text-white shadow-md"
                          : "border-gray-200 text-gray-600 hover:border-[#0B1F4D]/40 bg-white"
                      }`}
                    >
                      <Icon className="text-xl" />
                      <span className="text-xs font-medium">{key}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="text-sm font-semibold text-[#0B1F4D] mb-2">
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <PiUserBold className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Customer Name"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1F4D]/30 focus:border-[#0B1F4D] transition-all"
                    />
                  </div>
                  <div className="relative">
                    <PiPhoneBold className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Phone Number"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1F4D]/30 focus:border-[#0B1F4D] transition-all"
                    />
                  </div>

                  {orderType === "Dine In" && (
                    <div className="relative sm:col-span-2">
                      <PiHashBold className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <select
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1F4D]/30 focus:border-[#0B1F4D] transition-all appearance-none bg-white"
                      >
                        {TABLES.map((t) => (
                          <option key={t} value={t}>
                            Table {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {orderType === "Delivery" && (
                    <div className="relative sm:col-span-2">
                      <PiMapPinLineBold className="absolute left-3 top-3 text-gray-400" />
                      <textarea
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Delivery Address"
                        rows={2}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1F4D]/30 focus:border-[#0B1F4D] transition-all resize-none"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Menu */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-[#0B1F4D]">Menu</h3>
                </div>

                <div className="relative mb-3">
                  <PiMagnifyingGlassBold className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search menu items..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1F4D]/30 focus:border-[#0B1F4D] transition-all"
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-thin">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 shrink-0 ${
                        activeCategory === cat
                          ? "bg-[#0B1F4D] text-white border-[#0B1F4D] shadow-sm"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#0B1F4D]/40"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[420px] overflow-y-auto pr-1">
                  {filteredMenu.map((item) => (
                    <div
                      key={item.id}
                      className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <div className="h-20 bg-gradient-to-br from-[#0B1F4D]/5 to-[#D4AF37]/10 flex items-center justify-center">
                        <PiForkKnifeBold className="text-2xl text-[#0B1F4D]/30" />
                      </div>
                      <div className="p-2.5">
                        <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#0B1F4D]/5 text-[#0B1F4D] mb-1">
                          {item.category}
                        </span>
                        <p className="text-xs font-semibold text-gray-800 leading-tight truncate">
                          {item.name}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-[#0B1F4D]">
                            {formatRs(item.price)}
                          </span>
                          <button
                            onClick={() => addItem(item)}
                            className="w-7 h-7 rounded-lg bg-[#D4AF37] text-white flex items-center justify-center hover:bg-[#0B1F4D] transition-all duration-200 active:scale-90"
                          >
                            <PiPlusBold className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredMenu.length === 0 && (
                    <div className="col-span-full text-center py-8 text-gray-400 text-sm">
                      No items found.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: Order summary, discount, payment, notes, totals */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 space-y-4 lg:sticky lg:top-0">
                <h3 className="text-sm font-semibold text-[#0B1F4D] flex items-center gap-2">
                  <PiShoppingCartBold /> Order Summary
                </h3>

                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {orderItems.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-6">
                      No items added yet.
                    </p>
                  )}
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl border border-gray-100 p-2.5 flex items-center justify-between gap-2"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {formatRs(item.price)} each
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <PiMinusBold className="text-[10px]" />
                        </button>
                        <span className="text-xs font-semibold w-4 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <PiPlusBold className="text-[10px]" />
                        </button>
                      </div>
                      <div className="text-right shrink-0 w-16">
                        <p className="text-xs font-bold text-[#0B1F4D]">
                          {formatRs(item.price * item.qty)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#EF4444] hover:bg-red-50 w-6 h-6 rounded-md flex items-center justify-center transition-colors shrink-0"
                      >
                        <PiTrashBold className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Discount */}
                <div>
                  <h4 className="text-xs font-semibold text-[#0B1F4D] mb-1.5 flex items-center gap-1.5">
                    <PiTagBold /> Discount
                  </h4>
                  <div className="flex gap-2 mb-2">
                    <button
                      onClick={() => setDiscountType("fixed")}
                      className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        discountType === "fixed"
                          ? "bg-[#0B1F4D] text-white border-[#0B1F4D]"
                          : "bg-white text-gray-600 border-gray-200"
                      }`}
                    >
                      <PiHashBold /> Fixed
                    </button>
                    <button
                      onClick={() => setDiscountType("percentage")}
                      className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        discountType === "percentage"
                          ? "bg-[#0B1F4D] text-white border-[#0B1F4D]"
                          : "bg-white text-gray-600 border-gray-200"
                      }`}
                    >
                      <PiPercentBold /> Percent
                    </button>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder={
                      discountType === "fixed" ? "Amount (Rs)" : "Percent (%)"
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1F4D]/30 focus:border-[#0B1F4D] transition-all"
                  />
                </div>

                {/* Payment */}
                <div>
                  <h4 className="text-xs font-semibold text-[#0B1F4D] mb-1.5 flex items-center gap-1.5">
                    <PiCreditCardBold /> Payment Method
                  </h4>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1F4D]/30 focus:border-[#0B1F4D] transition-all appearance-none bg-white"
                  >
                    {PAYMENT_METHODS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <h4 className="text-xs font-semibold text-[#0B1F4D] mb-1.5 flex items-center gap-1.5">
                    <PiNotePencilBold /> Order Notes
                  </h4>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder='e.g. "No onions", "Extra spicy"'
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1F4D]/30 focus:border-[#0B1F4D] transition-all resize-none"
                  />
                </div>

                {/* Totals */}
                <div className="bg-white rounded-xl border border-gray-100 p-3 space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-700">
                      {formatRs(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Discount</span>
                    <span className="font-medium text-[#EF4444]">
                      - {formatRs(discountAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Tax (10%)</span>
                    <span className="font-medium text-gray-700">
                      {formatRs(taxAmount)}
                    </span>
                  </div>
                  <div className="h-px bg-gray-100 my-1" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-[#0B1F4D]">
                      Grand Total
                    </span>
                    <span className="text-lg font-extrabold text-[#0B1F4D]">
                      {formatRs(grandTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-gray-100 bg-white px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 order-2 sm:order-1">
            <button
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleClearOrder}
              className="px-4 py-2.5 rounded-xl border border-[#EF4444]/30 text-[#EF4444] text-sm font-medium hover:bg-red-50 transition-all duration-200 flex items-center gap-1.5"
            >
              <PiTrashBold /> Clear Order
            </button>
          </div>
          <button
            onClick={handleCreateOrder}
            disabled={orderItems.length === 0}
            className="order-1 sm:order-2 px-5 py-2.5 rounded-xl bg-[#0B1F4D] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#0B1F4D]/90 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
          >
            <PiCheckCircleBold className="text-base" />
            Create Order — {formatRs(grandTotal)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrderModal;
