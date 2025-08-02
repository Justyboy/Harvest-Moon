import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MenuItemCard from '@/components/MenuItemCard';
import { menuItems } from '@/data/menuData';
import deliHero from '@/assets/deli-hero.jpg';
import { ArrowRight, Clock, Heart, Star } from 'lucide-react';

const Homepage = () => {
  const featuredItems = menuItems.filter(item => item.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={deliHero} 
            alt="Harvest Moon Deli" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-handwritten text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
            Welcome to Harvest Moon Deli
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Where every bite tells a story of family tradition and fresh ingredients
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/menu">
              <Button size="lg" className="text-lg px-8 py-6">
                View Our Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20">
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Family Recipe</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Authentic Italian recipes passed down through three generations of the Rosa family.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Fresh Daily</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  All our ingredients are sourced fresh daily from local farms and trusted suppliers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Fast Service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Quick preparation without compromising quality. Your food, made fresh, served fast.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-handwritten text-4xl md:text-5xl font-bold text-primary mb-4">
              Customer Favorites
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover why these dishes keep our customers coming back for more
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredItems.map((item) => (
              <div key={item.id} className="animate-fade-in">
                <MenuItemCard item={item} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/menu">
              <Button size="lg" variant="outline" className="text-lg px-8">
                See Full Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-handwritten text-4xl md:text-5xl font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the authentic taste of Italy, right here in your neighborhood
          </p>
          <Link to="/menu">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Start Your Order
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Homepage;