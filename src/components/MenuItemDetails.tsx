import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';

import { MenuItem } from '@/contexts/CartContext';
import { useCart } from '@/contexts/CartContext';
import { Plus, X, ChevronDown } from 'lucide-react';

interface MenuItemDetailsProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const MenuItemDetails = ({ item, isOpen, onClose }: MenuItemDetailsProps) => {
  const { addItem } = useCart();

  if (!item) return null;

  const handleAddToCart = () => {
    addItem(item);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-handwritten text-primary">
            {item.name}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Image */}
          <div className="aspect-[3/2] max-w-sm mx-auto overflow-hidden rounded-lg">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Price and Featured Badge */}
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-primary">
              ${item.price.toFixed(2)}
            </span>
            {item.featured && (
              <Badge variant="secondary" className="text-sm">
                Popular Choice
              </Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-lg leading-relaxed">
            {item.description}
          </p>

          {/* Ingredients - only show if not empty */}
          {item.ingredients && (
            typeof item.ingredients === 'string' ? (
              item.ingredients.trim() && (
                <div>
                  <h3 className="text-md font-semibold text-foreground mb-3">Ingredients</h3>
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <p className="text-sm text-foreground leading-relaxed">{item.ingredients}</p>
                  </div>
                </div>
              )
            ) : (
              Array.isArray(item.ingredients) && item.ingredients.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients.map((ingredient, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>
              )
            )
          )}

          {/* Nutritional Values (Collapsible) */}
          <Collapsible defaultOpen={false}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between group">
                <span className="text-lg font-semibold text-foreground">Nutritional Information</span>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-2 bg-secondary/20 rounded-lg">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">
                    {item.nutritionalValues.calories}
                  </div>
                  <div className="text-sm text-muted-foreground">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">
                    {item.nutritionalValues.protein}g
                  </div>
                  <div className="text-sm text-muted-foreground">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">
                    {item.nutritionalValues.carbs}g
                  </div>
                  <div className="text-sm text-muted-foreground">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">
                    {item.nutritionalValues.fat}g
                  </div>
                  <div className="text-sm text-muted-foreground">Fat</div>
                </div>
                {item.nutritionalValues.fiber && (
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">
                      {item.nutritionalValues.fiber}g
                    </div>
                    <div className="text-sm text-muted-foreground">Fiber</div>
                  </div>
                )}
                {item.nutritionalValues.sodium && (
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">
                      {item.nutritionalValues.sodium}mg
                    </div>
                    <div className="text-sm text-muted-foreground">Sodium</div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Add to Cart Button */}
          <Button 
            onClick={handleAddToCart}
            className="w-full text-lg py-6"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add to Order - ${item.price.toFixed(2)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemDetails;