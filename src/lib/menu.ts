import { supabase, supabaseConfigured } from "@/integrations/supabase/client";
import type { MenuItem } from "@/contexts/CartContext";

// Row shape expected from Supabase table public.menu_items
interface MenuItemRow {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category: "sandwiches" | "salads" | "breakfast" | "drinks";
  image?: string | null;
  featured?: boolean | null;
  ingredients?: string[] | null;
  badge?: string | null;
  nutritional_values?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
    sodium?: number;
  } | null;
}

export async function fetchMenuItemsFromSupabase(): Promise<MenuItem[] | null> {
  if (!supabaseConfigured) {
    // Supabase not configured; fall back to local menuItems
    console.log("Supabase not configured, falling back to mock data");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("menu_items")
      .select(
        "id, name, description, price, category, image, featured, ingredients, badge, nutritional_values"
      );

    if (error) {
      console.error("Failed to fetch menu items from Supabase:", error);
      return null;
    }

    const mapped: MenuItem[] = (data as MenuItemRow[]).map((row) => ({
      id: String(row.id),
      name: row.name,
      description: row.description ?? "",
      price: Number(row.price),
      category: row.category,
      image: row.image ?? "",
      featured: Boolean(row.featured),
      ingredients: row.ingredients ?? [],
      badge: row.badge ?? null,
      nutritionalValues: {
        calories: row.nutritional_values?.calories ?? 0,
        protein: row.nutritional_values?.protein ?? 0,
        carbs: row.nutritional_values?.carbs ?? 0,
        fat: row.nutritional_values?.fat ?? 0,
        fiber: row.nutritional_values?.fiber,
        sodium: row.nutritional_values?.sodium,
      },
    }));

    return mapped;
  } catch (e) {
    console.error("Unexpected error fetching menu items:", e);
    return null;
  }
}
