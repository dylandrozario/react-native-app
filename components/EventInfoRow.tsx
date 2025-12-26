import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EventInfoRowProps {
  price: string;
  time: string;
}

const EventInfoRow = ({ price, time }: EventInfoRowProps) => {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center">
        <Ionicons name="ticket-outline" size={18} color="#A8B5DB" />
        <Text className="text-white text-sm font-semibold ml-2">
          {price}
        </Text>
      </View>

      <View className="flex-row items-center">
        <Ionicons name="time-outline" size={18} color="#A8B5DB" />
        <Text className="text-white text-sm font-semibold ml-2">
          {time}
        </Text>
      </View>
    </View>
  );
};

export default EventInfoRow;

