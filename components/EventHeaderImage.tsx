import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

interface EventHeaderImageProps {
  imageUri: string;
}

const EventHeaderImage = ({ imageUri }: EventHeaderImageProps) => {
  const router = useRouter();

  return (
    <View className="relative">
      <Image
        source={{ uri: imageUri }}
        className="w-full h-96"
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-4"
        activeOpacity={0.8}
      >
        <BlurView
          intensity={80}
          tint="dark"
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </BlurView>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark overlay for extra contrast
  },
});



export default EventHeaderImage;

