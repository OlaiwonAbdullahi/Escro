import Categories from "./_components/cartegories";
import FeaturedGoods from "./_components/featured-goods";
import FeaturedServices from "./_components/featured-services";

const Page = () => {
  return (
    <div className="min-h-screen md:px-20 px-4">
      {/* Welcome Section */}
      <div className="pt-8 pb-2">
        <h1 className="text-3xl font-bold text-black font-noto tracking-tight mb-2">
          Welcome back, <span className="text-emerald-400">John</span> 👋
        </h1>
        <p className="text-gray-400 font-mont">
          Discover amazing products from verified sellers with escrow protection
        </p>
      </div>

      {/* Categories Section */}
      <Categories />

      {/* Featured Products Section */}
      <FeaturedGoods />

      {/* Featured Services Section */}
      <FeaturedServices />
    </div>
  );
};

export default Page;
