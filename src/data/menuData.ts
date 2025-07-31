import { MenuItem } from '@/contexts/CartContext';
import italianSandwich from '@/assets/italian-sandwich.jpg';
import turkeyClub from '@/assets/turkey-club.jpg';
import pastramiRye from '@/assets/pastrami-rye.jpg';
import caprese from '@/assets/caprese.jpg';
import cubanSandwich from '@/assets/cuban-sandwich.jpg';
import blt from '@/assets/blt.jpg';
import gardenSalad from '@/assets/garden-salad.jpg';
import caesarSalad from '@/assets/caesar-salad.jpg';
import antipasto from '@/assets/antipasto.jpg';
import greekSalad from '@/assets/greek-salad.jpg';
import cobbSalad from '@/assets/cobb-salad.jpg';
import breakfastBagel from '@/assets/breakfast-bagel.jpg';
import breakfastSandwich from '@/assets/breakfast-sandwich.jpg';
import avocadoToast from '@/assets/avocado-toast.jpg';
import breakfastWrap from '@/assets/breakfast-wrap.jpg';
import pancakes from '@/assets/pancakes.jpg';
import coffee from '@/assets/coffee.jpg';
import cappuccino from '@/assets/cappuccino.jpg';
import smoothie from '@/assets/smoothie.jpg';
import orangeJuice from '@/assets/orange-juice.jpg';
import icedTea from '@/assets/iced-tea.jpg';

export const menuItems: MenuItem[] = [
  // Sandwiches
  {
    id: 'italian-sub',
    name: 'Italian Sub',
    description: 'Salami, pepperoni, ham, provolone, lettuce, tomato, onion, oil & vinegar on Italian bread',
    price: 12.99,
    category: 'sandwiches',
    image: italianSandwich,
    featured: true,
    ingredients: ['Salami', 'Pepperoni', 'Ham', 'Provolone cheese', 'Lettuce', 'Tomato', 'Red onion', 'Italian bread', 'Olive oil', 'Red wine vinegar'],
    nutritionalValues: {
      calories: 580,
      protein: 32,
      carbs: 45,
      fat: 28,
      fiber: 3,
      sodium: 1650
    }
  },
  {
    id: 'turkey-club',
    name: 'Turkey Club',
    description: 'Roasted turkey, bacon, lettuce, tomato, mayo on toasted sourdough',
    price: 11.99,
    category: 'sandwiches',
    image: turkeyClub,
    ingredients: ['Roasted turkey', 'Bacon', 'Lettuce', 'Tomato', 'Mayonnaise', 'Sourdough bread'],
    nutritionalValues: {
      calories: 520,
      protein: 28,
      carbs: 42,
      fat: 24,
      fiber: 2,
      sodium: 1320
    }
  },
  {
    id: 'pastrami-rye',
    name: 'Pastrami on Rye',
    description: 'House-cured pastrami, mustard, pickles on fresh rye bread',
    price: 13.99,
    category: 'sandwiches',
    image: pastramiRye,
    ingredients: ['House-cured pastrami', 'Dijon mustard', 'Dill pickles', 'Rye bread'],
    nutritionalValues: {
      calories: 485,
      protein: 35,
      carbs: 38,
      fat: 20,
      fiber: 4,
      sodium: 1580
    }
  },
  {
    id: 'caprese',
    name: 'Caprese Sandwich',
    description: 'Fresh mozzarella, tomatoes, basil, balsamic glaze on focaccia',
    price: 10.99,
    category: 'sandwiches',
    image: caprese,
    ingredients: ['Fresh mozzarella', 'Tomatoes', 'Fresh basil', 'Balsamic glaze', 'Focaccia bread'],
    nutritionalValues: {
      calories: 420,
      protein: 18,
      carbs: 45,
      fat: 18,
      fiber: 3,
      sodium: 890
    }
  },
  {
    id: 'cuban',
    name: 'Cuban Sandwich',
    description: 'Roasted pork, ham, swiss, pickles, mustard on pressed Cuban bread',
    price: 12.49,
    category: 'sandwiches',
    image: cubanSandwich,
    ingredients: ['Roasted pork', 'Ham', 'Swiss cheese', 'Pickles', 'Yellow mustard', 'Cuban bread'],
    nutritionalValues: {
      calories: 550,
      protein: 35,
      carbs: 40,
      fat: 26,
      fiber: 2,
      sodium: 1450
    }
  },
  {
    id: 'blt',
    name: 'Classic BLT',
    description: 'Crispy bacon, lettuce, tomato, mayo on toasted white bread',
    price: 9.99,
    category: 'sandwiches',
    image: blt,
    ingredients: ['Crispy bacon', 'Lettuce', 'Tomato', 'Mayonnaise', 'White bread'],
    nutritionalValues: {
      calories: 380,
      protein: 15,
      carbs: 32,
      fat: 22,
      fiber: 2,
      sodium: 950
    }
  },

  // Salads
  {
    id: 'caesar-salad',
    name: 'Caesar Salad',
    description: 'Romaine lettuce, parmesan, croutons, Caesar dressing',
    price: 8.99,
    category: 'salads',
    image: caesarSalad,
    featured: true,
    ingredients: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing', 'Anchovies'],
    nutritionalValues: {
      calories: 280,
      protein: 8,
      carbs: 15,
      fat: 22,
      fiber: 4,
      sodium: 680
    }
  },
  {
    id: 'garden-salad',
    name: 'Garden Salad',
    description: 'Mixed greens, cherry tomatoes, cucumber, carrots, choice of dressing',
    price: 7.99,
    category: 'salads',
    image: gardenSalad,
    ingredients: ['Mixed greens', 'Cherry tomatoes', 'Cucumber', 'Carrots', 'Red onion', 'Choice of dressing'],
    nutritionalValues: {
      calories: 120,
      protein: 3,
      carbs: 12,
      fat: 8,
      fiber: 5,
      sodium: 250
    }
  },
  {
    id: 'antipasto',
    name: 'Antipasto Salad',
    description: 'Mixed greens, salami, pepperoni, mozzarella, olives, peppers, Italian dressing',
    price: 12.99,
    category: 'salads',
    image: antipasto,
    ingredients: ['Mixed greens', 'Salami', 'Pepperoni', 'Mozzarella', 'Olives', 'Peppers', 'Italian dressing'],
    nutritionalValues: {
      calories: 450,
      protein: 22,
      carbs: 18,
      fat: 32,
      fiber: 6,
      sodium: 1280
    }
  },
  {
    id: 'greek-salad',
    name: 'Greek Salad',
    description: 'Romaine, feta, olives, tomatoes, cucumber, red onion, Greek dressing',
    price: 10.99,
    category: 'salads',
    image: greekSalad,
    ingredients: ['Romaine lettuce', 'Feta cheese', 'Kalamata olives', 'Tomatoes', 'Cucumber', 'Red onion', 'Greek dressing'],
    nutritionalValues: {
      calories: 320,
      protein: 12,
      carbs: 20,
      fat: 24,
      fiber: 8,
      sodium: 920
    }
  },
  {
    id: 'cobb-salad',
    name: 'Cobb Salad',
    description: 'Mixed greens, grilled chicken, bacon, blue cheese, avocado, egg, tomato',
    price: 13.99,
    category: 'salads',
    image: cobbSalad,
    ingredients: ['Mixed greens', 'Grilled chicken', 'Bacon', 'Blue cheese', 'Avocado', 'Hard-boiled egg', 'Tomato'],
    nutritionalValues: {
      calories: 520,
      protein: 35,
      carbs: 15,
      fat: 38,
      fiber: 8,
      sodium: 1150
    }
  },

  // Breakfast
  {
    id: 'bagel-lox',
    name: 'Bagel with Lox',
    description: 'Everything bagel, cream cheese, smoked salmon, capers, red onion',
    price: 14.99,
    category: 'breakfast',
    image: breakfastBagel,
    featured: true,
    ingredients: ['Everything bagel', 'Cream cheese', 'Smoked salmon', 'Capers', 'Red onion', 'Fresh dill'],
    nutritionalValues: {
      calories: 480,
      protein: 25,
      carbs: 45,
      fat: 22,
      fiber: 2,
      sodium: 1250
    }
  },
  {
    id: 'breakfast-sandwich',
    name: 'Breakfast Sandwich',
    description: 'Egg, cheese, choice of bacon or sausage on English muffin',
    price: 6.99,
    category: 'breakfast',
    image: breakfastSandwich,
    ingredients: ['Scrambled egg', 'Cheddar cheese', 'Choice of bacon or sausage', 'English muffin'],
    nutritionalValues: {
      calories: 420,
      protein: 22,
      carbs: 28,
      fat: 24,
      fiber: 2,
      sodium: 980
    }
  },
  {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    description: 'Smashed avocado, tomato, feta, everything seasoning on multigrain',
    price: 8.99,
    category: 'breakfast',
    image: avocadoToast,
    ingredients: ['Smashed avocado', 'Cherry tomatoes', 'Feta cheese', 'Everything seasoning', 'Multigrain bread'],
    nutritionalValues: {
      calories: 350,
      protein: 12,
      carbs: 35,
      fat: 20,
      fiber: 10,
      sodium: 520
    }
  },
  {
    id: 'breakfast-wrap',
    name: 'Breakfast Wrap',
    description: 'Scrambled eggs, cheese, peppers, onions, choice of meat in tortilla',
    price: 7.99,
    category: 'breakfast',
    image: breakfastWrap,
    ingredients: ['Scrambled eggs', 'Cheddar cheese', 'Bell peppers', 'Onions', 'Choice of meat', 'Flour tortilla'],
    nutritionalValues: {
      calories: 440,
      protein: 24,
      carbs: 32,
      fat: 26,
      fiber: 3,
      sodium: 1080
    }
  },
  {
    id: 'pancakes',
    name: 'Stack of Pancakes',
    description: 'Three fluffy pancakes with butter and syrup',
    price: 9.99,
    category: 'breakfast',
    image: pancakes,
    ingredients: ['Fluffy pancakes (3)', 'Butter', 'Maple syrup', 'Powdered sugar'],
    nutritionalValues: {
      calories: 580,
      protein: 12,
      carbs: 85,
      fat: 18,
      fiber: 3,
      sodium: 620
    }
  },

  // Drinks
  {
    id: 'coffee',
    name: 'Fresh Coffee',
    description: 'House blend coffee, hot or iced',
    price: 2.99,
    category: 'drinks',
    image: coffee,
    ingredients: ['House blend coffee beans', 'Water'],
    nutritionalValues: {
      calories: 5,
      protein: 0,
      carbs: 1,
      fat: 0,
      fiber: 0,
      sodium: 5
    }
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and foam',
    price: 4.99,
    category: 'drinks',
    image: cappuccino,
    ingredients: ['Espresso', 'Steamed milk', 'Milk foam'],
    nutritionalValues: {
      calories: 80,
      protein: 4,
      carbs: 6,
      fat: 4,
      fiber: 0,
      sodium: 55
    }
  },
  {
    id: 'smoothie',
    name: 'Berry Smoothie',
    description: 'Mixed berries, banana, yogurt, honey',
    price: 5.99,
    category: 'drinks',
    image: smoothie,
    ingredients: ['Mixed berries', 'Banana', 'Greek yogurt', 'Honey', 'Ice'],
    nutritionalValues: {
      calories: 220,
      protein: 8,
      carbs: 45,
      fat: 2,
      fiber: 6,
      sodium: 45
    }
  },
  {
    id: 'fresh-juice',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 3.99,
    category: 'drinks',
    image: orangeJuice,
    ingredients: ['Fresh oranges'],
    nutritionalValues: {
      calories: 110,
      protein: 2,
      carbs: 26,
      fat: 0,
      fiber: 0,
      sodium: 2
    }
  },
  {
    id: 'iced-tea',
    name: 'Iced Tea',
    description: 'Fresh brewed iced tea, sweetened or unsweetened',
    price: 2.49,
    category: 'drinks',
    image: icedTea,
    ingredients: ['Black tea', 'Water', 'Ice', 'Optional sweetener'],
    nutritionalValues: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sodium: 5
    }
  }
];

export const categories = [
  { id: 'sandwiches', name: 'Sandwiches', icon: '🥪' },
  { id: 'salads', name: 'Salads', icon: '🥗' },
  { id: 'breakfast', name: 'Breakfast', icon: '🍳' },
  { id: 'drinks', name: 'Drinks', icon: '☕' }
];