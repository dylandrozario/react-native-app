import { useState } from "react";
import { View, Text, ScrollView } from "react-native";

import SearchBar from "@/components/SearchBar";
import FilterButtons from "@/components/FilterButtons";
import LocationButton from "@/components/LocationButton";
import EventTypeButton from "@/components/EventTypeButton";
import SearchBarEventCard from "@/components/SearchBarEventCard";


const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>();
  const [selectedEventType, setSelectedEventType] = useState<string | undefined>();

  const eventTypes = [
    "Club",
    "DJ",
    "Bar ",
    "Lounge",
    "Live Music",
    "Rooftop",
    "Themed Party",
  ];

  // Mock event data for SearchBarEventCard
  const searchEvents = [
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
  ];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Mock search results - replace with actual event API later
  const searchResults = searchQuery.trim()
    ? searchEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (event.subtitle && event.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        className="px-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header Section */}
        <View className="px-3 pt-20 pb-5">
          {/* Search Bar */}
          <View className="mb-4">
            <SearchBar
              placeholder="Search for an event, artist or venue"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>

          {/* Filter Buttons: Price, Date, Location */}
          <View className="flex-row items-center gap-2 mb-8">
            <FilterButtons
              items={["Price", "Date"]}
              selectedItem={selectedFilter}
              onItemSelect={(item) => setSelectedFilter(selectedFilter === item ? undefined : item)}
            />
            <LocationButton
              location="NEW YORK CITY"
              onPress={() => {
                // Handle location button press
              }}
            />
          </View>

          {/* Event Type Buttons - Horizontal Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-5"
            contentContainerStyle={{ gap: 12, paddingRight: 20 }}
          >
            {eventTypes.map((type) => (
              <EventTypeButton
                key={type}
                label={type}
                isSelected={selectedEventType === type}
                onPress={() => setSelectedEventType(selectedEventType === type ? undefined : type)}
              />
            ))}
          </ScrollView>

          {/* Search Results or Popular Events */}
          {searchQuery.trim() ? (
            <View className="mt-10">
              <Text className="text-white text-xl font-bold mb-4">
                Search Results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
              {searchResults.length > 0 ? (
                searchResults.map((event) => (
                  <SearchBarEventCard
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
                ))
              ) : (
                <View className="mt-10">
                  <Text className="text-center text-gray-500">
                    No events found
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View className="mt-10">
              <Text className="text-white text-xl font-bold mb-4">Popular on Rush</Text>
              {searchEvents.map((event) => (
                <SearchBarEventCard
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
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;
