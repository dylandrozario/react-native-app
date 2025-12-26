import { View, ImageBackground, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import DateBadge from "./DateBadge";

interface EventBannerProps {
  imageUri: string;
  date: string;
  title: string;
  subtitle?: string;
}

const EventBanner = ({ imageUri, date, title, subtitle }: EventBannerProps) => {
  return (
    <View className="rounded-t-3xl overflow-hidden">
      <ImageBackground
        source={{ uri: imageUri }}
        className="w-full"
        style={{ height: 280 }}
        resizeMode="cover"
      >
        {/* Gradient Overlay */}
        <LinearGradient
          colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.6)"]}
          style={StyleSheet.absoluteFill}
        />
        
        {/* Date Badge */}
        <DateBadge date={date} />
      </ImageBackground>
    </View>
  );
};

export default EventBanner;

