import { View, ScrollView, Image, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

import { images } from "@/constants/images";

import SearchBar from "@/components/SearchBar";
import LocationSelector from "@/components/LocationSelector";
import FilterButtons from "@/components/FilterButtons";
import PriceSlider from "@/components/PriceSlider";
import DateCalendar from "@/components/DateCalendar";
import EventCard from "@/components/EventCard";

const Index = () => {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>();
  const [showPriceSlider, setShowPriceSlider] = useState(false);
  const [showDateCalendar, setShowDateCalendar] = useState(false);

  const handleFilterSelect = (filter: string) => {
    // Toggle filters: if clicking the same filter when already selected, deselect it
    if (filter === selectedFilter) {
      setSelectedFilter(undefined);
      setShowPriceSlider(false);
      setShowDateCalendar(false);
    } else {
      setSelectedFilter(filter);
      // Show/hide components based on filter
      if (filter === "Price") {
        setShowPriceSlider(true);
        setShowDateCalendar(false);
      } else if (filter === "Date") {
        setShowDateCalendar(true);
        setShowPriceSlider(false);
      }
    }
  };

  const filters = ["Price", "Date"];

  // Mock event data - replace with actual API data later
  const events = [
    {
      id: 1,
      imageUri: "https://placehold.co/400x600/000000/FFFFFF.png",
      title: "Coldplay",
      subtitle: "Music of the Spheres",
      venue: "HBF Stadium",
      address: "100 Stephenson Ave, Mount Claremont WA 6010",
      price: "From $175.00",
      date: "2024-12-12",
      time: "20:00 PM",
    },
    {
      id: 2,
      imageUri: "https://placehold.co/400x600/F5F5DC/000000.png",
      title: "Beyonce",
      subtitle: "Renaissance World Tour",
      venue: "Accor Arena",
      address: "Paris, France",
      price: "From $560",
      date: "2024-10-12",
      time: "7:00 PM",
    },
    {
      id: 3,
      imageUri: "https://placehold.co/400x600/1a1a1a/FFFFFF.png",
      title: "Billie Eilish",
      subtitle: "Happier Than Ever",
      venue: "Madison Square Garden",
      address: "New York, NY",
      price: "From $450",
      date: "2024-10-15",
      time: "8:00 PM",
    },
    {
      id: 4,
      imageUri: "https://placehold.co/400x600/2a2a2a/FFFFFF.png",
      title: "Taylor Swift",
      subtitle: "The Eras Tour",
      venue: "Staples Center",
      address: "Los Angeles, CA",
      price: "From $380",
      date: "2024-10-20",
      time: "7:30 PM",
    },
  ];

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        {/* Location Selector */}
        <View className="mt-14 mb-4">
          <LocationSelector />
        </View>

        {/* Search Bar */}
        <View className="mb-4">
          <SearchBar
            location="New York City"
            onPress={() => {
              router.push("/search");
            }}
          />
        </View>

        {/* Price and Date Filter Buttons */}
        <View className="mb-5">
            <FilterButtons
            items={filters}
            selectedItem={selectedFilter}
            onItemSelect={handleFilterSelect}
          />
        </View>

        {/* Price Slider - Only shown when Price filter is selected */}
        {selectedFilter === "Price" && showPriceSlider && <PriceSlider />}

        {/* Date Calendar - Only shown when Date filter is selected */}
        {selectedFilter === "Date" && showDateCalendar && <DateCalendar />}

        {/* Event Cards - Vertical Scroll */}
        <View className="mt-5">
          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              imageUri={event.imageUri}
              title={event.title}
              subtitle={event.subtitle}
              venue={event.venue}
              address={event.address}
              price={event.price}
              date={event.date}
              time={event.time}
            />
          ))}
          <View className="h-20" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
