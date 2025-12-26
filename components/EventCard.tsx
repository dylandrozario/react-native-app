import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import EventBanner from "./EventBanner";
import EventDetailsCard from "./EventDetailsCard";

interface EventCardProps {
  id: number;
  imageUri: string | null;
  title: string;
  subtitle?: string;
  venue: string;
  address?: string;
  price: string;
  date: string;
  time: string;
}

const EventCard = ({
  id,
  imageUri,
  title,
  subtitle,
  venue,
  address,
  price,
  date,
  time,
}: EventCardProps) => {
  const eventImageUri = imageUri || "https://placehold.co/400x600/1a1a1a/FFFFFF.png";

  return (
    <Link href={`/event/${id}`} asChild>
      <TouchableOpacity className="mb-6 rounded-3xl overflow-hidden">
        <EventBanner 
          imageUri={eventImageUri} 
          date={date}
          title={title}
          subtitle={subtitle}
        />
        <EventDetailsCard
          title={title}
          subtitle={subtitle}
          venue={venue}
          address={address}
          price={price}
          time={time}
        />
      </TouchableOpacity>
    </Link>
  );
};

export default EventCard;

