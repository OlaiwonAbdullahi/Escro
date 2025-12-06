import React from "react";
import { ShoppingBag, Store, Truck, Building2, Check } from "lucide-react";
import Button from "../../ui/Button";

interface StepTwoProps {
  selectedRole: string;
  onSelectRole: (role: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({
  selectedRole,
  onSelectRole,
  onNext,
  onBack,
}) => {
  const roles = [
    {
      id: "customer",
      icon: <ShoppingBag size={40} />,
      title: "Customer",
      description: "Shop from verified sellers with secure escrow protection",
      benefits: [
        "Browse thousands of products",
        "Secure escrow payments",
        "Easy returns & refunds",
        "Track your orders",
      ],
      color: "from-[#10B981] to-[#059669]",
      bgColor: "bg-[#10B981]/5",
      iconBg: "bg-[#10B981]/10",
      borderColor: "border-[#10B981]/20",
      selectedBorder: "border-[#10B981]",
    },
    {
      id: "store_owner",
      icon: <Store size={40} />,
      title: "Store Owner",
      description:
        "Start your online business and reach thousands of customers",
      benefits: [
        "Easy store setup",
        "Secure payment processing",
        "Analytics dashboard",
        "Marketing tools included",
      ],
      color: "from-[#F59E0B] to-[#D97706]",
      bgColor: "bg-[#F59E0B]/5",
      iconBg: "bg-[#F59E0B]/10",
      borderColor: "border-[#F59E0B]/20",
      selectedBorder: "border-[#F59E0B]",
    },
    {
      id: "courier",
      icon: <Truck size={40} />,
      title: "Courier",
      description: "Earn money delivering packages on your own schedule",
      benefits: [
        "Flexible working hours",
        "Weekly payouts",
        "Route optimization",
        "Earn per delivery",
      ],
      color: "from-[#3B82F6] to-[#2563EB]",
      bgColor: "bg-[#3B82F6]/5",
      iconBg: "bg-[#3B82F6]/10",
      borderColor: "border-[#3B82F6]/20",
      selectedBorder: "border-[#3B82F6]",
    },
    {
      id: "agency",
      icon: <Building2 size={40} />,
      title: "Agency",
      description: "Partner with us to provide logistics services at scale",
      benefits: [
        "Handle bulk orders",
        "API integration",
        "Priority support",
        "Custom pricing plans",
      ],
      color: "from-[#8B5CF6] to-[#7C3AED]",
      bgColor: "bg-[#8B5CF6]/5",
      iconBg: "bg-[#8B5CF6]/10",
      borderColor: "border-[#8B5CF6]/20",
      selectedBorder: "border-[#8B5CF6]",
    },
  ];

  const handleNext = () => {
    if (selectedRole) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 font-mont">
          Choose Your Role
        </h2>
        <p className="text-gray-400 font-noto">
          Select how you'd like to use Escro
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;

          return (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className={`
                ${role.bgColor} 
                border-2 
                ${isSelected ? role.selectedBorder : role.borderColor}
                rounded-xl p-6 text-left transition-all duration-300
                hover:scale-105 hover:${role.selectedBorder}
                relative group
                ${isSelected ? "shadow-lg" : ""}
              `}
            >
              {isSelected && (
                <div
                  className={`absolute top-4 right-4 w-8 h-8 bg-gradient-to-br ${role.color} rounded-full flex items-center justify-center`}
                >
                  <Check size={20} className="text-white" />
                </div>
              )}

              <div
                className={`${role.iconBg} w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <div
                  className={`bg-gradient-to-br ${role.color} bg-clip-text text-transparent`}
                >
                  {role.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 font-mont">
                {role.title}
              </h3>

              <p className="text-sm text-gray-400 mb-4 font-noto">
                {role.description}
              </p>

              <ul className="space-y-2">
                {role.benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-xs text-gray-300 font-noto"
                  >
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      {!selectedRole && (
        <p className="text-center text-gray-500 text-sm font-noto">
          Please select a role to continue
        </p>
      )}

      <div className="flex gap-4 pt-4">
        <Button onClick={onBack} variant="outline" size="lg" className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleNext}
          variant="primary"
          size="lg"
          className="flex-1"
          disabled={!selectedRole}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
