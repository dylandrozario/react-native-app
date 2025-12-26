import { View, Text } from "react-native";

const PriceSlider = () => {
  return (
    <View className="mb-5 px-5">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-white text-sm font-semibold">Price Range</Text>
        <Text className="text-light-200 text-sm">$0 - $1000+</Text>
      </View>
      
      {/* Simple Slider Track */}
      <View className="relative h-8 justify-center">
        {/* Background Track */}
        <View className="absolute h-2 bg-dark-200 rounded-full w-full" />
        
        {/* Active Track */}
        <View
          className="absolute h-2 bg-accent rounded-full"
          style={{ width: "50%" }}
        />
        
        {/* Slider Thumb */}
        <View
          className="absolute w-6 h-6 bg-accent rounded-full shadow-lg"
          style={{ left: "50%", marginLeft: -12, top: 4 }}
        />
      </View>
      
      {/* Min/Max Labels */}
      <View className="flex-row justify-between mt-2">
        <Text className="text-light-300 text-xs">$0</Text>
        <Text className="text-light-300 text-xs">$1000+</Text>
      </View>
    </View>
  );
};

export default PriceSlider;
