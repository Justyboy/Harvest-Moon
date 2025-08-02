import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MenuItemCard from '@/components/MenuItemCard';
import { menuItems, categories } from '@/data/menuData';
import { MenuItem as MenuItemType } from '@/contexts/CartContext';
import { Phone, Mail, Calendar } from 'lucide-react';

const Catering = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems: MenuItemType[] = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-handwritten text-5xl md:text-6xl font-bold text-primary mb-4">
            Catering Menu
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Let Harvest Moon Deli cater your next event! From office meetings to family gatherings, 
            we'll bring our delicious, farm-fresh cuisine directly to you.
          </p>
          
          {/* Catering Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-card to-secondary/20">
              <CardHeader className="text-center">
                <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Order by Phone</CardTitle>
                <CardDescription>(555) 123-4567</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-to-br from-card to-secondary/20">
              <CardHeader className="text-center">
                <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Email Orders</CardTitle>
                <CardDescription>catering@harvestmoondeli.com</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-to-br from-card to-secondary/20">
              <CardHeader className="text-center">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Advance Notice</CardTitle>
                <CardDescription>48 hours minimum</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            className="rounded-full"
          >
            All Items
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.icon} {category.name}
            </Button>
          ))}
        </div>

        {/* Category Header */}
        {selectedCategory !== 'all' && (
          <div className="text-center mb-8">
            <h2 className="font-handwritten text-3xl font-bold text-primary mb-2">
              {categories.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <Badge variant="secondary" className="text-sm">
              {filteredItems.length} items available for catering
            </Badge>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MenuItemCard item={item} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-muted-foreground mb-2">
              No items found
            </h3>
            <p className="text-muted-foreground">
              Try selecting a different category
            </p>
          </div>
        )}

        {/* Catering Information */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/20 border-primary/20">
            <CardContent className="p-8">
              <h3 className="font-handwritten text-3xl font-bold text-primary mb-4">
                Catering Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                <div>
                  <h4 className="font-semibold text-lg mb-3">Minimum Orders</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 10 people minimum for delivery</li>
                    <li>• 5 people minimum for pickup</li>
                    <li>• Group platters available</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-3">Delivery Info</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Free delivery within 5 miles</li>
                    <li>• Setup service available</li>
                    <li>• Disposable plates & utensils included</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Catering;