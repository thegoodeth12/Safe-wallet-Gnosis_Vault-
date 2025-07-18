import { useState } from "react";
import { Bell, ChevronDown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const networks = [
  { value: "ethereum", label: "Ethereum" },
  { value: "arbitrum", label: "Arbitrum" },
  { value: "polygon", label: "Polygon" },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", active: true },
  { id: "proposals", label: "Proposals", active: false },
  { id: "history", label: "History", active: false },
];

export default function Header() {
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum");
  
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-safe-green rounded-lg flex items-center justify-center">
                <Shield className="text-white h-4 w-4" />
              </div>
              <h1 className="text-xl font-semibold text-safe-gray">Gnosis Vault</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-1 bg-slate-100 rounded-lg p-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={item.active ? "secondary" : "ghost"}
                  size="sm"
                  className={`px-3 py-1.5 text-sm font-medium ${
                    item.active 
                      ? "bg-white text-safe-gray shadow-sm" 
                      : "text-safe-gray-light hover:text-safe-gray"
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
              <SelectTrigger className="w-32 bg-white border-slate-300 text-sm font-medium text-safe-gray focus:ring-safe-green focus:border-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {networks.map((network) => (
                  <SelectItem key={network.value} value={network.value}>
                    {network.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2 text-safe-gray-light hover:text-safe-gray"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 w-3 h-3 p-0 bg-red-500 text-white text-xs" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm">
                  TG
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-safe-gray hidden sm:block">
                thegoodeth12
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
