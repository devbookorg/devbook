import { User, ChevronDown, ChevronUp, Heart, HeartFill, Sun, ArrowLeft } from '@/assets/icons';

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

export { ChevronDown, ChevronUp, Heart, HeartFill, Sun, ArrowLeft, User };
