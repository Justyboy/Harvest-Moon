import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-handwritten text-4xl md:text-5xl font-bold text-primary text-center mb-8">
            About Mama Rosa's
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <h2 className="font-handwritten text-2xl font-bold text-primary mb-4">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Founded in 1952 by Rosa and Giuseppe Marinelli, Mama Rosa's has been serving 
                  authentic Italian-American cuisine to our community for over 70 years. What started 
                  as a small neighborhood deli has grown into a beloved family tradition, passed down 
                  through three generations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <h2 className="font-handwritten text-2xl font-bold text-primary mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We're committed to using only the freshest ingredients, traditional family recipes, 
                  and time-honored preparation methods. Every sandwich, salad, and breakfast item is 
                  made with love and attention to detail, just like Mama Rosa used to make.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="border-2 border-primary/20 mb-12">
            <CardContent className="p-6">
              <h2 className="font-handwritten text-2xl font-bold text-primary mb-4 text-center">
                Family Values
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-semibold text-primary mb-2">Quality</h3>
                  <p className="text-muted-foreground text-sm">
                    We source the finest ingredients and never compromise on quality.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Community</h3>
                  <p className="text-muted-foreground text-sm">
                    We're proud to be part of this neighborhood and serve our friends.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Tradition</h3>
                  <p className="text-muted-foreground text-sm">
                    Our recipes and methods have been perfected over generations.
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
              Experience the warmth and flavor that has made Mama Rosa's a community favorite for decades.
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