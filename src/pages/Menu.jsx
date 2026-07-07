import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PiPlusBold, PiSquaresFourBold, PiTableBold, PiPencilSimpleBold, PiTrashBold } from "react-icons/pi";
import { useRestaurant } from "../contexts/RestaurantContext";
import { useUI } from "../contexts/UIContext";
import { Card, Button, Badge, SearchInput, SectionHeader } from "../components/common/UIKit";
import Table from "../components/common/Table";
import ConfirmDialog from "../components/common/ConfirmDialog";
import MenuItemCard from "../components/menu/MenuItemCard";
import MenuItemModal from "../components/menu/MenuItemModal";
import { formatCurrency } from "../utils/format";

const CATEGORIES = ["All", "Fast Food", "Ice Cream", "Drinks", "Cakes", "Brownies"];

const Menu = () => {
  const { menu, deleteMenuItem } = useRestaurant();
  const { pushToast } = useUI();
  const location = useLocation();

  const [view, setView] = useState("grid");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    if (location.state?.openCreate) { setEditing(null); setModalOpen(true); }
  }, [location.state]);

  const filtered = useMemo(() => {
    return menu.filter((m) => (category === "All" || m.category === category) && m.name.toLowerCase().includes(search.toLowerCase()));
  }, [menu, category, search]);

  const columns = [
    { key: "name", header: "Item", render: (m) => <div className="flex items-center gap-2.5"><img src={m.image} className="w-9 h-9 rounded-lg object-cover" /> <span className="font-medium text-[#0B1F4D]">{m.name}</span></div> },
    { key: "category", header: "Category", render: (m) => <Badge tone="royal">{m.category}</Badge> },
    { key: "price", header: "Price", render: (m) => formatCurrency(m.offer ? m.discountedPrice : m.price) },
    { key: "prepTime", header: "Prep Time", render: (m) => `${m.prepTime} min` },
    { key: "status", header: "Status", render: (m) => (
      <div className="flex gap-1.5">
        <Badge tone={m.available ? "success" : "neutral"}>{m.available ? "Available" : "Unavailable"}</Badge>
        {m.lowStock && <Badge tone="danger">Low Stock</Badge>}
      </div>
    )},
    { key: "actions", header: "", render: (m) => (
      <div className="flex gap-2">
        <button onClick={() => { setEditing(m); setModalOpen(true); }} className="text-[#0B1F4D]"><PiPencilSimpleBold size={15} /></button>
        <button onClick={() => setToDelete(m.id)} className="text-red-500"><PiTrashBold size={15} /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <SectionHeader eyebrow="Kitchen Catalogue" title="Menu Management" />
        <Button icon={PiPlusBold} onClick={() => { setEditing(null); setModalOpen(true); }}>Add Menu Item</Button>
      </div>

      <Card noPadding className="p-4 md:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-5">
          <SearchInput value={search} onChange={setSearch} placeholder="Search menu items..." className="lg:max-w-xs" />
          <div className="flex gap-2 flex-wrap flex-1">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors ${category === c ? "bg-[#0B1F4D] text-white border-[#0B1F4D]" : "border-gray-200 text-gray-500 hover:border-[#0B1F4D]/40"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="flex gap-1 bg-gray-50 rounded-lg p-1">
            <button onClick={() => setView("grid")} className={`w-8 h-8 rounded-md flex items-center justify-center ${view === "grid" ? "bg-white shadow-sm text-[#0B1F4D]" : "text-gray-400"}`}><PiSquaresFourBold size={15} /></button>
            <button onClick={() => setView("table")} className={`w-8 h-8 rounded-md flex items-center justify-center ${view === "table" ? "bg-white shadow-sm text-[#0B1F4D]" : "text-gray-400"}`}><PiTableBold size={15} /></button>
          </div>
        </div>

        {view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((m) => (
              <MenuItemCard key={m.id} item={m} onEdit={(item) => { setEditing(item); setModalOpen(true); }} onDelete={setToDelete} />
            ))}
          </div>
        ) : (
          <Table columns={columns} rows={filtered} emptyTitle="No menu items found" />
        )}
      </Card>

      <MenuItemModal open={modalOpen} onClose={() => setModalOpen(false)} item={editing} />
      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Remove this menu item?"
        onConfirm={() => { deleteMenuItem(toDelete); pushToast("Menu item removed"); }}
      />
    </div>
  );
};

export default Menu;
