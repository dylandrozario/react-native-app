import { View, Text, TouchableOpacity, ScrollView } from "react-native";

interface FilterButtonsProps {
  items: string[];
  selectedItem?: string;
  onItemSelect?: (item: string) => void;
  horizontal?: boolean;
  defaultSelected?: string;
}

const FilterButtons = ({
  items,
  selectedItem,
  onItemSelect,
  horizontal = false,
  defaultSelected,
}: FilterButtonsProps) => {
  // Only use selectedItem if it's explicitly provided, don't fall back to defaultSelected or first item
  const selected = selectedItem !== undefined ? selectedItem : defaultSelected;

  const buttonContent = items.map((item) => {
    const isSelected = item === selected;
    return (
      <TouchableOpacity
        key={item}
        onPress={() => onItemSelect?.(item)}
        className={`px-4 py-2 rounded-full ${
          isSelected ? "bg-accent" : "bg-dark-200"
        }`}
      >
        <Text
          className={`text-sm font-semibold ${
            isSelected ? "text-secondary" : "text-light-200"
          }`}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  });

  if (horizontal) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-5"
        contentContainerStyle={{ gap: 12, paddingRight: 20 }}
      >
        {buttonContent}
      </ScrollView>
    );
  }

  return <View className="flex-row gap-2">{buttonContent}</View>;
};

export default FilterButtons;

