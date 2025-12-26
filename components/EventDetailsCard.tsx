import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import EventInfoRow from "./EventInfoRow";

interface EventDetailsCardProps {
  title: string;
  subtitle?: string;
  venue: string;
  address?: string;
  price: string;
  time: string;
}

const EventDetailsCard = ({
  title,
  subtitle,
  venue,
  address,
  price,
  time,
}: EventDetailsCardProps) => {
  return (
    <View className="rounded-b-3xl overflow-hidden bg-dark-200">
      <View className="p-5">
        {/* Event Title */}
        <Text className="text-white text-2xl font-bold mb-3" numberOfLines={2}>
          {title}{subtitle && subtitle}
        </Text>

        {/* Venue and Address */}
        <View className="flex-row items-start mb-4">
          <Ionicons name="location-outline" size={16} color="#9CA4AB" style={{ marginRight: 6, marginTop: 2 }} />
          <Text className="text-light-200 text-sm flex-1" numberOfLines={1} ellipsizeMode="tail">
            {venue}
            {address && `, ${address}`}
          </Text>
        </View>

        {/* Dashed Separator */}
        <View
          style={{
            borderTopWidth: 1,
            borderStyle: "dashed",
            borderColor: "rgba(156, 164, 171, 0.3)",
            marginBottom: 12,
          }}
        />

        {/* Price and Time */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="ticket-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text className="text-light-200 text-sm">{price}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text className="text-light-200 text-sm">{time}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EventDetailsCard;

