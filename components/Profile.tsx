import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Ticket from "./Ticket";

interface SavedTicket {
  id: number;
  imageUri: string;
  title: string;
  subtitle?: string;
  venue: string;
  address?: string;
  price: string;
  date: string;
  time: string;
}

interface ProfileProps {
  name?: string;
  email?: string;
  avatarInitials?: string;
  followers?: number;
  following?: number;
  savedTickets?: SavedTicket[];
  onEditProfile?: () => void;
  onSettings?: () => void;
  onTicketPress?: (id: number) => void;
  onAddMore?: () => void;
}

const ActionItem = ({ label, icon, onPress, showChevronDown = false }: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  showChevronDown?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-4 border-b border-gray-800"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        <Ionicons name={icon} size={24} color="#FFFFFF" style={{ marginRight: 16 }} />
        <Text className="text-white text-base">{label}</Text>
      </View>
      <Ionicons 
        name={showChevronDown ? "chevron-down" : "chevron-forward"} 
        size={20} 
        color="#FFFFFF" 
      />
    </TouchableOpacity>
  );
};


const Profile = ({
  name = "Alex Smith",
  email = "alex.smith@gmail.com",
  avatarInitials = "AS",
  followers = 0,
  following = 0,
  savedTickets = [],
  onEditProfile,
  onSettings,
  onTicketPress,
  onAddMore,
}: ProfileProps) => {
  // Default saved tickets if none provided
  const defaultSavedTickets: SavedTicket[] = [
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
  ];

  const displayTickets = savedTickets.length > 0 ? savedTickets : defaultSavedTickets;

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View className="items-center pt-16 pb-8 px-5">
          {/* Avatar */}
          <View className="w-24 h-24 rounded-full bg-purple-400 items-center justify-center mb-4">
            <Text className="text-white text-2xl font-bold">{avatarInitials}</Text>
          </View>

          {/* Name */}
          <Text className="text-white text-2xl font-bold mb-2">{name}</Text>

          {/* Email */}
          <Text className="text-light-200 text-base mb-4">{email}</Text>

          {/* Followers and Following */}
          <View className="flex-row items-center gap-6">
            <View className="flex-row items-center">
              <Ionicons name="people-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text className="text-white text-base">
                <Text className="font-semibold">{followers}</Text> Followers
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="person-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text className="text-white text-base">
                <Text className="font-semibold">{following}</Text> Following
              </Text>
            </View>
          </View>
        </View>

        {/* Saved Section */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-xl font-bold">Saved</Text>
            <TouchableOpacity
              onPress={onAddMore}
              className="flex-row items-center"
              activeOpacity={0.7}
            >
              <Text className="text-white text-sm mr-1">Add More</Text>
              <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Saved Tickets - Horizontal Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {displayTickets.map((ticket) => (
              <View key={ticket.id} style={{ width: 280, marginRight: 12 }}>
                <Ticket
                  id={ticket.id}
                  imageUri={ticket.imageUri}
                  title={ticket.title}
                  subtitle={ticket.subtitle}
                  venue={ticket.venue}
                  address={ticket.address}
                  price={ticket.price}
                  date={ticket.date}
                  time={ticket.time}
                  onPress={() => onTicketPress?.(ticket.id)}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Menu Items */}
        <View className="px-5">
          <ActionItem
            label="Edit Profile"
            icon="person-outline"
            onPress={onEditProfile}
          />
          <ActionItem
            label="App Settings"
            icon="phone-portrait-outline"
            onPress={onSettings}
            showChevronDown={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

