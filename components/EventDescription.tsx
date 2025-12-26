import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

interface EventDescriptionProps {
  description: string;
}

const EventDescription = ({ description }: EventDescriptionProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const maxLength = 150;
  const shouldTruncate = description.length > maxLength;
  const displayDescription = showFullDescription || !shouldTruncate 
    ? description 
    : `${description.substring(0, maxLength)}...`;

  return (
    <View className="bg-dark-200 mx-5 my-4 rounded-2xl p-5">
      <Text className="text-white text-xl font-bold mb-4">About</Text>
      <Text className="text-light-200 text-sm leading-5 mb-4">{displayDescription}</Text>
      {shouldTruncate && (
        <TouchableOpacity
          onPress={() => setShowFullDescription(!showFullDescription)}
          className="flex-row items-center"
        >
          <Text className="text-white text-sm font-semibold mr-1">
            {showFullDescription ? "Read Less" : "Read More"}
          </Text>
          <Ionicons
            name={showFullDescription ? "chevron-up" : "chevron-down"}
            size={16}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EventDescription;

