import {
  User,
  ChevronDown,
  ChevronUp,
  Heart,
  HeartFill,
  Sun,
  ArrowLeft,
  Bell,
  Edit,
  Trash,
  Close,
  Pen,
  ChevronLeft,
  ChevronRight,
  Settings,
  Moon,
  BellUpdate,
} from '@/assets/icons';

// SVG 컴포넌트에 대한 인터페이스
interface IconComponents {
  [key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
}
const iconComponents: IconComponents = {
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  heart: Heart,
  heartFill: HeartFill,
  sun: Sun,
  user: User,
  arrowLeft: ArrowLeft,
  bell: Bell,
  edit: Edit,
  trash: Trash,
  close: Close,
  pen: Pen,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  settings: Settings,
  moon: Moon,
  bellUpdate: BellUpdate,
};

export default function Icon({
  name,
  className,
}: {
  name: keyof IconComponents;
  className?: string;
}) {
  const IconComponent = iconComponents[name];
  return <IconComponent className={className} />;
}

export {
  ChevronDown,
  ChevronUp,
  Heart,
  HeartFill,
  Sun,
  ArrowLeft,
  User,
  Bell,
  Edit,
  Trash,
  Close,
  Pen,
  ChevronLeft,
  ChevronRight,
  Moon,
  BellUpdate,
  Settings,
};
