import { Badge } from '@/components/ui/badge';
import { Star, Tag, TrendingUp, Sparkles, Clock, AlertTriangle } from 'lucide-react';

interface MenuItemBadgeProps {
  badge: string | null | undefined;
  className?: string;
}

const getBadgeConfig = (badge: string) => {
  switch (badge) {
    case 'popular':
      return {
        label: 'Popular',
        icon: Star,
        className: 'bg-yellow-500 text-white hover:bg-yellow-600 border-yellow-500'
      };
    case 'sale':
      return {
        label: 'Sale',
        icon: Tag,
        className: 'bg-red-500 text-white hover:bg-red-600 border-red-500'
      };
    case 'trending':
      return {
        label: 'Trending',
        icon: TrendingUp,
        className: 'bg-green-500 text-white hover:bg-green-600 border-green-500'
      };
    case 'new':
      return {
        label: 'New',
        icon: Sparkles,
        className: 'bg-blue-500 text-white hover:bg-blue-600 border-blue-500'
      };
    case 'limited':
      return {
        label: 'Limited',
        icon: Clock,
        className: 'bg-purple-500 text-white hover:bg-purple-600 border-purple-500'
      };
    case 'out-of-stock':
      return {
        label: 'Out of Stock',
        icon: AlertTriangle,
        className: 'bg-gray-500 text-white hover:bg-gray-600 border-gray-500'
      };
    default:
      return null;
  }
};

const MenuItemBadge = ({ badge, className = '' }: MenuItemBadgeProps) => {
  if (!badge) return null;
  
  const config = getBadgeConfig(badge);
  if (!config) return null;
  
  const Icon = config.icon;
  
  return (
    <Badge className={`${config.className} ${className} flex items-center gap-1 text-xs font-medium`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};

export default MenuItemBadge;
