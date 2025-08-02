import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-handwritten text-4xl md:text-5xl font-bold text-primary text-center mb-8">
            About Harvest Moon Deli
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <h2 className="font-handwritten text-2xl font-bold text-primary mb-4">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Harvest Moon Deli was born from a passion for celebrating nature's bounty. 
                  We believe in the power of seasonal eating and supporting local farmers who 
                  work in harmony with the land. Our commitment to sustainability drives everything 
                  we do, from sourcing to preparation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <h2 className="font-handwritten text-2xl font-bold text-primary mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We're committed to serving farm-fresh, seasonal ingredients that change with 
                  nature's rhythm. Our menu evolves throughout the year, highlighting the best 
                  of each harvest season while supporting local agriculture and sustainable practices.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="border-2 border-primary/20 mb-12">
            <CardContent className="p-6">
              <h2 className="font-handwritten text-2xl font-bold text-primary mb-4 text-center">
                Our Values
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-semibold text-primary mb-2">Seasonal</h3>
                  <p className="text-muted-foreground text-sm">
                    We celebrate each season's unique flavors and ingredients.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Local</h3>
                  <p className="text-muted-foreground text-sm">
                    Supporting our community farmers and reducing our environmental impact.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Fresh</h3>
                  <p className="text-muted-foreground text-sm">
                    Every ingredient is carefully selected for peak flavor and nutrition.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <h2 className="font-handwritten text-3xl font-bold text-primary mb-4">
              Visit Us Today!
            </h2>
            <p className="text-muted-foreground mb-6">
              Experience the farm-fresh flavors and seasonal specialties that make every visit special.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-sm text-muted-foreground">
              <div>📍 123 Main Street, Downtown</div>
              <div>📞 (555) 123-4567</div>
              <div>🕒 Mon-Sat: 7AM-8PM, Sun: 8AM-6PM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;