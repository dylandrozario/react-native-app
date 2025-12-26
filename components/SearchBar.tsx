import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

interface Props {
  location?: string;
  onPress?: () => void;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ 
  location = "New York City", 
  onPress, 
  placeholder,
  value,
  onChangeText 
}: Props) => {
  // If placeholder, value, or onChangeText are provided, render as input field
  const isInputMode = placeholder !== undefined || value !== undefined || onChangeText !== undefined;

  return (
    <BlurView intensity={60} tint="dark" className="rounded-full overflow-hidden">
      {isInputMode ? (
        <View className="bg-dark-200/60 rounded-full px-5 py-6 flex-row items-center">
          {/* Search Icon */}
          <Ionicons name="search-outline" size={22} color="#A8B5DB" style={{ marginRight: 12 }} />
          
          {/* Text Input */}
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            className="flex-1 text-white text-sm"
            placeholderTextColor="#9CA4AB"
          />
        </View>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          className="bg-dark-200/60 rounded-full px-5 py-6 flex-row items-center"
          activeOpacity={0.9}
        >
          {/* Search Icon */}
          <Ionicons name="search-outline" size={22} color="#A8B5DB" style={{ marginRight: 12 }} />
          
          {/* Placeholder Text */}
          <View className="flex-1">
            <Text className="text-white text-sm">Find clubs, bars, and nightlife venues</Text>
          </View>
        </TouchableOpacity>
      )}
    </BlurView>
  );
};

export default SearchBar;
