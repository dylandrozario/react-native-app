import { useLocalSearchParams } from "expo-router";
import TicketSettings from "@/components/TicketSettings";

const TicketDetailPage = () => {
  const { id } = useLocalSearchParams();
  const ticketId = id as string;

  return (
    <TicketSettings
      qrCodeData={`TICKET-${ticketId}`}
    />
  );
};

export default TicketDetailPage;

