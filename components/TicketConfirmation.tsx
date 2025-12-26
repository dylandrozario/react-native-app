import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

interface TicketItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

interface TicketConfirmationProps {
  eventTitle: string;
  venue: string;
  date: string;
  time: string;
  tickets: TicketItem[];
  totalPrice: string;
  onBack?: () => void;
  onConfirm?: () => void;
}

const TicketConfirmation = ({
  eventTitle,
  venue,
  date,
  time,
  tickets,
  totalPrice,
  onBack,
  onConfirm,
}: TicketConfirmationProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      // Default: navigate to tickets page or show success
      console.log("Ticket purchase confirmed");
    }
  };

  // Format date and time
  const formatDateTime = (dateString: string, timeString: string) => {
    // Handle both formatted dates (e.g., "12 December") and ISO dates (e.g., "2024-12-12")
    let dateObj: Date;
    if (dateString.includes(",") || dateString.split(" ").length === 2) {
      // Already formatted date like "12 December"
      const parts = dateString.split(" ");
      const day = parseInt(parts[0]);
      const monthName = parts[1];
      const currentYear = new Date().getFullYear();
      const monthIndex = new Date(`${monthName} 1, ${currentYear}`).getMonth();
      dateObj = new Date(currentYear, monthIndex, day);
    } else {
      // ISO date format
      dateObj = new Date(dateString);
    }
    
    const dayName = dateObj.toLocaleString("default", { weekday: "short" });
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    
    // Extract time range if present (e.g., "10:00 PM - 4:00 AM")
    const timeDisplay = timeString.includes(" - ") ? timeString : `${timeString} - ${timeString}`;
    
    return `${dayName}, ${month} ${day} at ${timeDisplay}`;
  };

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="pt-16 pb-6">
          <View className="items-center mb-8">
            <Text className="text-white text-2xl font-bold">RUSH</Text>
          </View>
        </View>

        {/* Event Details */}
        <View className="mb-6">
          <Text className="text-white text-2xl font-bold mb-3">{eventTitle}</Text>
          <Text className="text-light-200 text-base mb-1">{venue}</Text>
          <Text className="text-light-200 text-base">{formatDateTime(date, time)}</Text>
        </View>

        {/* Ticket Summary Box */}
        <View className="bg-dark-200 rounded-2xl p-5 mb-6">
          {tickets.map((ticket, index) => (
            <View key={ticket.id}>
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-white text-base font-semibold">
                    {ticket.quantity}x {ticket.name}
                  </Text>
                  <Text className="text-light-200 text-sm mt-1">{ticket.price}</Text>
                </View>
                <View className="bg-gray-700 rounded-lg px-3 py-1">
                  <Text className="text-white text-sm font-semibold">{ticket.quantity}</Text>
                </View>
              </View>
              {index < tickets.length - 1 && (
                <View className="border-b border-gray-700 mb-3" />
              )}
            </View>
          ))}

          {/* Total */}
          <View className="border-t border-gray-700 pt-4 mt-2">
            <Text className="text-light-200 text-sm mb-1">Total Due</Text>
            <Text className="text-white text-3xl font-bold">{totalPrice}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Section - Fixed at Bottom */}
      <View className="px-5 pb-8 pt-4 border-t border-gray-800">
        {/* Terms and Privacy */}
        <View className="mb-6">
          <Text className="text-light-200 text-xs text-center leading-5">
            By checking out you accept the{" "}
            <Text className="underline">Terms of Service</Text> &{" "}
            <Text className="underline">Privacy Policy</Text>.
          </Text>
        </View>

        {/* Buttons */}
        <View>
          <TouchableOpacity
            onPress={handleConfirm}
            className="bg-green-500 rounded-xl py-4 items-center mb-4"
            activeOpacity={0.8}
          >
            <Text className="text-white text-lg font-semibold">Get ticket</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleBack}
            className="items-center py-2"
            activeOpacity={0.7}
          >
            <Text className="text-white text-base">Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TicketConfirmation;

