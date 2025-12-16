import React from "react";
import {
  ShoppingBag,
  Store,
  Truck,
  Building2,
  Check,
  ArrowRight,
  ArrowLeft,
  Users,
} from "lucide-react";

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
  const roleConfig = {
    customer: {
      accent: "text-emerald-600",
      border: "border-emerald-500",
      ring: "ring-emerald-500",
      shadow: "shadow-emerald-500/20",
      bgSelect: "bg-emerald-50",
      gradient: "from-emerald-400 to-emerald-600",
    },
    store_owner: {
      accent: "text-amber-600",
      border: "border-amber-500",
      ring: "ring-amber-500",
      shadow: "shadow-amber-500/20",
      bgSelect: "bg-amber-50",
      gradient: "from-amber-400 to-amber-600",
    },
    courier: {
      accent: "text-blue-600",
      border: "border-blue-500",
      ring: "ring-blue-500",
      shadow: "shadow-blue-500/20",
      bgSelect: "bg-blue-50",
      gradient: "from-blue-400 to-blue-600",
    },
    agency: {
      accent: "text-violet-600",
      border: "border-violet-500",
      ring: "ring-violet-500",
      shadow: "shadow-violet-500/20",
      bgSelect: "bg-violet-50",
      gradient: "from-violet-400 to-violet-600",
    },
  };

  const roles = [
    {
      id: "customer",
      icon: <ShoppingBag size={32} />,
      title: "Customer",
      description: "Shop from verified sellers with secure escrow protection",
      benefits: [
        "Browse thousands of products",
        "Secure escrow payments",
        "Easy returns & refunds",
        "Track your orders",
      ],
    },
    {
      id: "store_owner",
      icon: <Store size={32} />,
      title: "Store Owner",
      description:
        "Start your online business and reach thousands of customers",
      benefits: [
        "Easy store setup",
        "Secure payment processing",
        "Analytics dashboard",
        "Marketing tools included",
      ],
    },
    {
      id: "courier",
      icon: <Truck size={32} />,
      title: "Courier",
      description: "Earn money delivering packages on your own schedule",
      benefits: [
        "Flexible working hours",
        "Weekly payouts",
        "Route optimization",
        "Earn per delivery",
      ],
    },
    {
      id: "agency",
      icon: <Building2 size={32} />,
      title: "Agency",
      description: "Partner with us to provide logistics services at scale",
      benefits: [
        "Handle bulk orders",
        "API integration",
        "Priority support",
        "Custom pricing plans",
      ],
    },
  ];

  const handleNext = () => {
    if (selectedRole) onNext();
  };

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-xs font-bold tracking-widest uppercase mb-6">
          <Users size={14} className="text-gray-700" />
          Select Role
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-mont tracking-tight">
          Choose Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
            Role
          </span>
        </h2>
        <p className="text-gray-500 font-noto text-sm max-w-md mx-auto">
          Select how you'd like to use Escro. Your dashboard will be customized
          to this choice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          // @ts-ignore - Dynamic access
          const styles = roleConfig[role.id];

          return (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className={`
                group relative flex flex-col h-full text-left rounded-2xl p-6 transition-all duration-300
                border-2
                ${
                  isSelected
                    ? `${styles.border} ${styles.bgSelect} ${styles.shadow} shadow-lg scale-[1.02]`
                    : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-sm"
                }
              `}
            >
              <div
                className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? `bg-gradient-to-br ${styles.gradient} scale-100 opacity-100`
                    : "bg-gray-100 scale-0 opacity-0"
                }`}
              >
                <Check size={14} className="text-white stroke-[3]" />
              </div>

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-gray-50 border border-gray-100 transition-all duration-300 ${
                  isSelected
                    ? styles.accent
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
              >
                <div
                  className={`transition-transform duration-300 ${
                    isSelected ? "scale-110" : "group-hover:scale-110"
                  }`}
                >
                  {role.icon}
                </div>
              </div>

              <h3
                className={`text-xl font-bold mb-2 font-mont tracking-tight transition-colors ${
                  isSelected ? "text-gray-900" : "text-gray-800"
                }`}
              >
                {role.title}
              </h3>

              <p className="text-sm text-gray-600 mb-6 font-noto leading-relaxed min-h-[40px]">
                {role.description}
              </p>

              <ul className="space-y-2 mt-auto">
                {role.benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 text-xs font-medium text-gray-500 font-noto"
                  >
                    <div
                      className={`w-1 h-1 rounded-full transition-colors ${
                        isSelected
                          ? `bg-current ${styles.accent}`
                          : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={`transition-colors ${
                        isSelected ? "text-gray-700" : "text-gray-500"
                      }`}
                    >
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              {isSelected && (
                <div
                  className={`absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r ${styles.gradient} opacity-50`}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex gap-4 pt-4 border-t border-gray-200">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-4 rounded-xl border border-gray-300 text-gray-600 font-bold hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <ArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!selectedRole}
          className={`
                flex-1 relative overflow-hidden px-6 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group
                ${
                  selectedRole
                    ? "bg-emerald-500 hover:bg-emerald-400 hover:shadow-emerald-500/20 cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }
            `}
        >
          <span className="relative z-10 flex items-center gap-2">
            Continue
            <ArrowRight
              size={18}
              className={`transition-transform ${
                selectedRole ? "group-hover:translate-x-1" : ""
              }`}
            />
          </span>

          {selectedRole && (
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          )}
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
