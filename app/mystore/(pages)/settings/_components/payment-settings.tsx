"use client";

import { useState } from "react";
import {
  IconCreditCard,
  IconBrandStripe,
  IconBrandPaypal,
  IconCash,
  IconReceipt,
  IconPercentage,
  IconCheck,
  IconSettings,
  IconPlus,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentGateway {
  id: string;
  name: string;
  icon: React.ReactNode;
  enabled: boolean;
  connected: boolean;
}

const PaymentSettings = () => {
  const [gateways, setGateways] = useState<PaymentGateway[]>([
    {
      id: "stripe",
      name: "Stripe",
      icon: <IconBrandStripe className="w-6 h-6" />,
      enabled: true,
      connected: true,
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: <IconBrandPaypal className="w-6 h-6" />,
      enabled: true,
      connected: true,
    },
    {
      id: "escrow",
      name: "Escro Pay",
      icon: <IconCash className="w-6 h-6" />,
      enabled: true,
      connected: true,
    },
  ]);

  const toggleGateway = (id: string) => {
    setGateways(
      gateways.map((g) => (g.id === id ? { ...g, enabled: !g.enabled } : g))
    );
  };

  return (
    <div className="space-y-8">
      {/* Payment Gateways */}
      <div className="bg-white border border-emerald-500/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <IconCreditCard className="w-5 h-5 text-emerald-600" />
            Payment Gateways
          </h3>
          <Button
            variant="outline"
            size="sm"
            className="text-emerald-600 border-emerald-500/30 hover:bg-emerald-50"
          >
            <IconPlus className="w-4 h-4 mr-2" />
            Add Gateway
          </Button>
        </div>

        <div className="space-y-4">
          {gateways.map((gateway) => (
            <div
              key={gateway.id}
              className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                gateway.enabled
                  ? "border-emerald-500/30 bg-emerald-50/50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-lg ${
                    gateway.enabled
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {gateway.icon}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{gateway.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {gateway.connected ? (
                      <span className="inline-flex items-center gap-1 text-xs text-green-600">
                        <IconCheck className="w-3 h-3" />
                        Connected
                      </span>
                    ) : (
                      <span className="text-xs text-amber-600">
                        Not connected
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <IconSettings className="w-4 h-4" />
                </Button>
                <button
                  onClick={() => toggleGateway(gateway.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    gateway.enabled ? "bg-emerald-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      gateway.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accepted Payment Methods */}
      <div className="bg-white border border-emerald-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <IconCash className="w-5 h-5 text-emerald-600" />
          Accepted Payment Methods
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Visa", enabled: true },
            { name: "Mastercard", enabled: true },
            { name: "American Express", enabled: true },
            { name: "Discover", enabled: false },
            { name: "Apple Pay", enabled: true },
            { name: "Google Pay", enabled: true },
            { name: "Bank Transfer", enabled: false },
            { name: "Cash on Delivery", enabled: false },
          ].map((method) => (
            <label
              key={method.name}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                method.enabled
                  ? "border-emerald-500/30 bg-emerald-50"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                defaultChecked={method.enabled}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm font-medium text-gray-700">
                {method.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Tax Configuration */}
      <div className="bg-white border border-emerald-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <IconPercentage className="w-5 h-5 text-emerald-600" />
          Tax Configuration
        </h3>

        <div className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Tax Calculation Method
              </Label>
              <Select defaultValue="automatic">
                <SelectTrigger className="h-11 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatic">
                    Automatic (based on location)
                  </SelectItem>
                  <SelectItem value="fixed">Fixed Rate</SelectItem>
                  <SelectItem value="none">No Tax</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="tax-rate"
                className="text-sm font-semibold text-gray-700"
              >
                Default Tax Rate (%)
              </Label>
              <Input
                id="tax-rate"
                type="number"
                defaultValue="10"
                min="0"
                max="100"
                step="0.01"
                className="h-11 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="prices-include-tax"
              defaultChecked
              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="prices-include-tax"
              className="text-sm text-gray-700"
            >
              <span className="font-medium">Prices include tax</span>
              <span className="text-gray-500 ml-2">
                Product prices already include tax
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Invoice Settings */}
      <div className="bg-white border border-emerald-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <IconReceipt className="w-5 h-5 text-emerald-600" />
          Invoice Settings
        </h3>

        <div className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="invoice-prefix"
                className="text-sm font-semibold text-gray-700"
              >
                Invoice Prefix
              </Label>
              <Input
                id="invoice-prefix"
                defaultValue="INV-"
                className="h-11 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="next-invoice"
                className="text-sm font-semibold text-gray-700"
              >
                Next Invoice Number
              </Label>
              <Input
                id="next-invoice"
                type="number"
                defaultValue="1001"
                className="h-11 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="invoice-notes"
              className="text-sm font-semibold text-gray-700"
            >
              Default Invoice Notes
            </Label>
            <Input
              id="invoice-notes"
              placeholder="Add notes to appear on all invoices"
              defaultValue="Thank you for your business!"
              className="h-11 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="auto-invoice"
              defaultChecked
              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label htmlFor="auto-invoice" className="text-sm text-gray-700">
              <span className="font-medium">Auto-generate invoices</span>
              <span className="text-gray-500 ml-2">
                Automatically create invoices for completed orders
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" className="border-gray-300">
          Cancel
        </Button>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default PaymentSettings;
