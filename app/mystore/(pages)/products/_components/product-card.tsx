import { Card } from "@/components/ui/card";
import {
  IconShoppingCart,
  IconEdit,
  IconTrash,
  IconStar,
} from "@tabler/icons-react";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  stock: number;
  rating?: number;
  sales?: number;
}

const ProductCard = ({
  id = "1",
  name = "Premium Product Name",
  category = "Electronics",
  price = 299.99,
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
  stock = 24,
  rating = 4.5,
  sales = 156,
}: Partial<ProductCardProps>) => {
  const isLowStock = stock < 10;
  const isOutOfStock = stock === 0;

  return (
    <Card className="group p-0 relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-emerald-500 transition-all duration-300">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold rounded-full border border-gray-200">
            {category}
          </span>
        </div>

        {/* Stock Status Badge */}
        {isOutOfStock ? (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
              Out of Stock
            </span>
          </div>
        ) : isLowStock ? (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
              Low Stock
            </span>
          </div>
        ) : null}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button className="p-2.5 bg-white hover:bg-emerald-500 text-gray-700 hover:text-white rounded-lg transition-colors">
            <IconEdit className="w-4 h-4" />
          </button>
          <button className="p-2.5 bg-white hover:bg-red-500 text-gray-700 hover:text-white rounded-lg transition-colors">
            <IconTrash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-gray-900 font-semibold text-base mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
          {name}
        </h3>

        {/* Rating & Sales */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <IconStar className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium text-gray-700">{rating}</span>
          </div>
          <span className="text-gray-300">•</span>
          <span className="text-sm text-gray-500">{sales} sold</span>
        </div>

        {/* Price & Stock */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              ${price.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Stock
            </p>
            <p
              className={`text-sm font-semibold ${
                isOutOfStock
                  ? "text-red-600"
                  : isLowStock
                  ? "text-amber-600"
                  : "text-emerald-600"
              }`}
            >
              {stock} units
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
