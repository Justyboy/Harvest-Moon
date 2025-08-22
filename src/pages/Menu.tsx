import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MenuItemCard from "@/components/MenuItemCard";
import { categories, menuItems as mockMenuItems } from "@/data/menuData";
import { MenuItem as MenuItemType } from "@/contexts/CartContext";
import { fetchMenuItemsFromSupabase } from "@/lib/menu";
import { supabase } from "@/integrations/supabase/client";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [items, setItems] = useState<MenuItemType[]>([]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const remote = await fetchMenuItemsFromSupabase();
      if (isMounted) {
        if (remote) {
          console.log("Loaded menu items from Supabase:", remote.length);
          setItems(remote);
        } else {
          console.log("Supabase failed, loading mock data:", mockMenuItems.length);
          // Remove hardcoded badges from mock data to reflect database state
          const mockDataWithoutBadges = mockMenuItems.map(item => ({
            ...item,
            badge: null // Remove hardcoded badges
          }));
          setItems(mockDataWithoutBadges);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Realtime: subscribe to changes in public.menu_items and refetch
  useEffect(() => {
    const channel = supabase
      .channel("menu-items-public")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "menu_items" },
        async () => {
          const remote = await fetchMenuItemsFromSupabase();
          if (remote) setItems(remote);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredItems: MenuItemType[] =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-handwritten text-5xl md:text-6xl font-bold text-primary mb-4">
            Our Menu
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From traditional Italian sandwiches to fresh salads and hearty
            breakfasts, every dish is crafted with love and the finest
            ingredients.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className="rounded-full"
          >
            All Items
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.icon} {category.name}
            </Button>
          ))}
        </div>

        {/* Category Header */}
        {selectedCategory !== "all" && (
          <div className="text-center mb-8">
            <h2 className="font-handwritten text-3xl font-bold text-primary mb-2">
              {categories.find((cat) => cat.id === selectedCategory)?.name}
            </h2>
            <Badge variant="secondary" className="text-sm">
              {filteredItems.length} items
            </Badge>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
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
      </div>
    </div>
  );
};

export default Menu;
