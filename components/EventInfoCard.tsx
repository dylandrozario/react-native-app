import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EventInfoCardProps {
  title: string;
  date: string;
  time: string;
}

const EventInfoCard = ({ title, date, time }: EventInfoCardProps) => {
  return (
    <View className="bg-dark-200 rounded-t-3xl -mt-8 px-5 py-6">
      {/* Title */}
      <Text className="text-white text-2xl font-bold mb-4">{title}</Text>

      {/* Date and Time */}
      <View className="mb-4">
        <View className="flex-row items-center mb-2">
          <Ionicons name="calendar-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text className="text-white text-base">{date}, {time}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text className="text-white text-base">{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default EventInfoCard;

