import { TouchableOpacity, View, Text, Image } from "react-native";
import { Link } from "expo-router";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarEventCardProps {
  id: number;
  imageUri: string | null;
  title: string;
  subtitle?: string;
  venue: string;
  address?: string;
  price: string;
  date: string;
  time: string;
}

const SearchBarEventCard = ({
  id,
  imageUri,
  title,
  subtitle,
  venue,
  address,
  price,
  date,
  time,
}: SearchBarEventCardProps) => {
  const eventImageUri = imageUri || "https://placehold.co/400x600/1a1a1a/FFFFFF.png";

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    return `${month} ${day}`;
  };

  return (
    <Link href={`/event/${id}`} asChild>
      <TouchableOpacity className="mb-4 rounded-2xl overflow-hidden">
        <BlurView intensity={60} tint="dark" className="rounded-2xl overflow-hidden">
          <View className="flex-row bg-dark-200/60">
            {/* Square Image on Left */}
            <Image
              source={{ uri: eventImageUri }}
              className="w-28 h-28 rounded-l-2xl"
              resizeMode="cover"
            />

            {/* Text Content on Right */}
            <View className="flex-1 p-4">
              {/* Event Title */}
              <Text className="text-white text-base font-bold mb-1" numberOfLines={1}>
                {title}
                {subtitle && ` ${subtitle}`}
              </Text>

              {/* Venue */}
              <View className="flex-row items-center mb-2">
                <Ionicons name="location-outline" size={14} color="#9CA4AB" style={{ marginRight: 6 }} />
                <Text className="text-light-300 text-xs flex-1" numberOfLines={1}>
                  {venue}
                  {address && `, ${address}`}
                </Text>
              </View>

              {/* Dashed Separator */}
              <View
                style={{
                  borderTopWidth: 1,
                  borderStyle: "dashed",
                  borderColor: "rgba(156, 164, 171, 0.3)",
                  marginVertical: 6,
                }}
              />

              {/* Date, Price and Time */}
              <View className="flex-row items-center justify-between">
                <Text className="text-white text-xs font-semibold">
                  {formatDate(date)}
                </Text>
                <Text className="text-white text-xs font-semibold">
                  {price}
                </Text>
                <Text className="text-white text-xs font-semibold">
                  {time}
                </Text>
              </View>
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    </Link>
  );
};

export default SearchBarEventCard;

