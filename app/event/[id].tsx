import { useLocalSearchParams } from "expo-router";

import EventScreen from "@/components/EventScreen";

// Mock event data - replace with actual event API later
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
    description: "Coldplay brings their Music of the Spheres tour to HBF Stadium. Experience an unforgettable night filled with their greatest hits, stunning visuals, and incredible energy. This is a show you won't want to miss.",
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
    description: "Beyonce brings her dazzling energy and iconic vocals to the stage in a spectacular live performance. Expect a night filled with chart-topping hits, breathtaking choreography, and a production that lights up the Accor Arena like never before.",
    venue: "Accor Arena",
    address: "8 Boulevard de Bercy, 75012 Paris, France",
    price: "$560",
  },
  "3": {
    id: 3,
    imageUri: "https://placehold.co/800x600/1a1a1a/FFFFFF.png",
    title: "Billie Eilish",
    date: "2024-10-15",
    time: "8:00 PM",
    description: "Billie Eilish performs her Happier Than Ever album live at Madison Square Garden. Experience her unique sound and powerful stage presence in an intimate yet grand setting.",
    venue: "Madison Square Garden",
    address: "New York, NY",
    price: "$450",
  },
  "4": {
    id: 4,
    imageUri: "https://placehold.co/800x600/2a2a2a/FFFFFF.png",
    title: "Taylor Swift",
    date: "2024-10-20",
    time: "7:30 PM",
    description: "Taylor Swift's The Eras Tour comes to Staples Center. A journey through all her musical eras with spectacular production, special effects, and unforgettable performances.",
    venue: "Staples Center",
    address: "Los Angeles, CA",
    price: "$380",
  },
};

const EventDetailPage = () => {
  const { id } = useLocalSearchParams();
  const eventId = id as string;

  // Get event data from mock data or use defaults
  const event = mockEvents[eventId] || {
    id: Number(eventId),
    imageUri: "https://placehold.co/800x600/1a1a1a/FFFFFF.png",
    title: "One Night with Ariana",
    date: "2024-10-12",
    time: "7:30 PM",
    description: "Ariana Grande brings her dazzling energy and iconic vocals to the stage in a spectacular live performance. Expect a night filled with chart-topping hits, breathtaking choreography, and a production that lights up the Accor Arena like never before.",
    venue: "Accor Arena",
    address: "8 Boulevard de Bercy, 75012 Paris, France",
    price: "$1,250",
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  };

  return (
    <EventScreen
      id={event.id}
      imageUri={event.imageUri}
      title={event.title}
      date={formatDate(event.date)}
      time={event.time}
      description={event.description}
      venue={event.venue}
      address={event.address}
      price={event.price}
      onPurchase={() => {
        // Handle purchase
        console.log("Purchase clicked for event:", eventId);
      }}
    />
  );
};

export default EventDetailPage;
