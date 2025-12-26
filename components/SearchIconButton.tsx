import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchIconButtonProps {
  onPress: () => void;
  isActive?: boolean;
}

const SearchIconButton = ({ onPress, isActive = false }: SearchIconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-full items-center justify-center ${
        isActive ? "bg-accent" : "bg-dark-200"
      }`}
    >
      <Ionicons
        name="search-outline"
        size={18}
        color={isActive ? "#1E1E2E" : "#A8B5DB"}
      />
    </TouchableOpacity>
  );
};

export default SearchIconButton;

