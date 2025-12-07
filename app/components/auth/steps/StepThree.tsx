import React from "react";
import {
  MapPin,
  Building,
  FileText,
  CreditCard,
  Car,
  Users,
  Briefcase,
  ChevronDown,
  Bike,
  Truck,
  Box,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface StepThreeProps {
  role: string;
  formData: any;
  errors: any;
  onChange: (field: string, value: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const getTheme = (role: string) => {
  switch (role) {
    case "store_owner":
      return {
        color: "text-amber-600",
        border: "focus-within:border-amber-500",
        glow: "focus-within:shadow-amber-500/20",
        bg: "bg-amber-500",
        ring: "focus:ring-amber-500",
      };
    case "courier":
      return {
        color: "text-blue-600",
        border: "focus-within:border-blue-500",
        glow: "focus-within:shadow-blue-500/20",
        bg: "bg-blue-500",
        ring: "focus:ring-blue-500",
      };
    case "agency":
      return {
        color: "text-violet-600",
        border: "focus-within:border-violet-500",
        glow: "focus-within:shadow-violet-500/20",
        bg: "bg-violet-500",
        ring: "focus:ring-violet-500",
      };
    default:
      return {
        color: "text-emerald-600",
        border: "focus-within:border-emerald-500",
        glow: "focus-within:shadow-emerald-500/20",
        bg: "bg-emerald-500",
        ring: "focus:ring-emerald-500",
      };
  }
};

const SotaInput = ({ label, icon: Icon, error, theme, ...props }: any) => (
  <div className={`group relative transition-all duration-300`}>
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
      {label}
    </label>
    <div
      className={`relative flex items-center bg-gray-50 border-2 rounded-xl transition-all duration-300 ${
        error ? "border-red-500/50" : "border-gray-200"
      } ${theme.border} ${theme.glow}`}
    >
      <div
        className={`pl-4 pr-3 ${
          error ? "text-red-500" : "text-gray-400"
        } group-focus-within:${theme.color} transition-colors`}
      >
        {Icon}
      </div>
      <input
        className="w-full bg-transparent p-4 pl-0 text-gray-900 placeholder-gray-400 outline-none font-medium"
        {...props}
      />
    </div>
    {error && (
      <p className="text-red-500 text-xs mt-1 ml-1 font-medium animate-pulse">
        {error}
      </p>
    )}
  </div>
);

const SotaSelect = ({
  label,
  icon: Icon,
  options,
  error,
  theme,
  ...props
}: any) => (
  <div className="group relative">
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
      {label}
    </label>
    <div
      className={`relative flex items-center bg-gray-50 border-2 rounded-xl transition-all duration-300 ${
        error ? "border-red-500/50" : "border-gray-200"
      } ${theme.border} ${theme.glow}`}
    >
      <div
        className={`pl-4 pr-3 ${
          error ? "text-red-500" : "text-gray-400"
        } group-focus-within:${theme.color} transition-colors`}
      >
        {Icon || <Box size={20} />}
      </div>
      <select
        className="w-full bg-transparent p-4 pl-0 text-gray-900 outline-none appearance-none cursor-pointer font-medium"
        {...props}
      >
        <option value="" disabled className="bg-gray-100 text-gray-400">
          Select an option...
        </option>
        {options.map((opt: any) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-white text-gray-900"
          >
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-4 pointer-events-none text-gray-400 group-focus-within:text-gray-600 transition-colors">
        <ChevronDown size={18} />
      </div>
    </div>
    {error && (
      <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{error}</p>
    )}
  </div>
);

const CustomerFields = ({ formData, errors, onChange, theme }: any) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <SotaInput
      label="Delivery Address"
      placeholder="e.g. 123 Cyberpunk Avenue, Unit 42"
      icon={<MapPin size={20} />}
      value={formData.deliveryAddress || ""}
      onChange={(e: any) => onChange("deliveryAddress", e.target.value)}
      error={errors.deliveryAddress}
      theme={theme}
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SotaSelect
        label="State / Region"
        icon={<MapPin size={20} />}
        options={[
          { value: "lagos", label: "Lagos State" },
          { value: "abuja", label: "FCT - Abuja" },
          { value: "kano", label: "Kano State" },
          { value: "rivers", label: "Rivers State" },
        ]}
        value={formData.state || ""}
        onChange={(e: any) => onChange("state", e.target.value)}
        error={errors.state}
        theme={theme}
      />
      <SotaInput
        label="City"
        placeholder="Enter City"
        icon={<Building size={20} />}
        value={formData.city || ""}
        onChange={(e: any) => onChange("city", e.target.value)}
        error={errors.city}
        theme={theme}
      />
    </div>
  </div>
);

const StoreOwnerFields = ({ formData, errors, onChange, theme }: any) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <SotaInput
      label="Business Name"
      placeholder="Legal Entity Name"
      icon={<Building size={20} />}
      value={formData.businessName || ""}
      onChange={(e: any) => onChange("businessName", e.target.value)}
      error={errors.businessName}
      theme={theme}
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SotaInput
        label="Registration No."
        placeholder="RC-000000"
        icon={<FileText size={20} />}
        value={formData.businessRegNumber || ""}
        onChange={(e: any) => onChange("businessRegNumber", e.target.value)}
        error={errors.businessRegNumber}
        theme={theme}
      />
      <SotaSelect
        label="Niche / Category"
        options={[
          { value: "electronics", label: "Electronics & Tech" },
          { value: "fashion", label: "Fashion & Apparel" },
          { value: "food", label: "Food & Consumables" },
          { value: "beauty", label: "Health & Beauty" },
        ]}
        value={formData.storeCategory || ""}
        onChange={(e: any) => onChange("storeCategory", e.target.value)}
        error={errors.storeCategory}
        theme={theme}
      />
    </div>

    <SotaInput
      label="HQ Address"
      placeholder="Primary warehouse or store location"
      icon={<MapPin size={20} />}
      value={formData.businessAddress || ""}
      onChange={(e: any) => onChange("businessAddress", e.target.value)}
      error={errors.businessAddress}
      theme={theme}
    />
  </div>
);

const CourierFields = ({ formData, errors, onChange, theme }: any) => {
  const vehicles = [
    { id: "bike", label: "Bike", icon: <Bike size={24} /> },
    { id: "car", label: "Car", icon: <Car size={24} /> },
    { id: "van", label: "Van", icon: <Truck size={24} /> },
    { id: "truck", label: "Truck", icon: <Truck size={30} /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 ml-1">
          Operational Vehicle
        </label>
        <div className="grid grid-cols-4 gap-3">
          {vehicles.map((v) => {
            const isSelected = formData.vehicleType === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onChange("vehicleType", v.id)}
                className={`
                            flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300
                            ${
                              isSelected
                                ? `bg-blue-100 border-blue-500 text-blue-600 shadow-lg shadow-blue-500/20`
                                : "bg-gray-50 border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600"
                            }
                        `}
              >
                <div className="mb-2">{v.icon}</div>
                <span className="text-xs font-bold">{v.label}</span>
              </button>
            );
          })}
        </div>
        {errors.vehicleType && (
          <p className="text-red-500 text-xs mt-2">{errors.vehicleType}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SotaInput
          label="License ID"
          placeholder="Driver's License"
          icon={<Briefcase size={20} />}
          value={formData.licenseNumber || ""}
          onChange={(e: any) => onChange("licenseNumber", e.target.value)}
          error={errors.licenseNumber}
          theme={theme}
        />
        <SotaInput
          label="Plate Number"
          placeholder="Vehicle Reg"
          icon={<Car size={20} />}
          value={formData.vehicleRegNumber || ""}
          onChange={(e: any) => onChange("vehicleRegNumber", e.target.value)}
          error={errors.vehicleRegNumber}
          theme={theme}
        />
      </div>

      <SotaSelect
        label="Primary Zone"
        icon={<MapPin size={20} />}
        options={[
          { value: "lagos_island", label: "Lagos Island" },
          { value: "lagos_mainland", label: "Lagos Mainland" },
          { value: "abuja_central", label: "Abuja Central" },
          { value: "nationwide", label: "Interstate / Nationwide" },
        ]}
        value={formData.workingArea || ""}
        onChange={(e: any) => onChange("workingArea", e.target.value)}
        error={errors.workingArea}
        theme={theme}
      />
    </div>
  );
};

const AgencyFields = ({ formData, errors, onChange, theme }: any) => {
  const areas = [
    { id: "lagos", label: "Lagos" },
    { id: "abuja", label: "Abuja" },
    { id: "kano", label: "Kano" },
    { id: "ph", label: "Port Harcourt" },
    { id: "ibadan", label: "Ibadan" },
    { id: "kaduna", label: "Kaduna" },
  ];

  const toggleArea = (id: string) => {
    const current = formData.serviceAreas || [];
    const updated = current.includes(id)
      ? current.filter((x: string) => x !== id)
      : [...current, id];
    onChange("serviceAreas", updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SotaInput
        label="Agency Name"
        placeholder="Logistics Company Name"
        icon={<Building size={20} />}
        value={formData.agencyName || ""}
        onChange={(e: any) => onChange("agencyName", e.target.value)}
        error={errors.agencyName}
        theme={theme}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SotaInput
          label="CAC Reg No."
          placeholder="BN/RC Number"
          icon={<FileText size={20} />}
          value={formData.agencyRegNumber || ""}
          onChange={(e: any) => onChange("agencyRegNumber", e.target.value)}
          error={errors.agencyRegNumber}
          theme={theme}
        />
        <SotaInput
          label="Fleet Size"
          placeholder="Total Couriers"
          type="number"
          icon={<Users size={20} />}
          value={formData.courierCount || ""}
          onChange={(e: any) => onChange("courierCount", e.target.value)}
          error={errors.courierCount}
          theme={theme}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 ml-1">
          Active Territories{" "}
          <span className="text-gray-400 lowercase font-normal">
            (Select multiple)
          </span>
        </label>
        <div className="flex flex-wrap gap-3">
          {areas.map((area) => {
            const isSelected = (formData.serviceAreas || []).includes(area.id);
            return (
              <button
                key={area.id}
                type="button"
                onClick={() => toggleArea(area.id)}
                className={`
                            px-4 py-2 rounded-lg text-sm font-bold border transition-all duration-200 flex items-center gap-2
                            ${
                              isSelected
                                ? `bg-violet-100 border-violet-500 text-violet-700 shadow-sm`
                                : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            }
                        `}
              >
                {isSelected && (
                  <CheckCircle2 size={14} className="text-violet-600" />
                )}
                {area.label}
              </button>
            );
          })}
        </div>
        {errors.serviceAreas && (
          <p className="text-red-500 text-xs mt-2">{errors.serviceAreas}</p>
        )}
      </div>
    </div>
  );
};

const StepThree: React.FC<StepThreeProps> = ({
  role,
  formData,
  errors,
  onChange,
  onNext,
  onBack,
}) => {
  const theme = getTheme(role);

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 font-mont tracking-tight">
          {role === "customer" && "Shipping Details"}
          {role === "store_owner" && "Store Configuration"}
          {role === "courier" && "Logistics Setup"}
          {role === "agency" && "Agency Profile"}
        </h2>
        <p className="text-gray-500 font-noto text-sm">
          Please provide accurate data for verification.
        </p>
      </div>

      <div className="mb-8">
        {role === "customer" && (
          <CustomerFields
            formData={formData}
            errors={errors}
            onChange={onChange}
            theme={theme}
          />
        )}
        {role === "store_owner" && (
          <StoreOwnerFields
            formData={formData}
            errors={errors}
            onChange={onChange}
            theme={theme}
          />
        )}
        {role === "courier" && (
          <CourierFields
            formData={formData}
            errors={errors}
            onChange={onChange}
            theme={theme}
          />
        )}
        {role === "agency" && (
          <AgencyFields
            formData={formData}
            errors={errors}
            onChange={onChange}
            theme={theme}
          />
        )}
      </div>

      <div className="flex gap-4 border-t border-gray-200 pt-6">
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
          onClick={onNext}
          className={`
                flex-1 relative overflow-hidden px-6 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group
                ${theme.bg} hover:brightness-110
            `}
        >
          <span className="relative z-10 flex items-center gap-2">
            Continue
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>

          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </button>
      </div>
    </div>
  );
};

export default StepThree;
