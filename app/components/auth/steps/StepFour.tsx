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
  ChevronRight,
  ScrollText,
  Loader2,
} from "lucide-react";

interface StepFourProps {
  formData: any;
  onSubmit: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

const getTheme = (role: string) => {
  switch (role) {
    case "store_owner":
      return {
        text: "text-amber-600",
        bg: "bg-amber-500",
        border: "border-amber-500/30",
        glow: "shadow-amber-500/20",
      };
    case "courier":
      return {
        text: "text-blue-600",
        bg: "bg-blue-500",
        border: "border-blue-500/30",
        glow: "shadow-blue-500/20",
      };
    case "agency":
      return {
        text: "text-violet-600",
        bg: "bg-violet-500",
        border: "border-violet-500/30",
        glow: "shadow-violet-500/20",
      };
    default:
      return {
        text: "text-emerald-600",
        bg: "bg-emerald-500",
        border: "border-emerald-500/30",
        glow: "shadow-emerald-500/20",
      };
  }
};

const ManifestRow = ({ icon, label, value, theme }: any) => (
  <div className="flex items-center justify-between py-3 group hover:bg-gray-50 px-2 rounded-lg transition-colors">
    <div className="flex items-center gap-3 text-gray-500">
      <div className={`transition-colors group-hover:${theme.text} opacity-70`}>
        {icon}
      </div>
      <span className="text-xs font-bold uppercase tracking-wider">
        {label}
      </span>
    </div>
    <span className="text-sm font-mono text-gray-900 text-right font-medium max-w-[60%] truncate">
      {value || <span className="text-gray-400 italic">Not provided</span>}
    </span>
  </div>
);

const StepFour: React.FC<StepFourProps> = ({
  formData,
  onSubmit,
  onBack,
  isLoading = false,
}) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState("");

  const theme = getTheme(formData.role);

  const handleSubmit = () => {
    if (!acceptedTerms) {
      setTermsError("Acknowledgement required");
      return;
    }
    setTermsError("");
    onSubmit();
  };

  const renderRoleSpecificData = () => {
    switch (formData.role) {
      case "customer":
        return (
          <>
            <ManifestRow
              icon={<MapPin size={16} />}
              label="Delivery Addr"
              value={formData.deliveryAddress}
              theme={theme}
            />
            <ManifestRow
              icon={<MapPin size={16} />}
              label="City / State"
              value={`${formData.city}, ${formData.state}`}
              theme={theme}
            />
          </>
        );
      case "store_owner":
        return (
          <>
            <ManifestRow
              icon={<Building size={16} />}
              label="Business Name"
              value={formData.businessName}
              theme={theme}
            />
            <ManifestRow
              icon={<FileText size={16} />}
              label="RC Number"
              value={formData.businessRegNumber}
              theme={theme}
            />
            <ManifestRow
              icon={<Briefcase size={16} />}
              label="Category"
              value={formData.storeCategory}
              theme={theme}
            />
            <ManifestRow
              icon={<MapPin size={16} />}
              label="HQ Address"
              value={formData.businessAddress}
              theme={theme}
            />
          </>
        );
      case "courier":
        return (
          <>
            <ManifestRow
              icon={<Briefcase size={16} />}
              label="Vehicle"
              value={formData.vehicleType}
              theme={theme}
            />
            <ManifestRow
              icon={<FileText size={16} />}
              label="License ID"
              value={formData.licenseNumber}
              theme={theme}
            />
            <ManifestRow
              icon={<Briefcase size={16} />}
              label="Plate No."
              value={formData.vehicleRegNumber}
              theme={theme}
            />
            <ManifestRow
              icon={<MapPin size={16} />}
              label="Zone"
              value={formData.workingArea}
              theme={theme}
            />
          </>
        );
      case "agency":
        return (
          <>
            <ManifestRow
              icon={<Building size={16} />}
              label="Agency Name"
              value={formData.agencyName}
              theme={theme}
            />
            <ManifestRow
              icon={<FileText size={16} />}
              label="Reg Number"
              value={formData.agencyRegNumber}
              theme={theme}
            />
            <ManifestRow
              icon={<User size={16} />}
              label="Fleet Size"
              value={formData.courierCount}
              theme={theme}
            />
            <ManifestRow
              icon={<MapPin size={16} />}
              label="Territories"
              value={
                Array.isArray(formData.serviceAreas)
                  ? formData.serviceAreas.join(", ")
                  : formData.serviceAreas
              }
              theme={theme}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center mb-8">
        <div
          className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border ${theme.border} shadow-lg`}
        >
          <CheckCircle size={32} className={theme.text} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2 font-mont tracking-tight">
          Review Your Information
        </h2>
        <p className="text-gray-500 font-noto text-sm">
          Please verify all details before submitting
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-8 shadow-sm">
        <div className="p-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <User size={14} /> Account Information
          </h3>
          <div className="space-y-1">
            <ManifestRow
              icon={<User size={16} />}
              label="Full Name"
              value={formData.fullName}
              theme={theme}
            />
            <ManifestRow
              icon={<Mail size={16} />}
              label="Email"
              value={formData.email}
              theme={theme}
            />
            <ManifestRow
              icon={<Phone size={16} />}
              label="Phone"
              value={formData.phone}
              theme={theme}
            />
          </div>
        </div>

        <div className="relative h-px bg-gray-100 w-full flex items-center justify-between">
          <div className="absolute -left-2 w-4 h-4 bg-white rounded-full border border-gray-200" />{" "}
          <div className="w-full border-t-2 border-dashed border-gray-300" />
          <div className="absolute -right-2 w-4 h-4 bg-white rounded-full border border-gray-200" />{" "}
        </div>

        <div className="p-6 bg-gray-50">
          <h3
            className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${theme.text}`}
          >
            <Briefcase size={14} /> {formData.role.replace("_", " ")} Profile
          </h3>
          <div className="space-y-1">{renderRoleSpecificData()}</div>
        </div>
      </div>

      <div
        className={`relative border rounded-xl p-5 mb-8 transition-all duration-300 ${
          acceptedTerms
            ? `${theme.border} bg-white border-2`
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <ScrollText
            size={16}
            className={acceptedTerms ? theme.text : "text-gray-400"}
          />
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Terms of Service Protocol
          </h4>
        </div>

        <div className="h-24 overflow-y-auto bg-gray-100 rounded-lg p-3 border border-gray-200 text-xs font-mono text-gray-600 leading-relaxed mb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <p>
            1. INITIALIZATION: By accessing the Escro Network, you agree to
            bound by this platform protocols.
          </p>
          <p className="mt-2">
            2. ESCROW LOCK: Lorem ipsum dolor, sit amet consectetur adipisicing
            elit.
          </p>
          <p className="mt-2">
            3. LIABILITY: Lorem ipsum dolor, sit amet consectetur adipisicing
            elit.
          </p>
          <p className="mt-2">
            4. DISPUTE: Lorem ipsum dolor, sit amet consectetur adipisicing
            elit.
          </p>
        </div>

        <label className="flex items-start gap-3 cursor-pointer group select-none">
          <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => {
                setAcceptedTerms(e.target.checked);
                if (e.target.checked) setTermsError("");
              }}
              className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded bg-white checked:bg-white checked:border-gray-900 transition-all cursor-pointer"
            />
            <CheckCircle
              size={14}
              className={`absolute text-gray-900 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none`}
            />
          </div>
          <div className="flex-1">
            <span className="text-sm text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
              I acknowledge and accept the Protocol Terms & Privacy Policy.
            </span>
            {termsError && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-xs font-bold animate-pulse">
                <AlertCircle size={12} />
                <span>{termsError}</span>
              </div>
            )}
          </div>
        </label>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="px-6 py-4 rounded-xl border border-gray-300 text-gray-600 font-bold hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 disabled:opacity-50"
        >
          Modify
        </button>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`
                flex-1 relative overflow-hidden px-6 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group
                ${theme.bg} ${theme.glow} hover:brightness-110 disabled:grayscale disabled:cursor-not-allowed
            `}
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span className="font-mono">Loading...</span>
            </>
          ) : (
            <>
              <span className="relative z-10 flex items-center gap-2 tracking-wide">
                Create Account
                <ChevronRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>

              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepFour;
