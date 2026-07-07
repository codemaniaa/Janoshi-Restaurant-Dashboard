import { Card, SectionHeader } from "../common/UIKit";

const ChartCard = ({ eyebrow, title, action, children, className = "" }) => (
  <Card className={className}>
    <SectionHeader eyebrow={eyebrow} title={title} action={action} />
    {children}
  </Card>
);

export default ChartCard;
