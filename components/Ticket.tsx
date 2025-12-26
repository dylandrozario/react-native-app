import { TouchableOpacity, View, Text, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

interface TicketProps {
  id: number;
  imageUri: string | null;
  title: string;
  subtitle?: string;
  venue: string;
  address?: string;
  price: string;
  date: string;
  time: string;
  onPress?: () => void;
}

const Ticket = ({
  id,
  imageUri,
  title,
  subtitle,
  venue,
  address,
  price,
  date,
  time,
  onPress,
}: TicketProps) => {
  const eventImageUri = imageUri || "https://placehold.co/400x600/1a1a1a/FFFFFF.png";

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    return `${month} ${day}`;
  };

  return (
    <TouchableOpacity 
      className="mb-5 rounded-2xl overflow-hidden"
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Image Banner with Text Overlay - Square-like */}
      <View className="rounded-2xl overflow-hidden">
        <ImageBackground
          source={{ uri: eventImageUri }}
          className="w-full"
          style={{ height: 320 }}
          resizeMode="cover"
        >
          {/* Gradient Overlay */}
          <LinearGradient
            colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.7)"]}
            style={StyleSheet.absoluteFill}
          />
          
          {/* Date and Time at Top Right */}
          <View className="absolute top-4 right-4">
            <Text 
              className="text-white text-sm" 
              numberOfLines={1} 
              ellipsizeMode="tail"
              style={{
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10,
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              {formatDate(date)} {time}
            </Text>
          </View>

          {/* Text Overlay at Bottom */}
          <View className="absolute bottom-0 left-0 right-0 p-4">
            {/* Event Title */}
            <Text 
              className="text-white text-sm mb-2" 
              numberOfLines={1} 
              ellipsizeMode="tail"
              style={{
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10,
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              {title}{subtitle && subtitle}
            </Text>

            {/* Venue */}
            <Text 
              className="text-white text-sm" 
              numberOfLines={1} 
              ellipsizeMode="tail"
              style={{
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10,
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              {venue}
              {address && `, ${address}`}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default Ticket;

