import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface LocationButtonProps {
  location?: string;
  onPress?: () => void;
  isSelected?: boolean;
}

const LocationButton = ({ location = "NEW YORK CITY", onPress, isSelected = false }: LocationButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-full flex-row items-center gap-2 ${
        isSelected ? "bg-accent" : "bg-dark-200"
      }`}
      activeOpacity={0.8}
    >
      <Ionicons
        name="location-outline"
        size={16}
        color={isSelected ? "#1E1E2E" : "#A8B5DB"}
      />
      <Text
        className={`text-sm font-semibold uppercase ${
          isSelected ? "text-secondary" : "text-light-200"
        }`}
      >
        {location}
      </Text>
    </TouchableOpacity>
  );
};

export default LocationButton;

