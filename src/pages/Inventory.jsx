import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PiPlusBold, PiPencilSimpleBold, PiTrashBold, PiPackageBold } from "react-icons/pi";
import { useRestaurant } from "../contexts/RestaurantContext";
import { useUI } from "../contexts/UIContext";
import { Card, Button, Badge, SearchInput, SectionHeader } from "../components/common/UIKit";
import Table from "../components/common/Table";
import ConfirmDialog from "../components/common/ConfirmDialog";
import InventoryModal from "../components/inventory/InventoryModal";
import StockBar from "../components/inventory/StockBar";
import { formatCurrency, formatDate } from "../utils/format";

const Inventory = () => {
  const { inventory, deleteInventoryItem, restockInventory } = useRestaurant();
  const { pushToast } = useUI();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    if (location.state?.openCreate) { setEditing(null); setModalOpen(true); }
  }, [location.state]);

  const filtered = useMemo(() => inventory.filter((i) => i.name.toLowerCase().includes(search.toLowerCase())), [inventory, search]);
  const lowCount = inventory.filter((i) => i.stock <= i.threshold).length;

  const columns = [
    { key: "name", header: "Ingredient", render: (i) => <span className="font-medium text-[#0B1F4D]">{i.name}</span> },
    { key: "stock", header: "Stock", render: (i) => (
      <div className="flex items-center gap-2">
        <span className={i.stock <= i.threshold ? "text-red-600 font-semibold" : ""}>{i.stock} {i.unit}</span>
        <StockBar stock={i.stock} threshold={i.threshold} />
      </div>
    )},
    { key: "supplier", header: "Supplier" },
    { key: "expiry", header: "Expiry", render: (i) => formatDate(i.expiry) },
    { key: "cost", header: "Cost/Unit", render: (i) => formatCurrency(i.costPerUnit) },
    { key: "status", header: "Status", render: (i) => <Badge tone={i.stock <= i.threshold ? "danger" : "success"}>{i.stock <= i.threshold ? "Low Stock" : "Sufficient"}</Badge> },
    { key: "actions", header: "", render: (i) => (
      <div className="flex gap-2 items-center">
        <button onClick={() => { restockInventory(i.id, i.threshold); pushToast(`${i.name} restocked`); }} className="text-xs font-semibold text-[#C9A227]">Restock</button>
        <button onClick={() => { setEditing(i); setModalOpen(true); }} className="text-[#0B1F4D]"><PiPencilSimpleBold size={15} /></button>
        <button onClick={() => setToDelete(i.id)} className="text-red-500"><PiTrashBold size={15} /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <SectionHeader eyebrow="Stock Control" title="Inventory Management" />
        <Button icon={PiPlusBold} onClick={() => { setEditing(null); setModalOpen(true); }}>Add Ingredient</Button>
      </div>

      {lowCount > 0 && (
        <Card className="bg-red-50 border-red-100 flex items-center gap-3">
          <PiPackageBold size={20} className="text-red-500" />
          <p className="text-sm text-red-600 font-medium">{lowCount} ingredient(s) are running low and affecting menu availability.</p>
        </Card>
      )}

      <Card noPadding className="p-4 md:p-6">
        <SearchInput value={search} onChange={setSearch} placeholder="Search ingredients..." className="max-w-xs mb-5" />
        <Table columns={columns} rows={filtered} emptyTitle="No ingredients found" />
      </Card>

      <InventoryModal open={modalOpen} onClose={() => setModalOpen(false)} item={editing} />
      <ConfirmDialog open={!!toDelete} onClose={() => setToDelete(null)} title="Remove this ingredient?" onConfirm={() => { deleteInventoryItem(toDelete); pushToast("Ingredient removed"); }} />
    </div>
  );
};

export default Inventory;
