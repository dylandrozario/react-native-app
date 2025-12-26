import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EventPurchaseSectionProps {
  price: string;
  totalQuantity?: number;
  totalPrice?: string;
  onPurchase: () => void;
}

const EventPurchaseSection = ({ price, totalQuantity = 0, totalPrice, onPurchase }: EventPurchaseSectionProps) => {
  const hasTickets = totalQuantity > 0;
  const displayPrice = totalPrice || price;
  const buttonText = hasTickets ? `Buy ${totalQuantity} ticket${totalQuantity > 1 ? 's' : ''}` : "Buy a ticket";

  return (
    <View className="bg-dark-200 px-5 py-4 flex-row items-center justify-between border-t border-gray-700">
      <View>
        <Text className="text-light-200 text-xs mb-1">
          {hasTickets ? "Total" : "From"}
        </Text>
        <Text className="text-white text-2xl font-bold">{displayPrice}</Text>
        {hasTickets && (
          <Text className="text-light-200 text-xs mt-1">
            {totalQuantity} ticket{totalQuantity > 1 ? 's' : ''}
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={onPurchase}
        disabled={!hasTickets}
        className={`rounded-xl px-6 py-4 flex-row items-center ${
          hasTickets ? "bg-white" : "bg-gray-700"
        }`}
      >
        <Text className={`font-semibold text-base mr-2 ${
          hasTickets ? "text-black" : "text-gray-500"
        }`}>
          {buttonText}
        </Text>
        <Ionicons name="ticket" size={20} color={hasTickets ? "#000000" : "#9CA4AB"} />
      </TouchableOpacity>
    </View>
  );
};

export default EventPurchaseSection;

