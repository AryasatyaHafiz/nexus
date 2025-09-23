import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useProductStore } from "@/lib/store";
import { BarChart3, TrendingUp, PieChart, Activity } from "lucide-react";

export default function Analytics() {
  const { products } = useProductStore();
  
  // Calculate analytics data
  const categoryData = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const averagePrice = products.length > 0 ? products.reduce((sum, product) => sum + product.price, 0) / products.length : 0;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  
  const topCategories = Object.entries(categoryData)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const mostValuableProducts = products
    .map(product => ({
      ...product,
      totalValue: product.price * product.stock
    }))
    .sort((a, b) => b.totalValue - a.totalValue)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Insights and performance metrics for your inventory
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="gradient-card border-0 shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
            <div className="p-2 rounded-lg bg-green-50">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Combined value of all products
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Product Price</CardTitle>
            <div className="p-2 rounded-lg bg-blue-50">
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averagePrice.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Mean price across all products
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock Units</CardTitle>
            <div className="p-2 rounded-lg bg-purple-50">
              <Activity className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStock.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total units in inventory
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Product Categories</CardTitle>
            <div className="p-2 rounded-lg bg-orange-50">
              <PieChart className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(categoryData).length}</div>
            <p className="text-xs text-muted-foreground">
              Unique categories
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Categories */}
        <Card className="gradient-card border-0 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Top Categories
            </CardTitle>
            <CardDescription>
              Categories with the most products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.length > 0 ? (
                topCategories.map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="font-medium">{category}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">{count} products</span>
                      <div className="text-xs text-muted-foreground">
                        {((count / products.length) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No category data available
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Most Valuable Products */}
        <Card className="gradient-card border-0 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Most Valuable Products
            </CardTitle>
            <CardDescription>
              Products with highest total inventory value
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mostValuableProducts.length > 0 ? (
                mostValuableProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-primary text-white text-xs flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ${product.price} × {product.stock} units
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">${product.totalValue.toLocaleString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No products available
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Analysis */}
      <Card className="gradient-card border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Stock Analysis
          </CardTitle>
          <CardDescription>
            Overview of your inventory stock levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 rounded-lg bg-green-50">
              <div className="text-2xl font-bold text-green-700">
                {products.filter(p => p.stock >= 10).length}
              </div>
              <p className="text-sm text-green-600">Well Stocked</p>
              <p className="text-xs text-muted-foreground">10+ units</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-50">
              <div className="text-2xl font-bold text-orange-700">
                {products.filter(p => p.stock > 0 && p.stock < 10).length}
              </div>
              <p className="text-sm text-orange-600">Low Stock</p>
              <p className="text-xs text-muted-foreground">1-9 units</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-red-50">
              <div className="text-2xl font-bold text-red-700">
                {products.filter(p => p.stock === 0).length}
              </div>
              <p className="text-sm text-red-600">Out of Stock</p>
              <p className="text-xs text-muted-foreground">0 units</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}