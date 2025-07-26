import { MenuItem } from '@/contexts/CartContext';
import italianSandwich from '@/assets/italian-sandwich.jpg';
import gardenSalad from '@/assets/garden-salad.jpg';
import breakfastBagel from '@/assets/breakfast-bagel.jpg';

export const menuItems: MenuItem[] = [
  // Sandwiches
  {
    id: 'italian-sub',
    name: 'Italian Sub',
    description: 'Salami, pepperoni, ham, provolone, lettuce, tomato, onion, oil & vinegar on Italian bread',
    price: 12.99,
    category: 'sandwiches',
    image: italianSandwich,
    featured: true
  },
  {
    id: 'turkey-club',
    name: 'Turkey Club',
    description: 'Roasted turkey, bacon, lettuce, tomato, mayo on toasted sourdough',
    price: 11.99,
    category: 'sandwiches',
    image: italianSandwich
  },
  {
    id: 'pastrami-rye',
    name: 'Pastrami on Rye',
    description: 'House-cured pastrami, mustard, pickles on fresh rye bread',
    price: 13.99,
    category: 'sandwiches',
    image: italianSandwich
  },
  {
    id: 'caprese',
    name: 'Caprese Sandwich',
    description: 'Fresh mozzarella, tomatoes, basil, balsamic glaze on focaccia',
    price: 10.99,
    category: 'sandwiches',
    image: italianSandwich
  },
  {
    id: 'cuban',
    name: 'Cuban Sandwich',
    description: 'Roasted pork, ham, swiss, pickles, mustard on pressed Cuban bread',
    price: 12.49,
    category: 'sandwiches',
    image: italianSandwich
  },
  {
    id: 'blt',
    name: 'Classic BLT',
    description: 'Crispy bacon, lettuce, tomato, mayo on toasted white bread',
    price: 9.99,
    category: 'sandwiches',
    image: italianSandwich
  },

  // Salads
  {
    id: 'caesar-salad',
    name: 'Caesar Salad',
    description: 'Romaine lettuce, parmesan, croutons, Caesar dressing',
    price: 8.99,
    category: 'salads',
    image: gardenSalad,
    featured: true
  },
  {
    id: 'garden-salad',
    name: 'Garden Salad',
    description: 'Mixed greens, cherry tomatoes, cucumber, carrots, choice of dressing',
    price: 7.99,
    category: 'salads',
    image: gardenSalad
  },
  {
    id: 'antipasto',
    name: 'Antipasto Salad',
    description: 'Mixed greens, salami, pepperoni, mozzarella, olives, peppers, Italian dressing',
    price: 12.99,
    category: 'salads',
    image: gardenSalad
  },
  {
    id: 'greek-salad',
    name: 'Greek Salad',
    description: 'Romaine, feta, olives, tomatoes, cucumber, red onion, Greek dressing',
    price: 10.99,
    category: 'salads',
    image: gardenSalad
  },
  {
    id: 'cobb-salad',
    name: 'Cobb Salad',
    description: 'Mixed greens, grilled chicken, bacon, blue cheese, avocado, egg, tomato',
    price: 13.99,
    category: 'salads',
    image: gardenSalad
  },

  // Breakfast
  {
    id: 'bagel-lox',
    name: 'Bagel with Lox',
    description: 'Everything bagel, cream cheese, smoked salmon, capers, red onion',
    price: 14.99,
    category: 'breakfast',
    image: breakfastBagel,
    featured: true
  },
  {
    id: 'breakfast-sandwich',
    name: 'Breakfast Sandwich',
    description: 'Egg, cheese, choice of bacon or sausage on English muffin',
    price: 6.99,
    category: 'breakfast',
    image: breakfastBagel
  },
  {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    description: 'Smashed avocado, tomato, feta, everything seasoning on multigrain',
    price: 8.99,
    category: 'breakfast',
    image: breakfastBagel
  },
  {
    id: 'breakfast-wrap',
    name: 'Breakfast Wrap',
    description: 'Scrambled eggs, cheese, peppers, onions, choice of meat in tortilla',
    price: 7.99,
    category: 'breakfast',
    image: breakfastBagel
  },
  {
    id: 'pancakes',
    name: 'Stack of Pancakes',
    description: 'Three fluffy pancakes with butter and syrup',
    price: 9.99,
    category: 'breakfast',
    image: breakfastBagel
  },

  // Drinks
  {
    id: 'coffee',
    name: 'Fresh Coffee',
    description: 'House blend coffee, hot or iced',
    price: 2.99,
    category: 'drinks',
    image: breakfastBagel
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and foam',
    price: 4.99,
    category: 'drinks',
    image: breakfastBagel
  },
  {
    id: 'smoothie',
    name: 'Berry Smoothie',
    description: 'Mixed berries, banana, yogurt, honey',
    price: 5.99,
    category: 'drinks',
    image: breakfastBagel
  },
  {
    id: 'fresh-juice',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 3.99,
    category: 'drinks',
    image: breakfastBagel
  },
  {
    id: 'iced-tea',
    name: 'Iced Tea',
    description: 'Fresh brewed iced tea, sweetened or unsweetened',
    price: 2.49,
    category: 'drinks',
    image: breakfastBagel
  }
];

export const categories = [
  { id: 'sandwiches', name: 'Sandwiches', icon: '🥪' },
  { id: 'salads', name: 'Salads', icon: '🥗' },
  { id: 'breakfast', name: 'Breakfast', icon: '🍳' },
  { id: 'drinks', name: 'Drinks', icon: '☕' }
];