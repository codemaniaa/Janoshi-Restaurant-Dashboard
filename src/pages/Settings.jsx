import { useState } from "react";
import {
  PiStorefrontBold, PiClockBold, PiCurrencyCircleDollarBold, PiReceiptBold,
  PiBellSimpleBold, PiShieldCheckBold, PiUsersBold,
} from "react-icons/pi";
import { useUI } from "../contexts/UIContext";
import { Card, Button, SectionHeader, Avatar } from "../components/common/UIKit";

const SECTIONS = [
  { key: "profile", label: "Restaurant Profile", icon: PiStorefrontBold },
  { key: "hours", label: "Business Hours", icon: PiClockBold },
  { key: "finance", label: "Currency & Taxes", icon: PiCurrencyCircleDollarBold },
  { key: "receipt", label: "Receipt Settings", icon: PiReceiptBold },
  { key: "notifications", label: "Notifications", icon: PiBellSimpleBold },
  { key: "security", label: "Security", icon: PiShieldCheckBold },
  { key: "users", label: "Users", icon: PiUsersBold },
];

const Field = ({ label, children }) => (
  <div>
    <label className="text-xs font-semibold text-gray-500 mb-1.5 block">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40";

const Settings = () => {
  const { pushToast } = useUI();
  const [active, setActive] = useState("profile");

  const save = () => pushToast("Settings saved successfully");

  return (
    <div className="space-y-5">
      <SectionHeader eyebrow="Configuration" title="Settings" />

      <div className="grid lg:grid-cols-4 gap-5">
        <Card noPadding className="p-3 h-fit lg:sticky lg:top-24">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium mb-1 ${active === s.key ? "bg-[#0B1F4D] text-white" : "text-gray-500 hover:bg-gray-50"}`}
            >
              <s.icon size={17} /> {s.label}
            </button>
          ))}
        </Card>

        <Card className="lg:col-span-3">
          {active === "profile" && (
            <div className="space-y-4">
              <SectionHeader title="Restaurant Profile" />
              <div className="flex items-center gap-4">
                <Avatar name="Janoshi Okara" color="#0B1F4D" size={56} />
                <Button variant="outline" size="sm">Change Logo</Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Restaurant Name"><input defaultValue="Janoshi" className={inputCls} /></Field>
                <Field label="Location"><input defaultValue="Okara, Pakistan" className={inputCls} /></Field>
                <Field label="Contact Phone"><input defaultValue="042-111-000-000" className={inputCls} /></Field>
                <Field label="Contact Email"><input defaultValue="hello@janoshi.pk" className={inputCls} /></Field>
              </div>
              <Field label="Cuisines"><input defaultValue="Fast Food, Ice Cream, Drinks, Cakes, Brownies" className={inputCls} /></Field>
            </div>
          )}

          {active === "hours" && (
            <div className="space-y-3">
              <SectionHeader title="Business Hours" />
              {["Monday - Thursday", "Friday", "Saturday - Sunday"].map((d) => (
                <div key={d} className="grid grid-cols-3 gap-3 items-center">
                  <span className="text-sm text-gray-600">{d}</span>
                  <input type="time" defaultValue="12:00" className={inputCls} />
                  <input type="time" defaultValue="23:30" className={inputCls} />
                </div>
              ))}
            </div>
          )}

          {active === "finance" && (
            <div className="space-y-4">
              <SectionHeader title="Currency & Taxes" />
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Currency"><select className={inputCls}><option>PKR — Rs.</option><option>USD — $</option></select></Field>
                <Field label="Sales Tax (%)"><input type="number" defaultValue="5" className={inputCls} /></Field>
                <Field label="Service Charge (%)"><input type="number" defaultValue="0" className={inputCls} /></Field>
                <Field label="Rounding"><select className={inputCls}><option>Nearest Rupee</option><option>None</option></select></Field>
              </div>
            </div>
          )}

          {active === "receipt" && (
            <div className="space-y-4">
              <SectionHeader title="Receipt Settings" />
              <Field label="Receipt Footer Note"><input defaultValue="Thank you for dining with Janoshi!" className={inputCls} /></Field>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Show Logo on Receipt"><select className={inputCls}><option>Yes</option><option>No</option></select></Field>
                <Field label="Print Customer Copy"><select className={inputCls}><option>Yes</option><option>No</option></select></Field>
              </div>
            </div>
          )}

          {active === "notifications" && (
            <div className="space-y-3">
              <SectionHeader title="Notification Preferences" />
              {["New Orders", "Low Inventory Alerts", "Payment Failures", "New Reservations"].map((n) => (
                <label key={n} className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100">
                  <span className="text-sm text-gray-600">{n}</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </label>
              ))}
            </div>
          )}

          {active === "security" && (
            <div className="space-y-4">
              <SectionHeader title="Security" />
              <Field label="Current Password"><input type="password" className={inputCls} /></Field>
              <Field label="New Password"><input type="password" className={inputCls} /></Field>
              <label className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100">
                <span className="text-sm text-gray-600">Two-Factor Authentication</span>
                <input type="checkbox" className="w-4 h-4" />
              </label>
            </div>
          )}

          {active === "users" && (
            <div className="space-y-3">
              <SectionHeader title="Users & Access" action={<Button size="sm" variant="gold">Invite User</Button>} />
              {["Fahad Iqbal — Manager", "Imran Sheikh — Head Chef", "Zainab Noor — Cashier"].map((u) => (
                <div key={u} className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 text-sm text-gray-600">
                  {u}
                </div>
              ))}
            </div>
          )}

          <div className="pt-6 mt-6 border-t border-gray-100">
            <Button onClick={save}>Save Changes</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
