import ChevronDown from '@/assets/icons/chevronDown.svg';
import ChevronUp from '@/assets/icons/chevronUp.svg';
import Heart from '@/assets/icons/heart.svg';
import HeartFill from '@/assets/icons/heartFill.svg';
import Sun from '@/assets/icons/sun.svg';

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

export { ChevronDown, ChevronUp, Heart, HeartFill, Sun };
