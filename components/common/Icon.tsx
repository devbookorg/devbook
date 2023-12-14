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
  CheckCircle,
  XCircle,
  Search,
  Alert,
  Spinner,
  CornerDownRight,
} from '@/assets/icons';
import Button, { ButtonPropertyType } from './Button';
import { ButtonStyle } from '@/types/buttons';

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
  checkCircle: CheckCircle,
  xCircle: XCircle,
  search: Search,
  alert: Alert,
  spinner: Spinner,
  cornerDownRight: CornerDownRight,
};

type IconName =
  | 'chevronDown'
  | 'chevronUp'
  | 'heart'
  | 'heartFill'
  | 'sun'
  | 'user'
  | 'arrowLeft'
  | 'bell'
  | 'edit'
  | 'trash'
  | 'close'
  | 'pen'
  | 'chevronLeft'
  | 'chevronRight'
  | 'settings'
  | 'moon'
  | 'bellUpdate'
  | 'checkCircle'
  | 'xCircle'
  | 'search'
  | 'alert'
  | 'spinner'
  | 'cornerDownRight';

export default function Icon({ name, className }: { name: IconName; className?: string }) {
  const IconComponent = iconComponents[name];
  return <IconComponent className={className} />;
}

export function ButtonIcon({
  iconName,
  btnStyle,
  svgStyles,
  buttonStyles,
  text,
  handleClick,
  disabled,
  btnType,
}: {
  btnStyle?: ButtonStyle;
  iconName: IconName;
  svgStyles?: string;
  buttonStyles?: string;
  text?: string;
  handleClick?: () => void;
  disabled?: boolean;
  btnType?: ButtonPropertyType;
}) {
  const IconComponent = iconComponents[iconName];
  return (
    <Button
      btnStyle={btnStyle ?? 'sm-ghost'}
      styles={buttonStyles}
      handleClick={handleClick}
      disabled={disabled}
      type={btnType}
    >
      <IconComponent className={svgStyles} />
      {text}
    </Button>
  );
}
