import { useLocalSearchParams, useRouter } from "expo-router";
import TicketConfirmation from "@/components/TicketConfirmation";

// Mock event data - same as event/[id].tsx
const mockEvents: Record<string, {
  id: number;
  imageUri: string;
  title: string;
  date: string;
  time: string;
  description: string;
  venue: string;
  address: string;
  price: string;
}> = {
  "1": {
    id: 1,
    imageUri: "https://placehold.co/800x600/000000/FFFFFF.png",
    title: "Coldplay",
    date: "2024-12-12",
    time: "8:00 PM",
    description: "Coldplay brings their Music of the Spheres tour to HBF Stadium.",
    venue: "HBF Stadium",
    address: "100 Stephenson Ave, Mount Claremont WA 6010",
    price: "$175.00",
  },
  "2": {
    id: 2,
    imageUri: "https://placehold.co/800x600/F5F5DC/000000.png",
    title: "Beyonce",
    date: "2024-10-12",
    time: "7:00 PM",
    description: "Beyonce brings her dazzling energy and iconic vocals to the stage.",
    venue: "Accor Arena",
    address: "8 Boulevard de Bercy, 75012 Paris, France",
    price: "$560",
  },
  "3": {
    id: 3,
    imageUri: "https://placehold.co/400x600/1a1a1a/FFFFFF.png",
    title: "Billie Eilish",
    date: "2024-10-15",
    time: "8:00 PM",
    description: "Billie Eilish performs her Happier Than Ever album live.",
    venue: "Madison Square Garden",
    address: "New York, NY",
    price: "$450",
  },
  "4": {
    id: 4,
    imageUri: "https://placehold.co/400x600/2a2a2a/FFFFFF.png",
    title: "Taylor Swift",
    date: "2024-10-20",
    time: "7:30 PM",
    description: "Taylor Swift's The Eras Tour comes to Staples Center.",
    venue: "Staples Center",
    address: "Los Angeles, CA",
    price: "$380",
  },
};

const CheckoutPage = () => {
  const { id, quantities: quantitiesParam, ticketPrices: ticketPricesParam } = useLocalSearchParams();
  const router = useRouter();
  const eventId = id as string;

  // Parse quantities and prices from route params
  const quantities: Record<string, number> = quantitiesParam 
    ? JSON.parse(decodeURIComponent(quantitiesParam as string))
    : { general: 1 }; // Default to 1 general ticket

  const ticketPrices: Record<string, string> = ticketPricesParam
    ? JSON.parse(decodeURIComponent(ticketPricesParam as string))
    : {};

  // Get event and format date
  const eventData = mockEvents[eventId] || {
    id: Number(eventId),
    imageUri: "https://placehold.co/800x600/1a1a1a/FFFFFF.png",
    title: "One Night with Ariana",
    date: "2024-10-12",
    time: "7:30 PM",
    description: "Ariana Grande brings her dazzling energy.",
    venue: "Accor Arena",
    address: "8 Boulevard de Bercy, 75012 Paris, France",
    price: "$1,250",
  };

  // Format date for display (same as event/[id].tsx)
  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  };

  const event = {
    ...eventData,
    date: formatDate(eventData.date),
  };

  // Build ticket items from quantities
  const ticketItems = Object.entries(quantities)
    .filter(([_, qty]) => qty > 0)
    .map(([ticketId, qty]) => ({
      id: ticketId,
      name: ticketId === "general" ? "General Admission" : ticketId === "vip" ? "VIP" : "Premium",
      price: ticketPrices[ticketId] || event.price,
      quantity: qty,
    }));

  // Calculate total price
  const totalPrice = ticketItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, "") || "0");
    return sum + (price * item.quantity);
  }, 0);

  const handleConfirm = () => {
    // Handle ticket purchase confirmation
    console.log("Tickets confirmed:", ticketItems);
    // Navigate to success page or tickets page
    router.push("/(tabs)/tickets");
  };

  return (
    <TicketConfirmation
      eventTitle={event.title}
      venue={event.venue}
      date={event.date}
      time={event.time}
      tickets={ticketItems.length > 0 ? ticketItems : [{ id: "general", name: "General Admission", price: event.price, quantity: 1 }]}
      totalPrice={totalPrice > 0 ? `$${totalPrice.toFixed(2)}` : event.price}
      onConfirm={handleConfirm}
    />
  );
};

export default CheckoutPage;
