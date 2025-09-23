import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProductStore } from "@/lib/store";
import { ArrowLeft, Save, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addProduct, updateProduct, getProduct } = useProductStore();
  const { toast } = useToast();
  
  const isEditing = Boolean(id);
  const existingProduct = isEditing ? getProduct(id!) : null;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        name: existingProduct.name,
        description: existingProduct.description,
        price: existingProduct.price.toString(),
        category: existingProduct.category,
        stock: existingProduct.stock.toString(),
      });
    }
  }, [existingProduct]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price greater than 0";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = "Please enter a valid stock quantity (0 or greater)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      category: formData.category.trim(),
      stock: Number(formData.stock),
    };

    if (isEditing) {
      updateProduct(id!, productData);
      toast({
        title: "Product updated",
        description: `${productData.name} has been successfully updated.`,
      });
    } else {
      addProduct(productData);
      toast({
        title: "Product created",
        description: `${productData.name} has been successfully added to your inventory.`,
      });
    }

    navigate("/products");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? "Update your product information"
              : "Add a new product to your inventory"}
          </p>
        </div>
      </div>

      <Card className="gradient-card border-0 shadow-medium max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Details
          </CardTitle>
          <CardDescription>
            Fill in the information below to {isEditing ? "update" : "create"} your product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter product name"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  placeholder="e.g., Electronics, Furniture"
                  className={errors.category ? "border-destructive" : ""}
                />
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your product..."
                rows={3}
                className={errors.description ? "border-destructive" : ""}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="0.00"
                  className={errors.price ? "border-destructive" : ""}
                />
                {errors.price && (
                  <p className="text-sm text-destructive">{errors.price}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity *</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => handleInputChange("stock", e.target.value)}
                  placeholder="0"
                  className={errors.stock ? "border-destructive" : ""}
                />
                {errors.stock && (
                  <p className="text-sm text-destructive">{errors.stock}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <Button type="submit" variant="gradient" className="gap-2">
                <Save className="h-4 w-4" />
                {isEditing ? "Update Product" : "Create Product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/products")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}