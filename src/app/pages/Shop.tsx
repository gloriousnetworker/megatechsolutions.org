import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { mockProducts } from '../data/mockData';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

export default function Shop() {
  const [cart, setCart] = useState<string[]>([]);

  const addToCart = (productId: string, productName: string) => {
    setCart([...cart, productId]);
    toast.success(`${productName} added to cart`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop</h1>
              <p className="text-xl text-blue-50 max-w-3xl">
                Explore our collection of courses, e-books, and learning materials
              </p>
            </div>
            <div className="hidden md:block">
              <Button size="lg" variant="secondary">
                <ShoppingCart className="mr-2 size-5" />
                Cart ({cart.length})
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow flex flex-col">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-t-lg" />
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2 capitalize">{product.type}</Badge>
                  <CardTitle className="line-clamp-2">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1" />
                <CardFooter className="flex items-center justify-between border-t pt-4">
                  <span className="text-2xl font-bold text-blue-600">
                    ₦{(product.price / 1000).toFixed(1)}k
                  </span>
                  <Button onClick={() => addToCart(product.id, product.name)}>
                    <ShoppingCart className="mr-2 size-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}