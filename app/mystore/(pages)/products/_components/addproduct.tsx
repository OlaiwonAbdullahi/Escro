"use client";
import { useState } from "react";
import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AddProduct = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl">
          <Plus className="w-5 h-5" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] font-mont scrollbar-hide max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Add New Product
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Fill in the product details below to add it to your inventory.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-semibold text-gray-700"
            >
              Product Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Premium Wireless Headphones"
              className="h-11 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="category"
              className="text-sm font-semibold text-gray-700"
            >
              Category <span className="text-red-500">*</span>
            </Label>
            <Select name="category" required>
              <SelectTrigger className="h-11 w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="wearables">Wearables</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="home">Home & Living</SelectItem>
                <SelectItem value="sports">Sports & Outdoors</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="price"
                className="text-sm font-semibold text-gray-700"
              >
                Price <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  $
                </span>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="0.00"
                  className="h-11 pl-8 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="stock"
                className="text-sm font-semibold text-gray-700"
              >
                Stock Quantity <span className="text-red-500">*</span>
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                placeholder="0"
                className="h-11 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                min="0"
                required
              />
            </div>
          </div>
          <div className="">
            <Label
              htmlFor="description"
              className="text-sm font-semibold text-gray-700"
            >
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Product description"
              className="h-24 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Product Image
            </Label>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="hidden"
              />
              <label
                htmlFor="image"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <span className="text-emerald-600 font-semibold">
                    Click to upload
                  </span>
                  <span className="text-gray-500"> or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, WEBP up to 10MB
                </p>
              </label>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 flex">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 ml-3 text-white font-semibold  cursor-pointer transition-all"
            >
              Add Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
