import { IconPlus, IconShoppingCart, IconPackage } from "@tabler/icons-react";

const QuickActions = () => {
  const actions = [
    {
      label: "Add New Product",
      icon: IconPlus,
      primary: true,
      href: "/mystore/products/new",
    },
    {
      label: "View Orders",
      icon: IconShoppingCart,
      primary: false,
      href: "/mystore/orders",
    },
    {
      label: "Manage Inventory",
      icon: IconPackage,
      primary: false,
      href: "/mystore/inventory",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-gray-900 text-xl font-bold mb-1">Quick Actions</h3>
        <p className="text-gray-500 text-sm">Frequently used shortcuts</p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-6 grid grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <a
            key={index}
            href={action.href}
            className={`
              group flex flex-col items-center gap-3 w-full font-medium py-3.5 px-4 rounded-lg transition-all duration-200
              bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 hover:border-emerald-500
            
            `}
          >
            <div className="bg-emerald-200 p-2 rounded-lg">
              <action.icon
                className={`w-5 h-5 text-gray-600 group-hover:text-emerald-600 `}
                strokeWidth={2}
              />
            </div>
            <span>{action.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
