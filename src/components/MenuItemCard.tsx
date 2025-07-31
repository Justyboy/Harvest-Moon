import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart, MenuItem } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Plus, Info } from 'lucide-react';
import MenuItemDetails from './MenuItemDetails';
interface MenuItemCardProps {
  item: MenuItem;
}
const MenuItemCard = ({
  item
}: MenuItemCardProps) => {
  const {
    addItem
  } = useCart();
  const {
    toast
  } = useToast();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const handleAddToCart = () => {
    addItem(item);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your order.`
    });
  };
  const handleCardClick = () => {
    setIsDetailsOpen(true);
  };
  return <>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-gradient-to-br from-card to-secondary/20 cursor-pointer">
        <div className="aspect-[4/3] overflow-hidden relative" onClick={handleCardClick}>
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            
          </div>
        </div>
        <CardHeader className="pb-2" onClick={handleCardClick}>
          <CardTitle className="text-lg font-semibold text-foreground">
            {item.name}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2" onClick={handleCardClick}>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ${item.price.toFixed(2)}
            </span>
            {item.featured && <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                Popular
              </span>}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={handleCardClick} variant="outline" className="flex-1" size="sm">
            <Info className="w-4 h-4 mr-2" />
            Details
          </Button>
          <Button onClick={e => {
          e.stopPropagation();
          handleAddToCart();
        }} className="flex-1 group/button" size="sm">
            <Plus className="w-4 h-4 mr-2 group-hover/button:rotate-90 transition-transform duration-200" />
            Add
          </Button>
        </CardFooter>
      </Card>
      
      <MenuItemDetails item={item} isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} />
    </>;
};
export default MenuItemCard;