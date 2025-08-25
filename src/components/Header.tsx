import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, User, LogOut, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { useStoreHours } from '@/contexts/StoreHoursContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const { getTotalItems } = useCart();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { isOpen, showOrderAheadPopup } = useStoreHours();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const totalItems = getTotalItems();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Signed out successfully',
        description: 'Come back soon!'
      });
    }
  };

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
              src="/favicon.ico" 
              alt="Harvest Moon Deli Logo"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
            />
            <div>
              <h1 className="font-handwritten text-2xl md:text-3xl font-bold text-primary">
                Harvest Moon Deli
              </h1>
              <div className="flex items-center gap-2 -mt-1">
                <p className="text-xs text-muted-foreground">Fresh • Local • Seasonal</p>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-xs font-medium">
                    {isOpen ? 'Open' : 'Closed'}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={showOrderAheadPopup}
                    className="text-xs h-auto p-1 ml-1"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    Order Ahead
                  </Button>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavLinks />

          {/* Auth, Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Auth Section */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="hidden md:flex">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    {user.user_metadata?.full_name || user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth" className="hidden md:block">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
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
                      src="/favicon.ico" 
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
                   
                   {/* Mobile Auth Section */}
                   <div className="pt-4 border-t">
                     {user ? (
                       <div className="space-y-4">
                         <p className="text-sm text-muted-foreground">
                           {user.user_metadata?.full_name || user.email}
                         </p>
                         <Button 
                           variant="outline" 
                           onClick={handleSignOut}
                           className="w-full"
                         >
                           <LogOut className="mr-2 h-4 w-4" />
                           Sign Out
                         </Button>
                       </div>
                     ) : (
                       <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                         <Button variant="outline" className="w-full">
                           Sign In / Join Rewards
                         </Button>
                       </Link>
                     )}
                   </div>
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