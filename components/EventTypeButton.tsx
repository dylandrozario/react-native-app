import { TouchableOpacity, Text, View } from "react-native";

interface EventTypeButtonProps {
  label: string;
  onPress?: () => void;
  isSelected?: boolean;
}

const EventTypeButton = ({ label, onPress, isSelected = false }: EventTypeButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-20 h-20 rounded-xl items-center justify-center ${
        isSelected ? "bg-accent" : "bg-dark-200"
      }`}
      activeOpacity={0.8}
    >
      <Text
        className={`text-sm font-semibold text-center ${
          isSelected ? "text-secondary" : "text-light-200"
        }`}
        numberOfLines={2}
        adjustsFontSizeToFit={false}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default EventTypeButton;

