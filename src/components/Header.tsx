import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const Header = () => {
  const { getTotalItems } = useCart();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const totalItems = getTotalItems();

  const NavLinks = ({ mobile = false, onClose = () => {} }) => (
    <div className={`${mobile ? 'flex flex-col space-y-4' : 'hidden md:flex items-center space-x-8'}`}>
      <Link 
        to="/" 
        onClick={onClose}
        className={`font-medium transition-colors hover:text-primary ${
          location.pathname === '/' ? 'text-primary' : 'text-foreground'
        }`}
      >
        Home
      </Link>
      <Link 
        to="/menu" 
        onClick={onClose}
        className={`font-medium transition-colors hover:text-primary ${
          location.pathname === '/menu' ? 'text-primary' : 'text-foreground'
        }`}
      >
        Menu
      </Link>
      <Link 
        to="/catering" 
        onClick={onClose}
        className={`font-medium transition-colors hover:text-primary ${
          location.pathname === '/catering' ? 'text-primary' : 'text-foreground'
        }`}
      >
        Catering
      </Link>
      <Link 
        to="/about" 
        onClick={onClose}
        className={`font-medium transition-colors hover:text-primary ${
          location.pathname === '/about' ? 'text-primary' : 'text-foreground'
        }`}
      >
        About
      </Link>
      <Link 
        to="/contact" 
        onClick={onClose}
        className={`font-medium transition-colors hover:text-primary ${
          location.pathname === '/contact' ? 'text-primary' : 'text-foreground'
        }`}
      >
        Contact
      </Link>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/b3b96e6d-f663-4084-9d09-7286ee009c74.png" 
              alt="Harvest Moon Deli Logo"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
            />
            <div>
              <h1 className="font-handwritten text-2xl md:text-3xl font-bold text-primary">
                Harvest Moon Deli
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">Fresh • Local • Seasonal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavLinks />

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce-gentle">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="flex items-center space-x-2">
                    <img 
                      src="/lovable-uploads/b3b96e6d-f663-4084-9d09-7286ee009c74.png" 
                      alt="Harvest Moon Deli Logo"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="font-handwritten text-xl font-bold text-primary">
                        Harvest Moon Deli
                      </h2>
                    </div>
                  </div>
                  <NavLinks mobile onClose={() => setIsMenuOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;