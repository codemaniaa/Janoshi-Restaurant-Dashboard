import { PiMagnifyingGlassBold, PiCaretLeftBold, PiCaretRightBold, PiTrayBold } from "react-icons/pi";

export const Button = ({ children, variant = "primary", size = "md", icon: Icon, className = "", ...props }) => {
  const sizes = { sm: "px-3 py-1.5 text-xs gap-1.5", md: "px-4 py-2.5 text-sm gap-2", lg: "px-6 py-3 text-sm gap-2" };
  const variants = {
    primary: "bg-[#0B1F4D] text-white hover:bg-[#132a63] shadow-sm shadow-[#0B1F4D]/20",
    gold: "bg-[#C9A227] text-[#0B1F4D] hover:bg-[#b8931f] shadow-sm shadow-[#C9A227]/30",
    outline: "border border-gray-200 text-[#0B1F4D] hover:border-[#0B1F4D] bg-white",
    ghost: "text-[#0B1F4D] hover:bg-[#0B1F4D]/5",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
  };
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
};

export const Badge = ({ children, tone = "neutral", className = "" }) => {
  const tones = {
    neutral: "bg-gray-100 text-gray-600",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-red-50 text-red-600",
    royal: "bg-[#0B1F4D]/8 text-[#0B1F4D]",
    gold: "bg-[#C9A227]/15 text-[#8a6c14]",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
};

export const Card = ({ children, className = "", noPadding = false }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)] ${noPadding ? "" : "p-5 md:p-6"} ${className}`}>
    {children}
  </div>
);

export const Avatar = ({ name = "?", color = "#0B1F4D", size = 36, src }) => {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  if (src) return <img src={src} alt={name} style={{ width: size, height: size }} className="rounded-full object-cover" />;
  return (
    <div
      style={{ width: size, height: size, background: color }}
      className="rounded-full flex items-center justify-center text-white font-semibold shrink-0"
    >
      <span style={{ fontSize: size * 0.38 }}>{initials}</span>
    </div>
  );
};

export const SearchInput = ({ value, onChange, placeholder = "Search...", className = "" }) => (
  <div className={`relative ${className}`}>
    <PiMagnifyingGlassBold className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-200 bg-gray-50/60 pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:border-[#0B1F4D]/40 outline-none transition-colors"
    />
  </div>
);

export const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-xs text-gray-500">Page {page} of {totalPages}</p>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-[#0B1F4D]/40 disabled:opacity-30"
        >
          <PiCaretLeftBold size={13} />
        </button>
        <button
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-[#0B1F4D]/40 disabled:opacity-30"
        >
          <PiCaretRightBold size={13} />
        </button>
      </div>
    </div>
  );
};

export const EmptyState = ({ title = "Nothing here yet", subtitle = "", icon: Icon = PiTrayBold }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-14 h-14 rounded-2xl bg-[#0B1F4D]/5 flex items-center justify-center mb-4">
      <Icon size={24} className="text-[#0B1F4D]/40" />
    </div>
    <p className="font-semibold text-gray-700">{title}</p>
    {subtitle && <p className="text-sm text-gray-400 mt-1 max-w-xs">{subtitle}</p>}
  </div>
);

export const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-100 rounded-lg ${className}`} />
);

export const SectionHeader = ({ eyebrow, title, action }) => (
  <div className="flex items-center justify-between mb-5">
    <div>
      {eyebrow && <p className="text-[11px] uppercase tracking-[0.15em] text-[#C9A227] font-semibold mb-1">{eyebrow}</p>}
      <h2 className="font-display text-lg font-semibold text-[#0B1F4D]">{title}</h2>
    </div>
    {action}
  </div>
);
