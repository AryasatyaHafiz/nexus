import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/lib/store";
import { Package, Plus, TrendingUp, DollarSign, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { products } = useProductStore();
  
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const lowStock = products.filter(product => product.stock < 10).length;
  const categories = [...new Set(products.map(product => product.category))].length;

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      description: "Active products in inventory",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Inventory Value",
      value: `$${totalValue.toLocaleString()}`,
      description: "Total value of all products",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Low Stock Items",
      value: lowStock,
      description: "Products with less than 10 units",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Categories",
      value: categories,
      description: "Product categories",
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your product inventory and performance
          </p>
        </div>
        <Link to="/products/new">
          <Button variant="gradient" size="lg" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="gradient-card border-0 shadow-medium hover:shadow-large transition-spring">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="gradient-card border-0 shadow-medium">
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
            <CardDescription>
              Your latest product additions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${product.price} • {product.stock} in stock
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{product.category}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link to="/products">
                <Button variant="outline" className="w-full">
                  View All Products
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-medium">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Link to="/products/new">
                <Button variant="premium" className="w-full justify-start">
                  <Plus className="h-4 w-4" />
                  Add New Product
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="premium" className="w-full justify-start">
                  <Package className="h-4 w-4" />
                  Manage Inventory
                </Button>
              </Link>
              <Link to="/analytics">
                <Button variant="premium" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4" />
                  View Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}