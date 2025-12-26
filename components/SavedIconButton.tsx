import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SavedIconButtonProps {
  onPress?: () => void;
}

const SavedIconButton = ({ onPress }: SavedIconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="px-4 py-2 bg-dark-200 rounded-full items-center justify-center"
    >
      <Ionicons name="star-outline" size={18} color="#A8B5DB" />
    </TouchableOpacity>
  );
};

export default SavedIconButton;

