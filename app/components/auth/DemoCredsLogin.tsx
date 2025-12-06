import React, { useState } from "react";
import {
  ShoppingBag,
  Store,
  Truck,
  Building2,
  ChevronDown,
  ChevronUp,
  TestTube2,
  LogIn,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface DemoCredsProps {
  onFillDemo: (demoData: { email: string; password: string }) => void;
}

const DemoCredsLogin: React.FC<DemoCredsProps> = ({ onFillDemo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const demoAccounts = [
    {
      role: "customer",
      icon: <ShoppingBag size={20} />,
      title: "Customer Account",
      color: "from-[#10B981] to-[#059669]",
      route: "/dashboard",
      data: {
        email: "customer@demo.com",
        password: "Demo1234!",
      },
    },
    {
      role: "store_owner",
      icon: <Store size={20} />,
      title: "Store Owner Account",
      color: "from-[#F59E0B] to-[#D97706]",
      route: "/mystore",
      data: {
        email: "seller@demo.com",
        password: "Demo1234!",
      },
    },
    {
      role: "courier",
      icon: <Truck size={20} />,
      title: "Courier Account",
      color: "from-[#3B82F6] to-[#2563EB]",
      route: "/courier",
      data: {
        email: "courier@demo.com",
        password: "Demo1234!",
      },
    },
    {
      role: "agency",
      icon: <Building2 size={20} />,
      title: "Agency Account",
      color: "from-[#8B5CF6] to-[#7C3AED]",
      route: "/agency",
      data: {
        email: "agency@demo.com",
        password: "Demo1234!",
      },
    },
  ];

  const handleAccountClick = (account: (typeof demoAccounts)[0]) => {
    onFillDemo(account.data);

    setTimeout(() => {
      router.push(account.route);
    }, 100);

    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#0F2F2F] border border-[#10B981]/20 rounded-lg p-4 hover:border-[#10B981] transition-all duration-300 flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
            <LogIn size={20} className="text-[#10B981]" />
          </div>
          <div className="text-left">
            <h3 className="text-white font-semibold font-mont">Demo Login</h3>
            <p className="text-xs text-gray-400 font-noto">
              Click to auto-fill and login as demo user
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp
            size={20}
            className="text-gray-400 group-hover:text-[#10B981] transition-colors"
          />
        ) : (
          <ChevronDown
            size={20}
            className="text-gray-400 group-hover:text-[#10B981] transition-colors"
          />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in">
          {demoAccounts.map((account, index) => (
            <button
              key={index}
              onClick={() => handleAccountClick(account)}
              className="bg-[#0F2F2F] border border-[#10B981]/20 rounded-lg p-4 hover:border-[#10B981] hover:scale-105 transition-all duration-300 text-left group"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${account.color} bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <div
                    className={`bg-gradient-to-br ${account.color} bg-clip-text text-transparent`}
                  >
                    {account.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm font-mont mb-1">
                    {account.title}
                  </h4>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 font-noto">
                      <span className="text-gray-500">Email:</span>{" "}
                      {account.data.email}
                    </p>
                    <p className="text-xs text-gray-400 font-noto">
                      <span className="text-gray-500">Password:</span>{" "}
                      {account.data.password}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-[#10B981] font-semibold font-mont opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to login →
                </span>
                <span className="text-xs text-gray-500 font-mont">
                  {account.route}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="mt-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
          <p className="text-xs text-blue-400 font-noto">
            <strong>Note:</strong> Click any demo account to auto-fill
            credentials and automatically navigate to the respective dashboard.
          </p>
        </div>
      )}
    </div>
  );
};

export default DemoCredsLogin;
