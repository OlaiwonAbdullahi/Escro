import React, { useState } from "react";
import {
  ShoppingBag,
  Store,
  Truck,
  Building2,
  ChevronDown,
  ChevronUp,
  TestTube2,
} from "lucide-react";

interface DemoCredsProps {
  onFillDemo: (demoData: any) => void;
}

const DemoCreds: React.FC<DemoCredsProps> = ({ onFillDemo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const demoAccounts = [
    {
      role: "customer",
      icon: <ShoppingBag size={20} />,
      title: "Customer Account",
      color: "from-emerald-400 to-emerald-600",
      data: {
        fullName: "John Doe",
        email: "customer@demo.com",
        phone: "+99 800 123 4567",
        password: "Demo1234!",
        confirmPassword: "Demo1234!",
        role: "customer",
        deliveryAddress: "Somewhere in Georgia",
        city: "city",
        state: "state",
      },
    },
    {
      role: "store_owner",
      icon: <Store size={20} />,
      title: "Store Owner Account",
      color: "from-amber-400 to-amber-600",
      data: {
        fullName: "Jane Smith",
        email: "seller@demo.com",
        phone: "+99 800 234 5678",
        password: "Demo1234!",
        confirmPassword: "Demo1234!",
        role: "store_owner",
        businessName: "Georgian store",
        businessRegNumber: "RC1234567",
        storeCategory: "electronics",
        businessAddress: "somewhere in georgia",
        taxId: "tax-num",
      },
    },
    {
      role: "courier",
      icon: <Truck size={20} />,
      title: "Courier Account",
      color: "from-blue-400 to-blue-600",
      data: {
        fullName: "John Smith",
        email: "courier@demo.com",
        phone: "+99 800 345 6789",
        password: "Demo1234!",
        confirmPassword: "Demo1234!",
        role: "courier",
        vehicleType: "bike",
        licenseNumber: "LIC-ABC-123456",
        vehicleRegNumber: "GA-123",
        workingArea: "georgia_island",
      },
    },
    {
      role: "agency",
      icon: <Building2 size={20} />,
      title: "Agency Account",
      color: "from-purple-400 to-purple-600",
      data: {
        fullName: "Michael Chen",
        email: "agency@demo.com",
        phone: "+99 800 456 7890",
        password: "Demo1234!",
        confirmPassword: "Demo1234!",
        role: "agency",
        agencyName: "Fast_asf logistics",
        agencyRegNumber: "RC7654321",
        courierCount: "50",
        serviceAreas: ["somewhere", "in", "georgia"],
        officeAddress: "georgia_island",
      },
    },
  ];

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg p-4 hover:border-emerald-500 hover:shadow-md transition-all duration-300 flex items-center justify-between group shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
            <TestTube2 size={20} className="text-emerald-600" />
          </div>
          <div className="text-left">
            <h3 className="text-gray-900 font-semibold font-mont">
              Demo Accounts
            </h3>
            <p className="text-xs text-gray-500 font-noto">
              Click to auto-fill form for testing
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp
            size={20}
            className="text-gray-500 group-hover:text-emerald-600 transition-colors"
          />
        ) : (
          <ChevronDown
            size={20}
            className="text-gray-500 group-hover:text-emerald-600 transition-colors"
          />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in">
          {demoAccounts.map((account, index) => (
            <button
              key={index}
              onClick={() => {
                onFillDemo(account.data);
                setIsOpen(false);
              }}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-emerald-500 hover:shadow-md transition-all duration-300 text-left group shadow-sm"
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
                  <h4 className="text-gray-900 font-semibold text-sm font-mont mb-1">
                    {account.title}
                  </h4>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600 font-noto">
                      <span className="text-gray-500">Email:</span>{" "}
                      {account.data.email}
                    </p>
                    <p className="text-xs text-gray-600 font-noto">
                      <span className="text-gray-500">Password:</span>{" "}
                      {account.data.password}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs text-emerald-600 font-semibold font-mont opacity-0 group-hover:opacity-100 transition-opacity">
                Click to auto-fill →
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-700 font-noto">
            <strong>Note:</strong> These are demo accounts for testing purposes
            only. All data will be auto-filled when you click an account.
          </p>
        </div>
      )}
    </div>
  );
};

export default DemoCreds;
