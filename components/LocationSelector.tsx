import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface LocationSelectorProps {
  location?: string;
}

const LocationSelector = ({ location = "New York City" }: LocationSelectorProps) => {
  return (
    <View>
      <Text className="text-4xl font-bold text-white">Rush into</Text>
      <View className="flex-row items-center gap-1 mt-1">
        <Text className="text-4xl font-bold text-white">{location}</Text>
        <Ionicons
          name="chevron-down-outline"
          size={28}
          color="#A8B5DB"
        />
      </View>
    </View>
  );
};

export default LocationSelector;

