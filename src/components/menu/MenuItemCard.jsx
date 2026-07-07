import { PiPencilSimpleBold, PiTrashBold, PiClockBold } from "react-icons/pi";
import { Badge } from "../common/UIKit";
import { formatCurrency } from "../../utils/format";

const MenuItemCard = ({ item, onEdit, onDelete }) => (
  <div className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#C9A227]/40 transition-all duration-200">
    <div className="relative h-32 bg-gray-100">
      <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
      <div className="absolute top-2 left-2 flex gap-1.5">
        {item.offer && <Badge tone="gold">-{item.offer.discountPercent}%</Badge>}
        {item.lowStock && <Badge tone="danger">Low Stock</Badge>}
        {!item.available && <Badge tone="neutral">Unavailable</Badge>}
      </div>
      <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(item)} className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-sm text-[#0B1F4D]"><PiPencilSimpleBold size={13} /></button>
        <button onClick={() => onDelete(item.id)} className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-sm text-red-500"><PiTrashBold size={13} /></button>
      </div>
    </div>
    <div className="p-3.5">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm text-[#0B1F4D] truncate">{item.name}</p>
      </div>
      <p className="text-[11px] text-gray-400 mb-1.5">{item.category}</p>
      <div className="flex items-center justify-between">
        <div>
          {item.offer ? (
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-semibold text-[#0B1F4D]">{formatCurrency(item.discountedPrice)}</span>
              <span className="text-xs text-gray-400 line-through">{formatCurrency(item.price)}</span>
            </div>
          ) : (
            <span className="font-display font-semibold text-[#0B1F4D]">{formatCurrency(item.price)}</span>
          )}
        </div>
        <span className="flex items-center gap-1 text-[11px] text-gray-400"><PiClockBold size={11} /> {item.prepTime}m</span>
      </div>
    </div>
  </div>
);

export default MenuItemCard;
