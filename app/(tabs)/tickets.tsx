import { View, Text, ScrollView } from "react-native";
import { useState, useMemo } from "react";
import { useRouter } from "expo-router";
import FilterButtons from "@/components/FilterButtons";
import SearchIconButton from "@/components/SearchIconButton";
import Ticket from "@/components/Ticket";

interface TicketData {
  id: number;
  imageUri: string;
  title: string;
  subtitle?: string;
  venue: string;
  address: string;
  price: string;
  date: string;
  time: string;
}

const Tickets = () => {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>("Upcoming");

  const filters = ["Upcoming", "Past"];

  // Mock ticket data
  const mockTickets: TicketData[] = [
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
      id: 5,
      imageUri: "https://placehold.co/400x600/4a2c2a/FFFFFF.png",
      title: "The Weeknd",
      subtitle: "After Hours Til Dawn Tour",
      venue: "Barclays Center",
      address: "Brooklyn, NY",
      price: "From $320",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      time: "9:00 PM",
    },
  ];

  // Calculate days until event
  const getDaysUntilEvent = (dateString: string): number => {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filter tickets based on selected filter
  const filteredTickets = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return mockTickets.filter((ticket) => {
      const eventDate = new Date(ticket.date);
      eventDate.setHours(0, 0, 0, 0);

      if (selectedFilter === "Upcoming") {
        return eventDate >= today;
      } else if (selectedFilter === "Past") {
        return eventDate < today;
      }
      return true;
    });
  }, [selectedFilter]);

  // Group tickets by days until event (for upcoming) or days since event (for past)
  const groupedTickets = useMemo(() => {
    const groups: Record<number, TicketData[]> = {};

    filteredTickets.forEach((ticket) => {
      const days = getDaysUntilEvent(ticket.date);
      if (!groups[days]) {
        groups[days] = [];
      }
      groups[days].push(ticket);
    });

    // Sort by days (ascending for upcoming, descending for past)
    const sortedDays = Object.keys(groups)
      .map(Number)
      .sort((a, b) => {
        if (selectedFilter === "Upcoming") {
          return a - b;
        } else {
          return b - a;
        }
      });

    return sortedDays.map((days) => ({
      days,
      tickets: groups[days],
    }));
  }, [filteredTickets, selectedFilter]);

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSearchPress = () => {
    router.push("/search");
  };

  const handleTicketPress = (ticketId: number) => {
    router.push(`/ticket/${ticketId}`);
  };

  return (
    <View className="flex-1 bg-primary">
      {/* Header Section */}
      <View className="pt-20 px-5 pb-5">
        <View className="flex-row items-center justify-between mb-5">
          {/* Spacer for absolute positioning */}
          <View className="w-12" />
          
          {/* Filter Buttons - Centered */}
          <View className="flex-1 items-center">
            <FilterButtons
              items={filters}
              selectedItem={selectedFilter}
              onItemSelect={handleFilterSelect}
            />
          </View>

          {/* Search Icon Button */}
          <View className="w-12 items-end">
            <SearchIconButton
              onPress={handleSearchPress}
              isActive={false}
            />
          </View>
        </View>
      </View>

      {/* Content Area with Tickets */}
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {groupedTickets.length > 0 ? (
          groupedTickets.map((group, groupIndex) => {
            const days = group.days;
            let titleText = "";

            if (selectedFilter === "Upcoming") {
              if (days === 0) {
                titleText = "Today";
              } else if (days === 1) {
                titleText = "Starts in 1 day";
              } else {
                titleText = `Starts in ${days} days`;
              }
            } else {
              if (days === 0) {
                titleText = "Today";
              } else if (days === -1) {
                titleText = "1 day ago";
              } else {
                titleText = `${Math.abs(days)} days ago`;
              }
            }

            return (
              <View key={groupIndex} className={groupIndex > 0 ? "mt-8" : ""}>
                <Text className="text-white text-xl font-bold mb-4">
                  {titleText}
                </Text>
                {group.tickets.map((ticket) => (
                  <Ticket
                    key={ticket.id}
                    id={ticket.id}
                    imageUri={ticket.imageUri}
                    title={ticket.title}
                    subtitle={ticket.subtitle}
                    venue={ticket.venue}
                    address={ticket.address}
                    price={ticket.price}
                    date={ticket.date}
                    time={ticket.time}
                    onPress={() => handleTicketPress(ticket.id)}
                  />
                ))}
              </View>
            );
          })
        ) : (
          <View className="flex-1 items-center justify-center mt-20">
            <Text className="text-light-300 text-base">
              No {selectedFilter?.toLowerCase()} tickets found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Tickets;

