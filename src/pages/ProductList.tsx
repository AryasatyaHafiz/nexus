import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useProductStore } from "@/lib/store";
import { Search, Plus, Edit, Trash2, Package } from "lucide-react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function ProductList() {
  const { products, deleteProduct } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    deleteProduct(id);
    toast({
      title: "Product deleted",
      description: `${name} has been successfully deleted.`,
    });
  };

  const getStockBadgeVariant = (stock: number) => {
    if (stock === 0) return "destructive";
    if (stock < 10) return "secondary";
    return "default";
  };

  const getStockText = (stock: number) => {
    if (stock === 0) return "Out of Stock";
    if (stock < 10) return "Low Stock";
    return "In Stock";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory and details
          </p>
        </div>
        <Link to="/products/new">
          <Button variant="gradient" size="lg" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <Card className="gradient-card border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Inventory
          </CardTitle>
          <CardDescription>
            Search and manage all your products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                {products.length === 0
                  ? "Get started by adding your first product."
                  : "Try adjusting your search criteria."}
              </p>
              {products.length === 0 && (
                <Link to="/products/new">
                  <Button variant="gradient">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Product
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="gradient-card border shadow-subtle hover:shadow-medium transition-spring hover:scale-[1.02]">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {product.description}
                        </CardDescription>
                      </div>
                      <Badge variant={getStockBadgeVariant(product.stock)}>
                        {getStockText(product.stock)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Price</span>
                        <span className="font-semibold text-lg">${product.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Stock</span>
                        <span className="font-medium">{product.stock} units</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Category</span>
                        <Badge variant="outline">{product.category}</Badge>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-sm text-muted-foreground">Total Value</span>
                        <span className="font-semibold">${(product.price * product.stock).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Link to={`/products/edit/${product.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" className="flex-1">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Product</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{product.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(product.id, product.name)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}