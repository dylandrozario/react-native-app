import { View, Text } from "react-native";
import { BlurView } from "expo-blur";

interface DateBadgeProps {
  date: string;
}

const DateBadge = ({ date }: DateBadgeProps) => {
  const formatDateBadge = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return { month: month, day: day.toString() };
  };

  const dateBadge = formatDateBadge(date);

  return (
    <View className="absolute top-4 right-4">
      <BlurView intensity={80} tint="dark" className="rounded-xl px-4 py-3">
        <Text className="text-white text-xs font-semibold uppercase">
          {dateBadge.month}
        </Text>
        <Text className="text-white text-2xl font-bold">
          {dateBadge.day}
        </Text>
      </BlurView>
    </View>
  );
};

export default DateBadge;

