"use client";

import { useState } from "react";
import {
  IconSearch,
  IconUser,
  IconCamera,
  IconUpload,
  IconTrash,
  IconFileCheck,
  IconClock,
  IconMapPin,
  IconPackage,
  IconMotorbike,
  IconBuildingBank,
  IconWallet,
  IconEdit,
  IconEye,
  IconCheck,
  IconX,
  IconPlus,
  IconAlertCircle,
  IconStar,
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Profile data
const profileData = {
  name: "James Oladipo",
  id: "COU-2341",
  rating: 4.8,
  deliveries: 892,
  memberSince: "Jan 2024",
  avatar: null,
};

// Personal info data
const personalInfo = {
  fullName: "James Oladipo",
  email: "james.oladipo@email.com",
  emailVerified: true,
  phone: "+234 801 234 5678",
  phoneVerified: true,
  dob: "March 15, 1995",
  gender: "Male",
  address: "23 Admiralty Way, Lekki Phase 1",
  city: "Lagos, Nigeria",
  emergencyContact: {
    name: "Mary Oladipo",
    phone: "+234 802 345 6789",
    relationship: "Sister",
  },
};

// Document data
const documents = [
  {
    type: "Identity Verification",
    status: "verified",
    expiryDate: null,
    details: ["National ID: ***1234", "BVN: ***5678"],
    action: "View",
  },
  {
    type: "Driver's License",
    status: "verified",
    expiryDate: "Dec 2026",
    details: ["License No: LAG-***-9012"],
    action: "Update",
  },
  {
    type: "Vehicle Registration",
    status: "verified",
    expiryDate: "Mar 2025",
    details: [
      "Plate: KJA 234 FG",
      "Bike (Honda)",
      "Insurance: Valid until Mar 2025",
    ],
    action: "Update",
  },
  {
    type: "Background Check",
    status: "verified",
    expiryDate: null,
    details: ["Last updated: Jan 2024"],
    action: "View",
  },
  {
    type: "COVID-19 Vaccination",
    status: "verified",
    expiryDate: null,
    details: ["Certificate uploaded"],
    action: "View",
  },
];

// Working hours data
const defaultWorkingHours = [
  { day: "Monday", start: "09:00 AM", end: "06:00 PM", active: true },
  { day: "Tuesday", start: "09:00 AM", end: "06:00 PM", active: true },
  { day: "Wednesday", start: "09:00 AM", end: "06:00 PM", active: true },
  { day: "Thursday", start: "09:00 AM", end: "06:00 PM", active: true },
  { day: "Friday", start: "09:00 AM", end: "08:00 PM", active: true },
  { day: "Saturday", start: "10:00 AM", end: "06:00 PM", active: true },
  { day: "Sunday", start: "Closed", end: "Closed", active: false },
];

// Service areas
const serviceAreas = [
  { name: "Victoria Island", checked: true },
  { name: "Ikoyi", checked: true },
  { name: "Lekki Phase 1 & 2", checked: true },
  { name: "Ajah", checked: false },
  { name: "Ikeja", checked: false },
  { name: "Yaba", checked: false },
];

// Delivery types
const deliveryTypes = [
  { name: "Standard Delivery", checked: true },
  { name: "Express Delivery (higher pay)", checked: true },
  { name: "Same-Day Delivery", checked: true },
  { name: "Scheduled Delivery", checked: true },
  { name: "Bulk/Multiple Packages", checked: false },
  { name: "Fragile Items", checked: false },
  { name: "Cash on Delivery (COD)", checked: false },
  { name: "Return Pickups", checked: false },
];

// Package sizes
const packageSizes = [
  { name: "Small (documents, small packages)", checked: true },
  { name: "Medium (standard boxes)", checked: true },
  { name: "Large (bulky items)", checked: true },
  { name: "Extra Large (requires special vehicle)", checked: false },
];

// Settings sections for navigation
const settingsSections = [
  { id: "account", label: "Account Settings", icon: IconUser },
  { id: "work", label: "Work Preferences", icon: IconClock },
  { id: "payment", label: "Payment Settings", icon: IconWallet },
];

// Section Card Component
const SectionCard = ({
  icon: Icon,
  title,
  children,
  className = "",
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white border border-gray-200 rounded-xl overflow-hidden ${className}`}
  >
    <div className="flex items-center gap-3 p-5 border-b border-gray-100 bg-gray-50/50">
      <div className="p-2 bg-emerald-100 rounded-lg">
        <Icon className="w-5 h-5 text-emerald-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

// Info Row Component
const InfoRow = ({
  label,
  value,
  verified = false,
  subtext,
  onEdit,
}: {
  label: string;
  value: string;
  verified?: boolean;
  subtext?: string;
  onEdit?: () => void;
}) => (
  <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex-1">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
      {subtext && <p className="text-sm text-gray-500 mt-0.5">{subtext}</p>}
      {verified && (
        <div className="flex items-center gap-1 mt-1">
          <IconCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-xs text-emerald-600 font-medium">Verified</span>
        </div>
      )}
    </div>
    {onEdit && (
      <button
        onClick={onEdit}
        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 transition-colors"
      >
        <IconEdit className="w-4 h-4" />
        Edit
      </button>
    )}
  </div>
);

// Toggle Switch Component
const ToggleSwitch = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) => (
  <label className="flex items-center justify-between py-2.5 cursor-pointer group">
    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
      {label}
    </span>
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
        checked ? "bg-emerald-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  </label>
);

// Checkbox Component
const Checkbox = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) => (
  <label className="flex items-center gap-3 py-2 cursor-pointer group">
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all duration-200 ${
        checked
          ? "bg-emerald-500 border-emerald-500"
          : "border-gray-300 group-hover:border-emerald-400"
      }`}
    >
      {checked && <IconCheck className="w-3.5 h-3.5 text-white" />}
    </button>
    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
      {label}
    </span>
  </label>
);

// Radio Option Component
const RadioOption = ({
  selected,
  onChange,
  label,
  sublabel,
}: {
  selected: boolean;
  onChange: () => void;
  label: string;
  sublabel?: string;
}) => (
  <button
    onClick={onChange}
    className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all duration-200 w-full text-left ${
      selected
        ? "border-emerald-500 bg-emerald-50"
        : "border-gray-200 hover:border-emerald-300"
    }`}
  >
    <div
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
        selected ? "border-emerald-500" : "border-gray-300"
      }`}
    >
      {selected && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
    </div>
    <div>
      <p className="font-medium text-gray-900">{label}</p>
      {sublabel && <p className="text-sm text-gray-500">{sublabel}</p>}
    </div>
  </button>
);

// Document Status Badge
const DocumentStatusBadge = ({
  status,
  expiryDate,
}: {
  status: string;
  expiryDate?: string | null;
}) => (
  <div className="flex items-center gap-2">
    {status === "verified" && (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
        <IconCheck className="w-3 h-3" />
        Verified
      </span>
    )}
    {status === "pending" && (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
        <IconAlertCircle className="w-3 h-3" />
        Pending
      </span>
    )}
    {status === "expired" && (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
        <IconX className="w-3 h-3" />
        Expired
      </span>
    )}
    {expiryDate && (
      <span className="text-xs text-gray-500">Expires: {expiryDate}</span>
    )}
  </div>
);

export default function SettingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("account");
  const [currentStatus, setCurrentStatus] = useState("online");
  const [workingHours, setWorkingHours] = useState(defaultWorkingHours);
  const [coverageRadius, setCoverageRadius] = useState(10);
  const [payoutFrequency, setPayoutFrequency] = useState("daily");
  const [payoutMethod, setPayoutMethod] = useState("bank");
  const [holdBackPercentage, setHoldBackPercentage] = useState(10);
  const [autoAcceptEnabled, setAutoAcceptEnabled] = useState(true);
  const [batchDeliveryEnabled, setBatchDeliveryEnabled] = useState(true);

  // Toggles
  const [autoOffline, setAutoOffline] = useState(true);
  const [onlineReminder, setOnlineReminder] = useState(true);
  const [scheduleLunchBreak, setScheduleLunchBreak] = useState(true);
  const [autoPauseDuringBreaks, setAutoPauseDuringBreaks] = useState(true);
  const [acceptOutsideArea, setAcceptOutsideArea] = useState(true);
  const [autoAcceptWithinDistance, setAutoAcceptWithinDistance] =
    useState(true);
  const [autoAcceptMinPay, setAutoAcceptMinPay] = useState(true);
  const [autoAcceptPreferredZones, setAutoAcceptPreferredZones] =
    useState(true);
  const [autoAcceptFavoriteStores, setAutoAcceptFavoriteStores] =
    useState(false);
  const [showBatchOpportunities, setShowBatchOpportunities] = useState(true);
  const [autoSuggestRoute, setAutoSuggestRoute] = useState(true);
  const [oilChangeReminder, setOilChangeReminder] = useState(true);
  const [tireCheckReminder, setTireCheckReminder] = useState(true);
  const [insuranceReminder, setInsuranceReminder] = useState(true);
  const [autoGenerateTaxReports, setAutoGenerateTaxReports] = useState(true);
  const [splitEarnings, setSplitEarnings] = useState(true);
  const [acceptLongDistance, setAcceptLongDistance] = useState(true);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2 p-6">
        <div>
          <h1 className="text-black text-3xl font-bold mb-2 font-noto">
            Earnings
          </h1>
          <p className="text-gray-500">
            Track your earnings, view transactions, and manage payouts.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Profile Preview Card */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold backdrop-blur-sm">
              {profileData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{profileData.name}</h2>
              <p className="text-emerald-100 text-sm mb-2">
                ID: {profileData.id}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <IconStar className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  <span className="font-medium">{profileData.rating}</span>
                  <span className="text-emerald-100">Rating</span>
                </div>
                <span className="text-emerald-300">·</span>
                <span className="text-emerald-100">
                  {profileData.deliveries} deliveries
                </span>
              </div>
              <p className="text-emerald-200 text-sm mt-1">
                Member since {profileData.memberSince}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-5">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium text-sm backdrop-blur-sm transition-colors">
              <IconEdit className="w-4 h-4" />
              Edit Profile
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium text-sm backdrop-blur-sm transition-colors">
              <IconEye className="w-4 h-4" />
              View Public Profile
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search settings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-3 bg-white border-gray-200 rounded-xl h-12 text-base"
          />
        </div>

        {/* Quick Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                activeSection === section.id
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </button>
          ))}
        </div>

        {/* ========================================== */}
        {/* ACCOUNT SETTINGS SECTION */}
        {/* ========================================== */}
        <div id="account" className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Account Settings
          </h2>

          {/* Personal Information */}
          <SectionCard icon={IconUser} title="Personal Information">
            <div className="space-y-1">
              <InfoRow
                label="Full Name"
                value={personalInfo.fullName}
                onEdit={() => {}}
              />
              <InfoRow
                label="Email Address"
                value={personalInfo.email}
                verified={personalInfo.emailVerified}
                onEdit={() => {}}
              />
              <InfoRow
                label="Phone Number"
                value={personalInfo.phone}
                verified={personalInfo.phoneVerified}
                onEdit={() => {}}
              />
              <InfoRow
                label="Date of Birth"
                value={personalInfo.dob}
                onEdit={() => {}}
              />
              <InfoRow
                label="Gender"
                value={personalInfo.gender}
                onEdit={() => {}}
              />
              <InfoRow
                label="Home Address"
                value={personalInfo.address}
                subtext={personalInfo.city}
                onEdit={() => {}}
              />
              <InfoRow
                label="Emergency Contact"
                value={`${personalInfo.emergencyContact.name} - ${personalInfo.emergencyContact.phone}`}
                subtext={`Relationship: ${personalInfo.emergencyContact.relationship}`}
                onEdit={() => {}}
              />
            </div>
          </SectionCard>

          {/* Profile Photo */}
          <SectionCard icon={IconCamera} title="Profile Photo">
            <div className="flex flex-col items-center py-4">
              <div className="w-36 h-36 bg-gray-100 rounded-full flex items-center justify-center mb-4 border-4 border-gray-200">
                <span className="text-4xl font-bold text-gray-400">
                  {profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 justify-center mb-4">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors">
                  <IconUpload className="w-4 h-4" />
                  Upload New Photo
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors">
                  <IconCamera className="w-4 h-4" />
                  Take Photo
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors">
                  <IconTrash className="w-4 h-4" />
                  Remove
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 w-full">
                <p className="font-medium text-gray-700 mb-2">Requirements:</p>
                <ul className="space-y-1">
                  <li>• Square image (min 400x400px)</li>
                  <li>• Max size: 5MB</li>
                  <li>• Formats: JPG, PNG</li>
                  <li>• Clear face photo (no sunglasses/hats)</li>
                </ul>
              </div>
            </div>
          </SectionCard>

          {/* Verification & Documents */}
          <SectionCard icon={IconFileCheck} title="Verification & Documents">
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900">{doc.type}</h4>
                      <DocumentStatusBadge
                        status={doc.status}
                        expiryDate={doc.expiryDate}
                      />
                    </div>
                    <div className="text-sm text-gray-500 space-y-0.5">
                      {doc.details.map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    {doc.action === "View" ? (
                      <IconEye className="w-4 h-4" />
                    ) : (
                      <IconEdit className="w-4 h-4" />
                    )}
                    {doc.action}
                  </button>
                </div>
              ))}
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg font-medium text-sm transition-colors border-2 border-dashed border-emerald-300">
                <IconUpload className="w-4 h-4" />
                Upload New Document
              </button>
            </div>
          </SectionCard>
        </div>

        {/* ========================================== */}
        {/* WORK PREFERENCES SECTION */}
        {/* ========================================== */}
        <div id="work" className="space-y-6 pt-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Work Preferences
          </h2>

          {/* Availability & Working Hours */}
          <SectionCard icon={IconClock} title="Availability & Working Hours">
            <div className="space-y-6">
              {/* Current Status */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">
                  Current Status
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <RadioOption
                    selected={currentStatus === "online"}
                    onChange={() => setCurrentStatus("online")}
                    label="Online"
                    sublabel="Accept deliveries"
                  />
                  <RadioOption
                    selected={currentStatus === "busy"}
                    onChange={() => setCurrentStatus("busy")}
                    label="Busy"
                    sublabel="Limited availability"
                  />
                  <RadioOption
                    selected={currentStatus === "offline"}
                    onChange={() => setCurrentStatus("offline")}
                    label="Offline"
                    sublabel="Not accepting"
                  />
                </div>
              </div>

              {/* Working Hours */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">
                  Default Working Hours
                </h4>
                <div className="space-y-2">
                  {workingHours.map((schedule, index) => (
                    <div
                      key={schedule.day}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="w-24 font-medium text-gray-700 text-sm">
                        {schedule.day}
                      </span>
                      <div className="flex-1 flex items-center gap-2">
                        {schedule.active ? (
                          <>
                            <Select defaultValue={schedule.start}>
                              <SelectTrigger className="w-28 h-9 bg-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  "06:00 AM",
                                  "07:00 AM",
                                  "08:00 AM",
                                  "09:00 AM",
                                  "10:00 AM",
                                  "11:00 AM",
                                  "12:00 PM",
                                ].map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <span className="text-gray-400">-</span>
                            <Select defaultValue={schedule.end}>
                              <SelectTrigger className="w-28 h-9 bg-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  "04:00 PM",
                                  "05:00 PM",
                                  "06:00 PM",
                                  "07:00 PM",
                                  "08:00 PM",
                                  "09:00 PM",
                                  "10:00 PM",
                                ].map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </>
                        ) : (
                          <span className="text-gray-400 text-sm">Closed</span>
                        )}
                      </div>
                      <Checkbox
                        checked={schedule.active}
                        onChange={(checked) => {
                          const newHours = [...workingHours];
                          newHours[index].active = checked;
                          setWorkingHours(newHours);
                        }}
                        label="Active"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <ToggleSwitch
                  checked={autoOffline}
                  onChange={setAutoOffline}
                  label="Auto-offline when outside working hours"
                />
                <ToggleSwitch
                  checked={onlineReminder}
                  onChange={setOnlineReminder}
                  label="Remind me to go online at start time"
                />
              </div>

              {/* Break Preferences */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-gray-700 mb-3">
                  Break Preferences
                </h4>
                <div className="space-y-2">
                  <ToggleSwitch
                    checked={scheduleLunchBreak}
                    onChange={setScheduleLunchBreak}
                    label="Schedule lunch break (1:00 PM - 2:00 PM)"
                  />
                  <ToggleSwitch
                    checked={autoPauseDuringBreaks}
                    onChange={setAutoPauseDuringBreaks}
                    label="Auto-pause deliveries during breaks"
                  />
                </div>
              </div>

              <button className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                Save Schedule
              </button>
            </div>
          </SectionCard>

          {/* Service Area */}
          <SectionCard icon={IconMapPin} title="Service Area & Coverage">
            <div className="space-y-6">
              {/* Primary Area */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-700">
                    Primary Service Area
                  </h4>
                  <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                    Edit
                  </button>
                </div>
                <p className="text-gray-900">Lekki Peninsula, Lagos</p>
              </div>

              {/* Map Placeholder */}
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                  <IconMapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Interactive map showing coverage</p>
                </div>
              </div>

              {/* Coverage Radius */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">
                  Coverage Radius
                </h4>
                <div className="mb-4">
                  <input
                    type="range"
                    min="5"
                    max="25"
                    value={coverageRadius}
                    onChange={(e) =>
                      setCoverageRadius(parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>5km</span>
                    <span className="font-medium text-emerald-600">
                      {coverageRadius} km
                    </span>
                    <span>25km</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[5, 10, 15, 20].map((km) => (
                    <button
                      key={km}
                      onClick={() => setCoverageRadius(km)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        coverageRadius === km
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {km}km
                    </button>
                  ))}
                  <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">
                    Custom
                  </button>
                </div>
              </div>

              {/* Additional Areas */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">
                  Additional Service Areas
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {serviceAreas.map((area, index) => (
                    <Checkbox
                      key={area.name}
                      checked={area.checked}
                      onChange={() => {}}
                      label={area.name}
                    />
                  ))}
                </div>
              </div>

              {/* Preferred & Restricted Zones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Preferred Zones
                  </h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Get priority offers
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg text-sm">
                      <span>Lekki Phase 1</span>
                      <IconX className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg text-sm">
                      <span>Victoria Island</span>
                      <IconX className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                    </div>
                    <button className="w-full flex items-center justify-center gap-1 p-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-emerald-400 hover:text-emerald-600 transition-colors">
                      <IconPlus className="w-4 h-4" />
                      Add Zone
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Restricted Zones
                  </h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Never show deliveries
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400 italic p-2">
                      None added
                    </p>
                    <button className="w-full flex items-center justify-center gap-1 p-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-red-400 hover:text-red-600 transition-colors">
                      <IconPlus className="w-4 h-4" />
                      Add Restricted Zone
                    </button>
                  </div>
                </div>
              </div>

              <ToggleSwitch
                checked={acceptOutsideArea}
                onChange={setAcceptOutsideArea}
                label="Accept deliveries outside my primary area (with distance bonus)"
              />

              <button className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                Save Changes
              </button>
            </div>
          </SectionCard>

          {/* Delivery Preferences */}
          <SectionCard icon={IconPackage} title="Delivery Preferences">
            <div className="space-y-6">
              {/* Delivery Types */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">
                  Delivery Types (Select what you accept)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {deliveryTypes.map((type) => (
                    <Checkbox
                      key={type.name}
                      checked={type.checked}
                      onChange={() => {}}
                      label={type.name}
                    />
                  ))}
                </div>
              </div>

              {/* Package Sizes */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-gray-700 mb-3">
                  Package Size Limits
                </h4>
                <div className="space-y-2">
                  {packageSizes.map((size) => (
                    <Checkbox
                      key={size.name}
                      checked={size.checked}
                      onChange={() => {}}
                      label={size.name}
                    />
                  ))}
                </div>
              </div>

              {/* Weight & Distance */}
              <div className="border-t border-gray-100 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Weight Limit
                  </h4>
                  <Select defaultValue="15">
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select max weight" />
                    </SelectTrigger>
                    <SelectContent>
                      {["5", "10", "15", "20", "25", "30"].map((kg) => (
                        <SelectItem key={kg} value={kg}>
                          {kg} kg
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Max Distance per Delivery
                  </h4>
                  <Select defaultValue="20">
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select max distance" />
                    </SelectTrigger>
                    <SelectContent>
                      {["5", "10", "15", "20", "25", "30", "50"].map((km) => (
                        <SelectItem key={km} value={km}>
                          {km} km
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <ToggleSwitch
                checked={acceptLongDistance}
                onChange={setAcceptLongDistance}
                label="Accept long-distance with bonus"
              />

              {/* Auto-Accept Settings */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-700">
                    Auto-Accept Settings
                  </h4>
                  <ToggleSwitch
                    checked={autoAcceptEnabled}
                    onChange={setAutoAcceptEnabled}
                    label=""
                  />
                </div>
                {autoAcceptEnabled && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-gray-600 mb-3">
                      Auto-accept deliveries that meet:
                    </p>
                    <Checkbox
                      checked={autoAcceptWithinDistance}
                      onChange={setAutoAcceptWithinDistance}
                      label="Within 3 km of my location"
                    />
                    <Checkbox
                      checked={autoAcceptMinPay}
                      onChange={setAutoAcceptMinPay}
                      label="Pay ₦2,000 or more"
                    />
                    <Checkbox
                      checked={autoAcceptPreferredZones}
                      onChange={setAutoAcceptPreferredZones}
                      label="In my preferred zones"
                    />
                    <Checkbox
                      checked={autoAcceptFavoriteStores}
                      onChange={setAutoAcceptFavoriteStores}
                      label="From favorite stores only"
                    />
                    <div className="pt-2">
                      <h5 className="text-sm text-gray-600 mb-2">
                        Maximum auto-accept per hour:
                      </h5>
                      <Select defaultValue="3">
                        <SelectTrigger className="w-32 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["1", "2", "3", "4", "5"].map((num) => (
                            <SelectItem key={num} value={num}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              {/* Batch Delivery */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-gray-700 mb-3">
                  Batch Delivery
                </h4>
                <div className="space-y-2">
                  <ToggleSwitch
                    checked={showBatchOpportunities}
                    onChange={setShowBatchOpportunities}
                    label="Show batch delivery opportunities"
                  />
                  <ToggleSwitch
                    checked={autoSuggestRoute}
                    onChange={setAutoSuggestRoute}
                    label="Auto-suggest route optimization"
                  />
                </div>
                <div className="mt-3">
                  <h5 className="text-sm text-gray-600 mb-2">
                    Max deliveries in one batch:
                  </h5>
                  <Select defaultValue="4">
                    <SelectTrigger className="w-32 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["2", "3", "4", "5", "6"].map((num) => (
                        <SelectItem key={num} value={num}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                Save Preferences
              </button>
            </div>
          </SectionCard>

          {/* Vehicle Information */}
          <SectionCard icon={IconMotorbike} title="Vehicle Information">
            <div className="space-y-6">
              {/* Primary Vehicle */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Primary Vehicle</h4>
                  <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                    Change
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-medium text-gray-900">Motorcycle</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Make/Model</p>
                    <p className="font-medium text-gray-900">Honda CBR 150</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Color</p>
                    <p className="font-medium text-gray-900">Black</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Year</p>
                    <p className="font-medium text-gray-900">2021</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Plate Number</p>
                    <p className="font-medium text-gray-900">KJA 234 FG</p>
                  </div>
                </div>
              </div>

              {/* Insurance & Road Worthiness */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Insurance</h4>
                    <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                      Renew
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">Provider: AXA Mansard</p>
                  <p className="text-sm text-gray-500">
                    Policy No: INS-***-4567
                  </p>
                  <p className="text-sm text-emerald-600 font-medium mt-1">
                    Valid until: Mar 30, 2025
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      Road Worthiness
                    </h4>
                    <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                      Renew
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Certificate: RW-***-8901
                  </p>
                  <p className="text-sm text-emerald-600 font-medium mt-1">
                    Valid until: Jun 15, 2025
                  </p>
                </div>
              </div>

              {/* Vehicle Photos */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">
                  Vehicle Photos
                </h4>
                <div className="grid grid-cols-4 gap-3">
                  {["Front", "Side", "Plate", "Interior"].map((view) => (
                    <div
                      key={view}
                      className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-emerald-400 cursor-pointer transition-colors"
                    >
                      <IconCamera className="w-6 h-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">{view}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors">
                  <IconUpload className="w-4 h-4" />
                  Upload New Photos
                </button>
              </div>

              {/* Add Secondary Vehicle */}
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg font-medium text-sm transition-colors border-2 border-dashed border-gray-300">
                <IconPlus className="w-4 h-4" />
                Add Secondary Vehicle (Optional)
              </button>

              {/* Maintenance Reminders */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-gray-700 mb-3">
                  Maintenance Reminders
                </h4>
                <div className="space-y-2">
                  <ToggleSwitch
                    checked={oilChangeReminder}
                    onChange={setOilChangeReminder}
                    label="Oil change every 3 months"
                  />
                  <ToggleSwitch
                    checked={tireCheckReminder}
                    onChange={setTireCheckReminder}
                    label="Tire check monthly"
                  />
                  <ToggleSwitch
                    checked={insuranceReminder}
                    onChange={setInsuranceReminder}
                    label="Insurance renewal reminder"
                  />
                </div>
                <div className="mt-3 p-3 bg-amber-50 rounded-lg flex items-center gap-3">
                  <IconAlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <p className="text-sm text-amber-700">
                    Next service due: <strong>Feb 15, 2025</strong>
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* ========================================== */}
        {/* PAYMENT SETTINGS SECTION */}
        {/* ========================================== */}
        <div id="payment" className="space-y-6 pt-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Payment Settings
          </h2>

          {/* Bank Account & Payout */}
          <SectionCard icon={IconBuildingBank} title="Bank Account & Payout">
            <div className="space-y-6">
              {/* Primary Bank Account */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">
                    Primary Bank Account
                  </h4>
                  <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                    <IconEdit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Bank</span>
                    <span className="font-medium text-gray-900">GTBank</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Account Name</span>
                    <span className="font-medium text-gray-900">
                      James Oladipo
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Account Number</span>
                    <span className="font-medium text-gray-900">
                      012345***90
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <IconCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs text-emerald-600 font-medium">
                    Verified
                  </span>
                </div>
              </div>

              {/* Backup Account & Mobile Money */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition-colors">
                  <IconPlus className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Add Backup Account
                  </span>
                </button>
                <button className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition-colors">
                  <IconPlus className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Link Mobile Money Account
                  </span>
                </button>
              </div>

              {/* Payout Preferences */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-gray-700 mb-3">
                  Automatic Payout
                </h4>
                <div className="space-y-3">
                  <RadioOption
                    selected={payoutFrequency === "daily"}
                    onChange={() => setPayoutFrequency("daily")}
                    label="Daily"
                    sublabel="Minimum: ₦5,000"
                  />
                  <RadioOption
                    selected={payoutFrequency === "weekly"}
                    onChange={() => setPayoutFrequency("weekly")}
                    label="Weekly"
                    sublabel="Every Friday"
                  />
                  <RadioOption
                    selected={payoutFrequency === "manual"}
                    onChange={() => setPayoutFrequency("manual")}
                    label="Manual"
                    sublabel="Cash out when I want"
                  />
                </div>
              </div>

              {/* Payout Method */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-gray-700 mb-3">
                  Payout Method
                </h4>
                <div className="space-y-3">
                  <RadioOption
                    selected={payoutMethod === "bank"}
                    onChange={() => setPayoutMethod("bank")}
                    label="Bank Transfer"
                    sublabel="Free, 1-3 days"
                  />
                  <RadioOption
                    selected={payoutMethod === "instant"}
                    onChange={() => setPayoutMethod("instant")}
                    label="Instant Transfer"
                    sublabel="₦50 fee, Immediate"
                  />
                </div>
              </div>

              {/* Hold Back Percentage */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-gray-700 mb-3">
                  Hold Back Percentage (Emergency fund)
                </h4>
                <div className="mb-4">
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={holdBackPercentage}
                    onChange={(e) =>
                      setHoldBackPercentage(parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>0%</span>
                    <span className="font-medium text-emerald-600">
                      {holdBackPercentage}%
                    </span>
                    <span>30%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Hold ₦{holdBackPercentage} from every ₦100 earned
                </p>
                <div className="mt-3 p-3 bg-emerald-50 rounded-lg flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Current balance:
                  </span>
                  <span className="font-semibold text-emerald-600">
                    ₦12,340
                  </span>
                </div>
              </div>

              {/* Tax Information */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-700">Tax Information</h4>
                  <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                    Edit
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-3">TIN: ***-456-789</p>
                <ToggleSwitch
                  checked={autoGenerateTaxReports}
                  onChange={setAutoGenerateTaxReports}
                  label="Auto-generate tax reports"
                />
              </div>

              {/* Earnings Allocation */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-gray-700 mb-3">
                  Earnings Allocation
                </h4>
                <ToggleSwitch
                  checked={splitEarnings}
                  onChange={setSplitEarnings}
                  label="Split earnings to savings (20%)"
                />
                {splitEarnings && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Savings Account</p>
                      <p className="text-sm font-medium text-gray-900">
                        ***-1234
                      </p>
                    </div>
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                      Setup
                    </button>
                  </div>
                )}
              </div>

              <button className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                Save Payment Settings
              </button>
            </div>
          </SectionCard>
        </div>

        {/* Bottom Spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
}
