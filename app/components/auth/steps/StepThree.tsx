import React from "react";
import {
  MapPin,
  Building,
  FileText,
  CreditCard,
  Car,
  Users,
  Briefcase,
} from "lucide-react";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";

interface StepThreeProps {
  role: string;
  formData: any;
  errors: any;
  onChange: (field: string, value: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const CustomerFields = ({ formData, errors, onChange }: any) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-white mb-2 font-mont">
        Delivery Information
      </h2>
      <p className="text-gray-400 font-noto">
        Tell us where you'd like your orders delivered
      </p>
    </div>

    <Input
      label="Delivery Address"
      type="text"
      placeholder="123 Main Street, Apartment 4B"
      icon={<MapPin size={20} />}
      value={formData.deliveryAddress || ""}
      onChange={(e) => onChange("deliveryAddress", e.target.value)}
      error={errors.deliveryAddress}
      required
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Select
        label="State"
        options={[
          { value: "lagos", label: "Lagos" },
          { value: "abuja", label: "Abuja" },
          { value: "kano", label: "Kano" },
          { value: "rivers", label: "Rivers" },
          { value: "oyo", label: "Oyo" },
        ]}
        placeholder="Select state"
        value={formData.state || ""}
        onChange={(e) => onChange("state", e.target.value)}
        error={errors.state}
        required
      />

      <Input
        label="City"
        type="text"
        placeholder="Enter city"
        value={formData.city || ""}
        onChange={(e) => onChange("city", e.target.value)}
        error={errors.city}
        required
      />
    </div>
  </div>
);

const StoreOwnerFields = ({ formData, errors, onChange }: any) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-white mb-2 font-mont">
        Business Information
      </h2>
      <p className="text-gray-400 font-noto">
        Help us verify your business details
      </p>
    </div>

    <Input
      label="Business Name"
      type="text"
      placeholder="Your Store Name"
      icon={<Building size={20} />}
      value={formData.businessName || ""}
      onChange={(e) => onChange("businessName", e.target.value)}
      error={errors.businessName}
      required
    />

    <Input
      label="Business Registration Number"
      type="text"
      placeholder="RC1234567"
      icon={<FileText size={20} />}
      value={formData.businessRegNumber || ""}
      onChange={(e) => onChange("businessRegNumber", e.target.value)}
      error={errors.businessRegNumber}
      helperText="Your CAC registration number"
      required
    />

    <Select
      label="Store Category"
      options={[
        { value: "electronics", label: "Electronics" },
        { value: "fashion", label: "Fashion & Apparel" },
        { value: "food", label: "Food & Beverages" },
        { value: "beauty", label: "Beauty & Personal Care" },
        { value: "home", label: "Home & Garden" },
        { value: "sports", label: "Sports & Outdoors" },
        { value: "books", label: "Books & Media" },
        { value: "other", label: "Other" },
      ]}
      placeholder="Select category"
      value={formData.storeCategory || ""}
      onChange={(e) => onChange("storeCategory", e.target.value)}
      error={errors.storeCategory}
      required
    />

    <Input
      label="Business Address"
      type="text"
      placeholder="Store location or warehouse address"
      icon={<MapPin size={20} />}
      value={formData.businessAddress || ""}
      onChange={(e) => onChange("businessAddress", e.target.value)}
      error={errors.businessAddress}
      required
    />

    <Input
      label="Tax ID (Optional)"
      type="text"
      placeholder="Enter tax identification number"
      icon={<CreditCard size={20} />}
      value={formData.taxId || ""}
      onChange={(e) => onChange("taxId", e.target.value)}
      error={errors.taxId}
      helperText="TIN for tax purposes"
    />
  </div>
);

const CourierFields = ({ formData, errors, onChange }: any) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-white mb-2 font-mont">
        Courier Information
      </h2>
      <p className="text-gray-400 font-noto">
        Tell us about your delivery setup
      </p>
    </div>

    <Select
      label="Vehicle Type"
      options={[
        { value: "bike", label: "Motorcycle" },
        { value: "car", label: "Car" },
        { value: "van", label: "Van" },
        { value: "truck", label: "Truck" },
      ]}
      placeholder="Select vehicle type"
      value={formData.vehicleType || ""}
      onChange={(e) => onChange("vehicleType", e.target.value)}
      error={errors.vehicleType}
      required
    />

    <Input
      label="Driver's License Number"
      type="text"
      placeholder="Enter license number"
      icon={<Briefcase size={20} />}
      value={formData.licenseNumber || ""}
      onChange={(e) => onChange("licenseNumber", e.target.value)}
      error={errors.licenseNumber}
      required
    />

    <Input
      label="Vehicle Registration Number"
      type="text"
      placeholder="ABC-123-XY"
      icon={<Car size={20} />}
      value={formData.vehicleRegNumber || ""}
      onChange={(e) => onChange("vehicleRegNumber", e.target.value)}
      error={errors.vehicleRegNumber}
      required
    />

    <Select
      label="Preferred Working Area"
      options={[
        { value: "lagos_island", label: "Lagos Island" },
        { value: "lagos_mainland", label: "Lagos Mainland" },
        { value: "abuja_central", label: "Abuja Central" },
        { value: "abuja_suburbs", label: "Abuja Suburbs" },
        { value: "nationwide", label: "Nationwide" },
      ]}
      placeholder="Select area"
      value={formData.workingArea || ""}
      onChange={(e) => onChange("workingArea", e.target.value)}
      error={errors.workingArea}
      required
    />
  </div>
);

const AgencyFields = ({ formData, errors, onChange }: any) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-white mb-2 font-mont">
        Agency Information
      </h2>
      <p className="text-gray-400 font-noto">
        Tell us about your logistics agency
      </p>
    </div>

    <Input
      label="Agency Name"
      type="text"
      placeholder="Your Agency Name"
      icon={<Building size={20} />}
      value={formData.agencyName || ""}
      onChange={(e) => onChange("agencyName", e.target.value)}
      error={errors.agencyName}
      required
    />

    <Input
      label="Registration Number"
      type="text"
      placeholder="Business registration number"
      icon={<FileText size={20} />}
      value={formData.agencyRegNumber || ""}
      onChange={(e) => onChange("agencyRegNumber", e.target.value)}
      error={errors.agencyRegNumber}
      required
    />

    <Input
      label="Number of Couriers"
      type="number"
      placeholder="e.g., 50"
      icon={<Users size={20} />}
      value={formData.courierCount || ""}
      onChange={(e) => onChange("courierCount", e.target.value)}
      error={errors.courierCount}
      helperText="Approximate number of active couriers"
      required
    />

    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-300 mb-2 font-mont">
        Service Areas <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 gap-3">
        {[
          { value: "lagos", label: "Lagos" },
          { value: "abuja", label: "Abuja" },
          { value: "kano", label: "Kano" },
          { value: "portharcourt", label: "Port Harcourt" },
          { value: "ibadan", label: "Ibadan" },
          { value: "kaduna", label: "Kaduna" },
        ].map((area) => (
          <label
            key={area.value}
            className="flex items-center space-x-2 bg-[#0F2F2F] border border-[#10B981]/20 rounded-lg p-3 cursor-pointer hover:border-[#10B981] transition-colors"
          >
            <input
              type="checkbox"
              checked={(formData.serviceAreas || []).includes(area.value)}
              onChange={(e) => {
                const current = formData.serviceAreas || [];
                const updated = e.target.checked
                  ? [...current, area.value]
                  : current.filter((v: string) => v !== area.value);
                onChange("serviceAreas", updated);
              }}
              className="w-4 h-4 text-[#10B981] bg-gray-700 border-gray-600 rounded focus:ring-[#10B981]"
            />
            <span className="text-sm text-gray-300 font-noto">
              {area.label}
            </span>
          </label>
        ))}
      </div>
      {errors.serviceAreas && (
        <p className="text-sm text-red-500 font-noto mt-1">
          {errors.serviceAreas}
        </p>
      )}
    </div>

    <Input
      label="Office Address"
      type="text"
      placeholder="Your main office location"
      icon={<MapPin size={20} />}
      value={formData.officeAddress || ""}
      onChange={(e) => onChange("officeAddress", e.target.value)}
      error={errors.officeAddress}
      required
    />
  </div>
);

const StepThree: React.FC<StepThreeProps> = ({
  role,
  formData,
  errors,
  onChange,
  onNext,
  onBack,
}) => {
  const renderFields = () => {
    switch (role) {
      case "customer":
        return (
          <CustomerFields
            formData={formData}
            errors={errors}
            onChange={onChange}
          />
        );
      case "store_owner":
        return (
          <StoreOwnerFields
            formData={formData}
            errors={errors}
            onChange={onChange}
          />
        );
      case "courier":
        return (
          <CourierFields
            formData={formData}
            errors={errors}
            onChange={onChange}
          />
        );
      case "agency":
        return (
          <AgencyFields
            formData={formData}
            errors={errors}
            onChange={onChange}
          />
        );
      default:
        return <div>Invalid role selected</div>;
    }
  };

  return (
    <div className="space-y-6">
      {renderFields()}

      <div className="flex gap-4 pt-4">
        <Button onClick={onBack} variant="outline" size="lg" className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} variant="primary" size="lg" className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default StepThree;
