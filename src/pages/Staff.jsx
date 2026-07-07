import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PiPlusBold, PiSquaresFourBold, PiTableBold, PiPencilSimpleBold, PiTrashBold } from "react-icons/pi";
import { useRestaurant } from "../contexts/RestaurantContext";
import { useUI } from "../contexts/UIContext";
import { Card, Button, Badge, SearchInput, SectionHeader, Avatar } from "../components/common/UIKit";
import Table from "../components/common/Table";
import ConfirmDialog from "../components/common/ConfirmDialog";
import StaffCard from "../components/staff/StaffCard";
import StaffModal from "../components/staff/StaffModal";
import { formatCurrency } from "../utils/format";

const STATUS_TONE = { "On Shift": "success", "On Break": "warning", "On Delivery": "royal", "Off Duty": "neutral" };

const Staff = () => {
  const { staff, deleteStaff } = useRestaurant();
  const { pushToast } = useUI();
  const location = useLocation();

  const [view, setView] = useState("cards");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    if (location.state?.openCreate) { setEditing(null); setModalOpen(true); }
  }, [location.state]);

  const filtered = useMemo(() => staff.filter((s) => `${s.name} ${s.role}`.toLowerCase().includes(search.toLowerCase())), [staff, search]);

  const columns = [
    { key: "name", header: "Employee", render: (s) => <div className="flex items-center gap-2.5"><Avatar name={s.name} color={s.color} size={30} /> <span className="font-medium text-[#0B1F4D]">{s.name}</span></div> },
    { key: "role", header: "Role" },
    { key: "status", header: "Status", render: (s) => <Badge tone={STATUS_TONE[s.status]}>{s.status}</Badge> },
    { key: "shift", header: "Shift" },
    { key: "salary", header: "Salary", render: (s) => formatCurrency(s.salary) },
    { key: "performance", header: "Performance", render: (s) => `${s.performance}%` },
    { key: "actions", header: "", render: (s) => (
      <div className="flex gap-2">
        <button onClick={() => { setEditing(s); setModalOpen(true); }} className="text-[#0B1F4D]"><PiPencilSimpleBold size={15} /></button>
        <button onClick={() => setToDelete(s.id)} className="text-red-500"><PiTrashBold size={15} /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <SectionHeader eyebrow="Team" title="Staff Management" />
        <Button icon={PiPlusBold} onClick={() => { setEditing(null); setModalOpen(true); }}>Add Staff Member</Button>
      </div>

      <Card noPadding className="p-4 md:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-5">
          <SearchInput value={search} onChange={setSearch} placeholder="Search staff by name or role..." className="lg:max-w-xs" />
          <div className="flex-1" />
          <div className="flex gap-1 bg-gray-50 rounded-lg p-1">
            <button onClick={() => setView("cards")} className={`w-8 h-8 rounded-md flex items-center justify-center ${view === "cards" ? "bg-white shadow-sm text-[#0B1F4D]" : "text-gray-400"}`}><PiSquaresFourBold size={15} /></button>
            <button onClick={() => setView("table")} className={`w-8 h-8 rounded-md flex items-center justify-center ${view === "table" ? "bg-white shadow-sm text-[#0B1F4D]" : "text-gray-400"}`}><PiTableBold size={15} /></button>
          </div>
        </div>

        {view === "cards" ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {filtered.map((s) => (
              <StaffCard key={s.id} member={s} onEdit={(m) => { setEditing(m); setModalOpen(true); }} onDelete={setToDelete} />
            ))}
          </div>
        ) : (
          <Table columns={columns} rows={filtered} emptyTitle="No staff members found" />
        )}
      </Card>

      <StaffModal open={modalOpen} onClose={() => setModalOpen(false)} member={editing} />
      <ConfirmDialog open={!!toDelete} onClose={() => setToDelete(null)} title="Remove this staff member?" onConfirm={() => { deleteStaff(toDelete); pushToast("Staff member removed"); }} />
    </div>
  );
};

export default Staff;
