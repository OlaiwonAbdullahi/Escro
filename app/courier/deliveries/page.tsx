"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AvailableDeliveries, {
  type AvailableDelivery,
} from "./_components/available-deliveries";

const demoAvailableDeliveries: AvailableDelivery[] = [
  {
    id: "AVL-001",
    distance: "2.3 km",
    estimatedTime: "15 min",
    earnings: "₦1,800",
    pickup: { name: "Nike Store", area: "VI" },
    dropoff: { area: "Ikoyi Residential Area" },
    packages: 1,
    isExpress: true,
  },
  {
    id: "AVL-002",
    distance: "3.5 km",
    estimatedTime: "25 min",
    earnings: "₦2,200",
    pickup: { name: "Shoprite", area: "Lekki" },
    dropoff: { area: "Ajah" },
    packages: 3,
    isExpress: false,
  },
  {
    id: "AVL-003",
    distance: "1.8 km",
    estimatedTime: "12 min",
    earnings: "₦1,500",
    pickup: { name: "Jumia Warehouse", area: "Ikeja" },
    dropoff: { area: "Maryland" },
    packages: 2,
    isExpress: true,
  },
  {
    id: "AVL-004",
    distance: "4.2 km",
    estimatedTime: "30 min",
    earnings: "₦2,800",
    pickup: { name: "Apple Store", area: "Lekki Phase 1" },
    dropoff: { area: "Victoria Island" },
    packages: 1,
    isExpress: false,
  },
  {
    id: "AVL-005",
    distance: "1.5 km",
    estimatedTime: "10 min",
    earnings: "₦1,200",
    pickup: { name: "PEP Store", area: "Yaba" },
    dropoff: { area: "Surulere" },
    packages: 2,
    isExpress: true,
  },
  {
    id: "AVL-006",
    distance: "5.0 km",
    estimatedTime: "40 min",
    earnings: "₦3,500",
    pickup: { name: "Konga Warehouse", area: "Gbagada" },
    dropoff: { area: "Magodo" },
    packages: 4,
    isExpress: false,
  },
];

const Page = () => {
  const router = useRouter();
  const [deliveries] = useState<AvailableDelivery[]>(demoAvailableDeliveries);

  const handleAcceptDelivery = (id: string) => {
    // TODO: Implement accept delivery logic
    console.log("Accepted delivery:", id);
    // Navigate to active deliveries or show confirmation
    router.push("/courier");
  };

  const handleViewDetails = (id: string) => {
    // TODO: Implement view details logic
    console.log("Viewing details for:", id);
    // Could open a modal or navigate to a details page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="mb-2">
          <h1 className="text-black text-3xl font-bold mb-2 font-noto">
            Available Deliveries
          </h1>
          <p className="text-gray-500">
            Browse and accept deliveries near your location.
          </p>
        </div>

        {/* Available Deliveries Component */}
        <AvailableDeliveries
          deliveries={deliveries}
          totalCount={deliveries.length}
          onAccept={handleAcceptDelivery}
          onViewDetails={handleViewDetails}
        />
      </div>
    </div>
  );
};

export default Page;
