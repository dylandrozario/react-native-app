import { View, ScrollView } from "react-native";
import { useState, useMemo } from "react";
import { useRouter } from "expo-router";
import EventHeaderImage from "./EventHeaderImage";
import EventInfoCard from "./EventInfoCard";
import EventMap from "./EventMap";
import TicketOptions from "./TicketOptions";
import EventDescription from "./EventDescription";
import EventPurchaseSection from "./EventPurchaseSection";

interface TicketOption {
  id: string;
  name: string;
  price: string;
  description?: string;
  available: boolean;
}

interface EventScreenProps {
  id: number;
  imageUri: string;
  title: string;
  date: string;
  time: string;
  description: string;
  venue: string;
  address?: string;
  price: string;
  tickets?: TicketOption[];
  onPurchase?: () => void;
  onTicketSelect?: (ticketId: string) => void;
}

const EventScreen = ({
  id,
  imageUri,
  title,
  date,
  time,
  description,
  venue,
  address,
  price,
  tickets,
  onPurchase,
  onTicketSelect,
}: EventScreenProps) => {
  const router = useRouter();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  // Default ticket options if none provided
  const getDefaultTickets = (): TicketOption[] => {
    if (tickets) return tickets;
    
    // Extract numeric value from price string (handles formats like "$175.00", "$1,250", etc.)
    const basePrice = parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
    
    return [
      {
        id: "general",
        name: "General Admission",
        price: price,
        description: "Standard entry ticket",
        available: true,
      },
      {
        id: "vip",
        name: "VIP",
        price: `$${(basePrice * 2).toFixed(2)}`,
        description: "VIP access with premium seating",
        available: true,
      },
      {
        id: "premium",
        name: "Premium",
        price: `$${(basePrice * 1.5).toFixed(2)}`,
        description: "Premium seating and amenities",
        available: false,
      },
    ];
  };

  const defaultTickets = getDefaultTickets();

  // Handle quantity changes
  const handleQuantityChange = (ticketId: string, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [ticketId]: quantity,
    }));
  };

  // Calculate total quantity and price
  const { totalQuantity, totalPrice } = useMemo(() => {
    let quantity = 0;
    let total = 0;

    defaultTickets.forEach((ticket) => {
      const qty = quantities[ticket.id] || 0;
      if (qty > 0) {
        quantity += qty;
        const ticketPrice = parseFloat(ticket.price.replace(/[^0-9.]/g, "")) || 0;
        total += ticketPrice * qty;
      }
    });

    return {
      totalQuantity: quantity,
      totalPrice: total > 0 ? `$${total.toFixed(2)}` : undefined,
    };
  }, [quantities, defaultTickets]);

  const handlePurchase = () => {
    if (totalQuantity > 0) {
      onPurchase?.();
      
      // Build ticket prices object
      const ticketPricesObj: Record<string, string> = {};
      defaultTickets.forEach((ticket) => {
        ticketPricesObj[ticket.id] = ticket.price;
      });

      // Navigate to checkout/confirmation page with quantities and prices
      const quantitiesParam = encodeURIComponent(JSON.stringify(quantities));
      const pricesParam = encodeURIComponent(JSON.stringify(ticketPricesObj));
      router.push(`/checkout/${id}?quantities=${quantitiesParam}&ticketPrices=${pricesParam}`);
    }
  };

  return (
    <View className="bg-primary flex-1">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Image with Back Button */}
        <EventHeaderImage imageUri={imageUri} />

        {/* Event Info Card */}
        <EventInfoCard
          title={title}
          date={date}
          time={time}
        />

        {/* About Section */}
        <EventDescription description={description} />

        {/* Ticket Options */}
        <TicketOptions
          tickets={defaultTickets}
          onTicketSelect={onTicketSelect}
          quantities={quantities}
          onQuantityChange={handleQuantityChange}
        />

        {/* Map Section */}
        <EventMap venue={venue} address={address} />
      </ScrollView>

      {/* Purchase Section - Fixed at Bottom */}
      <EventPurchaseSection
        price={price}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
        onPurchase={handlePurchase}
      />
    </View>
  );
};

export default EventScreen;

