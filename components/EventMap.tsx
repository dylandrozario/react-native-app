import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EventMapProps {
  venue: string;
  address?: string;
}

const EventMap = ({ venue, address }: EventMapProps) => {
  // For now, using a placeholder. In a real app, you'd use react-native-maps
  return (
    <View className="bg-dark-200 mx-5 my-4 rounded-2xl overflow-hidden" style={{ height: 200 }}>
      {/* Map Placeholder */}
      <View className="flex-1 bg-dark-300 items-center justify-center">
        <Ionicons name="map-outline" size={48} color="#9CA4AB" />
        <Text className="text-light-200 mt-2">Map View</Text>
      </View>
      
      {/* Location Info */}
      <View className="bg-dark-300 px-4 py-3 flex-row items-center">
        <Ionicons name="location" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
        <View className="flex-1">
          <Text className="text-white font-semibold text-sm">{venue}</Text>
          {address && (
            <Text className="text-light-200 text-xs mt-1">{address}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default EventMap;

