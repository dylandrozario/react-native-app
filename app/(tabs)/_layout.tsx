import { Tabs } from "expo-router";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function TabIcon({ focused, iconName }: { focused: boolean; iconName: keyof typeof Ionicons.glyphMap }) {
  if (focused) {
    return (
      <View 
        className="rounded-full items-center justify-center"
        style={{ 
          width: 40, 
          height: 40, 
          backgroundColor: "#0F0D23" 
        }}
      >
        <Ionicons name={iconName} size={22} color="#FFFFFF" />
      </View>
    );
  }

  return <Ionicons name={iconName} size={22} color="#FFFFFF" />;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#221F3D",
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="home-outline" />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="list-outline" />
          ),
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Activity",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="pulse-outline" />
          ),
        }}
      />

      <Tabs.Screen
        name="tickets"
        options={{
          title: "Tickets",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="ticket-outline" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="person-outline" />
          ),
        }}
      />
    </Tabs>
  );
}
