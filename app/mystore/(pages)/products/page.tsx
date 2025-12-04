import ProductCard from "./_components/product-card";
import { IconPlus, IconSearch, IconAdjustments } from "@tabler/icons-react";

const Page = () => {
  const products = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      stock: 24,
      rating: 4.5,
      sales: 156,
    },
    {
      id: "2",
      name: "Smart Watch Pro",
      category: "Wearables",
      price: 449.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      stock: 8,
      rating: 4.8,
      sales: 203,
    },
    {
      id: "3",
      name: "Laptop Stand Aluminum",
      category: "Accessories",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
      stock: 45,
      rating: 4.3,
      sales: 89,
    },
    {
      id: "4",
      name: "Mechanical Keyboard RGB",
      category: "Electronics",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&h=500&fit=crop",
      stock: 0,
      rating: 4.7,
      sales: 312,
    },
    {
      id: "5",
      name: "Wireless Mouse",
      category: "Accessories",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
      stock: 67,
      rating: 4.4,
      sales: 178,
    },
    {
      id: "6",
      name: "USB-C Hub Adapter",
      category: "Accessories",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
      stock: 5,
      rating: 4.2,
      sales: 145,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-black text-3xl font-bold mb-2">Products</h1>
            <p className="text-gray-500">
              Manage your store inventory and products
            </p>
          </div>
          <button className="bg-emerald-900 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 flex items-center gap-2 shadow-sm">
            <IconPlus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 rounded-md pl-11 pr-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>

            {/* Filter Button */}
            <button className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center gap-2">
              <IconAdjustments className="w-5 h-5" strokeWidth={1} />
              <span className="hidden md:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Empty State (if no products) */}
        {products.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No products found</p>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center gap-2">
              <IconPlus className="w-5 h-5" />
              Add Your First Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
