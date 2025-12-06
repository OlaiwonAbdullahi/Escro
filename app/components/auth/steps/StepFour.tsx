import React, { useState } from "react";
import {
  CheckCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  FileText,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import Button from "../../ui/Button";

interface StepFourProps {
  formData: any;
  onSubmit: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

const StepFour: React.FC<StepFourProps> = ({
  formData,
  onSubmit,
  onBack,
  isLoading = false,
}) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState("");

  const handleSubmit = () => {
    if (!acceptedTerms) {
      setTermsError("You must accept the Terms & Conditions to continue");
      return;
    }
    setTermsError("");
    onSubmit();
  };

  const getRoleName = (role: string) => {
    const roleMap: any = {
      customer: "Customer",
      store_owner: "Store Owner",
      courier: "Courier",
      agency: "Agency",
    };
    return roleMap[role] || role;
  };

  const renderRoleSpecificData = () => {
    switch (formData.role) {
      case "customer":
        return (
          <div className="space-y-3">
            <DataRow
              icon={<MapPin size={18} />}
              label="Delivery Address"
              value={formData.deliveryAddress}
            />
            <DataRow
              icon={<MapPin size={18} />}
              label="City"
              value={formData.city}
            />
            <DataRow
              icon={<MapPin size={18} />}
              label="State"
              value={formData.state}
            />
          </div>
        );

      case "store_owner":
        return (
          <div className="space-y-3">
            <DataRow
              icon={<Building size={18} />}
              label="Business Name"
              value={formData.businessName}
            />
            <DataRow
              icon={<FileText size={18} />}
              label="Registration Number"
              value={formData.businessRegNumber}
            />
            <DataRow
              icon={<Briefcase size={18} />}
              label="Store Category"
              value={formData.storeCategory}
            />
            <DataRow
              icon={<MapPin size={18} />}
              label="Business Address"
              value={formData.businessAddress}
            />
            {formData.taxId && (
              <DataRow
                icon={<FileText size={18} />}
                label="Tax ID"
                value={formData.taxId}
              />
            )}
          </div>
        );

      case "courier":
        return (
          <div className="space-y-3">
            <DataRow
              icon={<Briefcase size={18} />}
              label="Vehicle Type"
              value={formData.vehicleType}
            />
            <DataRow
              icon={<FileText size={18} />}
              label="License Number"
              value={formData.licenseNumber}
            />
            <DataRow
              icon={<FileText size={18} />}
              label="Vehicle Reg Number"
              value={formData.vehicleRegNumber}
            />
            <DataRow
              icon={<MapPin size={18} />}
              label="Working Area"
              value={formData.workingArea}
            />
          </div>
        );

      case "agency":
        return (
          <div className="space-y-3">
            <DataRow
              icon={<Building size={18} />}
              label="Agency Name"
              value={formData.agencyName}
            />
            <DataRow
              icon={<FileText size={18} />}
              label="Registration Number"
              value={formData.agencyRegNumber}
            />
            <DataRow
              icon={<User size={18} />}
              label="Number of Couriers"
              value={formData.courierCount}
            />
            <DataRow
              icon={<MapPin size={18} />}
              label="Service Areas"
              value={
                Array.isArray(formData.serviceAreas)
                  ? formData.serviceAreas.join(", ")
                  : formData.serviceAreas
              }
            />
            <DataRow
              icon={<MapPin size={18} />}
              label="Office Address"
              value={formData.officeAddress}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-[#10B981]" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 font-mont">
          Review Your Information
        </h2>
        <p className="text-gray-400 font-noto">
          Please verify all details before submitting
        </p>
      </div>

      {/* Account Information Section */}
      <div className="bg-[#0F2F2F] border border-[#10B981]/20 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 font-mont flex items-center gap-2">
          <User size={20} className="text-[#10B981]" />
          Account Information
        </h3>
        <div className="space-y-3">
          <DataRow
            icon={<User size={18} />}
            label="Full Name"
            value={formData.fullName}
          />
          <DataRow
            icon={<Mail size={18} />}
            label="Email"
            value={formData.email}
          />
          <DataRow
            icon={<Phone size={18} />}
            label="Phone"
            value={formData.phone}
          />
          <DataRow
            icon={<Briefcase size={18} />}
            label="Role"
            value={getRoleName(formData.role)}
          />
        </div>
      </div>

      {/* Role-Specific Information Section */}
      <div className="bg-[#0F2F2F] border border-[#10B981]/20 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 font-mont flex items-center gap-2">
          <FileText size={20} className="text-[#10B981]" />
          {getRoleName(formData.role)} Information
        </h3>
        {renderRoleSpecificData()}
      </div>

      {/* Terms & Conditions */}
      <div className="bg-[#0F2F2F] border border-[#10B981]/20 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 font-mont">
          Terms & Conditions
        </h3>

        <div className="bg-[#1F2937] rounded-lg p-4 max-h-48 overflow-y-auto mb-4 text-sm text-gray-300 font-noto space-y-2">
          <p className="font-semibold text-white">
            Escro Platform Terms of Service
          </p>

          <p>
            <strong>1. Account Registration:</strong> Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>

          <p>
            <strong>2. Escrow Protection:</strong> Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>

          <p>
            <strong>3. User Conduct:</strong> Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>

          <p>
            <strong>4. Privacy:</strong> Lorem ipsum dolor sit amet consectetur
            adipisicing elit.
          </p>

          <p>
            <strong>5. Fees:</strong> Lorem ipsum dolor sit amet consectetur
            adipisicing elit.
          </p>

          <p>
            <strong>6. Dispute Resolution:</strong> Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>

          <p>
            <strong>7. Termination:</strong> Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>
        </div>

        <label className="flex items-start space-x-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => {
              setAcceptedTerms(e.target.checked);
              if (e.target.checked) setTermsError("");
            }}
            className="w-5 h-5 mt-0.5 text-[#10B981] bg-gray-700 border-gray-600 rounded focus:ring-[#10B981] focus:ring-2"
          />
          <span className="text-sm text-gray-300 font-noto">
            I have read and agree to the{" "}
            <a
              href="#"
              className="text-[#10B981] hover:text-[#059669] font-semibold"
            >
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-[#10B981] hover:text-[#059669] font-semibold"
            >
              Privacy Policy
            </a>
          </span>
        </label>

        {termsError && (
          <div className="flex items-center gap-2 mt-3 text-red-500 text-sm font-noto">
            <AlertCircle size={16} />
            <span>{termsError}</span>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="flex-1"
          disabled={isLoading}
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          variant="primary"
          size="lg"
          className="flex-1"
          isLoading={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </div>

      {/* Additional Info */}
      <p className="text-center text-xs text-gray-500 font-noto">
        By creating an account, you'll be able to start using Escro immediately
        after email verification
      </p>
    </div>
  );
};

// Helper component for displaying data rows
const DataRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-start justify-between py-2 border-b border-gray-700 last:border-0">
    <div className="flex items-center gap-2 text-gray-400">
      <span className="text-[#10B981]">{icon}</span>
      <span className="text-sm font-noto">{label}:</span>
    </div>
    <span className="text-sm text-white font-semibold font-mont text-right max-w-[60%]">
      {value}
    </span>
  </div>
);

export default StepFour;
