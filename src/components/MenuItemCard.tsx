import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart, MenuItem } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(item);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your order.`,
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-gradient-to-br from-card to-secondary/20">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          {item.name}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${item.price.toFixed(2)}
          </span>
          {item.featured && (
            <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
              Popular
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleAddToCart}
          className="w-full group/button"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2 group-hover/button:rotate-90 transition-transform duration-200" />
          Add to Order
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;