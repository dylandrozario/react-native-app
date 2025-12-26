interface Event {
  id: number;
  title: string;
  subtitle?: string;
  imageUri: string;
  venue: string;
  address?: string;
  price: string;
  date: string;
  time: string;
  description?: string;
  category?: string;
  available?: boolean;
}

interface EventDetails {
  id: number;
  title: string;
  subtitle?: string;
  imageUri: string;
  venue: string;
  address?: string;
  price: string;
  date: string;
  time: string;
  description: string;
  category?: string;
  tickets?: TicketOption[];
}

interface TicketOption {
  id: string;
  name: string;
  price: string;
  description?: string;
  available: boolean;
}

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
