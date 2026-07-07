import { Card, SectionHeader } from "../common/UIKit";
import { timeAgo } from "../../utils/format";

const RecentActivityFeed = ({ activities }) => (
  <Card>
    <SectionHeader eyebrow="Pulse" title="Recent Activity" />
    <div className="space-y-4">
      {activities.map((a, i) => (
        <div key={a.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span className="w-2 h-2 rounded-full bg-[#C9A227] mt-1.5" />
            {i < activities.length - 1 && <span className="w-px flex-1 bg-gray-100 my-1" />}
          </div>
          <div className="pb-1">
            <p className="text-sm text-gray-600 leading-snug">{a.text}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{timeAgo(a.time)}</p>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

export default RecentActivityFeed;
