import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

interface TicketOption {
  id: string;
  name: string;
  price: string;
  description?: string;
  available: boolean;
}

interface TicketOptionsProps {
  tickets: TicketOption[];
  onTicketSelect?: (ticketId: string) => void;
  quantities?: Record<string, number>;
  onQuantityChange?: (ticketId: string, quantity: number) => void;
}

const TicketOptions = ({ tickets, onTicketSelect, quantities = {}, onQuantityChange }: TicketOptionsProps) => {
  const [selectedTicket, setSelectedTicket] = useState<string | undefined>();

  const handleSelect = (ticketId: string) => {
    setSelectedTicket(ticketId);
    onTicketSelect?.(ticketId);
  };

  const handleQuantityChange = (ticketId: string, delta: number) => {
    const currentQuantity = quantities[ticketId] || 0;
    const newQuantity = Math.max(0, currentQuantity + delta);
    onQuantityChange?.(ticketId, newQuantity);
  };

  return (
    <View className="bg-dark-200 mx-5 my-4 rounded-2xl p-5">
      <Text className="text-white text-xl font-bold mb-4">Ticket Options</Text>
      
      {tickets.map((ticket) => {
        const quantity = quantities[ticket.id] || 0;
        const isSelected = selectedTicket === ticket.id || quantity > 0;

        return (
          <View
            key={ticket.id}
            className={`mb-3 p-4 rounded-xl border-2 ${
              isSelected
                ? "border-white bg-dark-300"
                : ticket.available
                ? "border-gray-700 bg-dark-300"
                : "border-gray-700 bg-dark-300 opacity-60"
            }`}
          >
            <TouchableOpacity
              onPress={() => ticket.available && handleSelect(ticket.id)}
              disabled={!ticket.available}
              activeOpacity={0.7}
            >
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1 mr-3">
                  <View className="flex-row items-center mb-1">
                    <Text className="text-white text-base font-semibold mr-2">
                      {ticket.name}
                    </Text>
                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                    )}
                  </View>
                  {ticket.description && (
                    <Text className="text-light-200 text-sm mb-2">
                      {ticket.description}
                    </Text>
                  )}
                  <Text className="text-white text-lg font-bold">
                    {ticket.price}
                  </Text>
                </View>
                {!ticket.available && (
                  <View className="bg-gray-700 px-3 py-1 rounded-full">
                    <Text className="text-light-200 text-xs font-semibold">
                      Sold Out
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            {/* Quantity Selector */}
            {ticket.available && (
              <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-700">
                <Text className="text-light-200 text-sm">Quantity</Text>
                <View className="flex-row items-center">
                  <TouchableOpacity
                    onPress={() => handleQuantityChange(ticket.id, -1)}
                    disabled={quantity === 0}
                    className={`w-8 h-8 rounded-full items-center justify-center ${
                      quantity === 0 ? "bg-gray-700" : "bg-gray-600"
                    }`}
                  >
                    <Ionicons
                      name="remove"
                      size={18}
                      color={quantity === 0 ? "#4B5563" : "#FFFFFF"}
                    />
                  </TouchableOpacity>
                  <Text className="text-white text-base font-semibold mx-4 min-w-[30px] text-center">
                    {quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleQuantityChange(ticket.id, 1)}
                    className="w-8 h-8 rounded-full bg-gray-600 items-center justify-center"
                  >
                    <Ionicons name="add" size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default TicketOptions;

