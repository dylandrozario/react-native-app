import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface TicketSettingsProps {
  onCancel?: () => void;
  onDone?: () => void;
  qrCodeData?: string;
}

interface ActionItemProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}

const ActionItem = ({ label, icon, onPress }: ActionItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-4 border-b border-gray-800"
      activeOpacity={0.7}
    >
      <Text className="text-white text-base">{label}</Text>
      <Ionicons name={icon} size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const TicketSettings = ({ onCancel, onDone, qrCodeData = "TICKET-12345" }: TicketSettingsProps) => {
  const router = useRouter();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  const handleDone = () => {
    if (onDone) {
      onDone();
    } else {
      router.back();
    }
  };

  // QR code placeholder - in production, use a QR code library like react-native-qrcode-svg
  const QRCodePlaceholder = () => {
    // Generate a deterministic pattern for QR code appearance
    const size = 25;
    const generatePattern = () => {
      const pattern: boolean[][] = [];
      for (let i = 0; i < size; i++) {
        pattern[i] = [];
        for (let j = 0; j < size; j++) {
          // Create corner squares (QR code characteristic)
          if (
            (i < 7 && j < 7) ||
            (i < 7 && j >= size - 7) ||
            (i >= size - 7 && j < 7)
          ) {
            pattern[i][j] = (i + j) % 2 === 0;
          } else {
            // Random pattern for the rest
            pattern[i][j] = (i * size + j) % 3 === 0;
          }
        }
      }
      return pattern;
    };

    const pattern = generatePattern();

    return (
      <View className="bg-white rounded-2xl p-6 items-center justify-center" style={{ width: 280, height: 280 }}>
        <View className="flex-row flex-wrap" style={{ width: 240, height: 240 }}>
          {pattern.map((row, i) =>
            row.map((isBlack, j) => (
              <View
                key={`${i}-${j}`}
                style={{
                  width: 240 / size,
                  height: 240 / size,
                  backgroundColor: isBlack ? "#000000" : "#FFFFFF",
                }}
              />
            ))
          )}
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-primary">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-16 pb-6">
        <TouchableOpacity onPress={handleCancel} activeOpacity={0.7}>
          <Text className="text-white text-base">Cancel</Text>
        </TouchableOpacity>
        
        <Text className="text-white text-lg font-semibold">Your Order</Text>
        
        <TouchableOpacity onPress={handleDone} activeOpacity={0.7}>
          <Text className="text-white text-base font-semibold">Done</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="flex-1 px-5">
        {/* QR Code Section */}
        <View className="items-center mt-8 mb-6">
          <QRCodePlaceholder />
        </View>

        {/* Show Event Flyer */}
        <TouchableOpacity
          className="flex-row items-center justify-center mb-8"
          activeOpacity={0.7}
        >
          <Ionicons name="information-circle-outline" size={20} color="#A8B5DB" style={{ marginRight: 8 }} />
          <Text className="text-light-200 text-sm">Show Event Flyer</Text>
        </TouchableOpacity>

        {/* Action Items */}
        <View className="mt-4">
          <ActionItem
            label="View Event"
            icon="information-circle-outline"
            onPress={() => {
              // Handle view event
            }}
          />
          <ActionItem
            label="Transfer Ticket"
            icon="arrow-forward-circle-outline"
            onPress={() => {
              // Handle transfer ticket
            }}
          />
          <ActionItem
            label="Add to Calendar"
            icon="calendar-outline"
            onPress={() => {
              // Handle add to calendar
            }}
          />
          <ActionItem
            label="Get Directions"
            icon="navigate-outline"
            onPress={() => {
              // Handle get directions
            }}
          />
          <ActionItem
            label="View Order Confirmation"
            icon="receipt-outline"
            onPress={() => {
              // Handle view order confirmation
            }}
          />
          <ActionItem
            label="Add to Apple Wallet"
            icon="wallet-outline"
            onPress={() => {
              // Handle add to wallet
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default TicketSettings;

