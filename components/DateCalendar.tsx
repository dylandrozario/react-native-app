import { View, Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { useState } from "react";

const DateCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const today = new Date();
  const isToday = (date: Date | null) => {
    if (!date) return false;
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <BlurView intensity={60} tint="dark" className="rounded-3xl overflow-hidden mb-5">
      <View className="p-4 bg-dark-200/60">
        {/* Month Navigation */}
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={goToPreviousMonth}>
            <Text className="text-white text-lg font-semibold">‹</Text>
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Text>
          <TouchableOpacity onPress={goToNextMonth}>
            <Text className="text-white text-lg font-semibold">›</Text>
          </TouchableOpacity>
        </View>

        {/* Days of Week Header */}
        <View className="flex-row mb-2">
          {daysOfWeek.map((day) => (
            <View key={day} className="flex-1 items-center">
              <Text className="text-light-300 text-xs font-semibold">{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View className="flex-row flex-wrap">
          {days.map((date, index) => {
            if (!date) {
              return <View key={`empty-${index}`} className="w-[14.28%] aspect-square" />;
            }

            const isTodayDate = isToday(date);
            const isSelectedDate = isSelected(date);

            return (
              <TouchableOpacity
                key={date.toISOString()}
                onPress={() => setSelectedDate(date)}
                className={`w-[14.28%] aspect-square items-center justify-center ${
                  isSelectedDate ? "bg-accent rounded-full" : ""
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    isSelectedDate
                      ? "text-secondary"
                      : isTodayDate
                      ? "text-accent"
                      : "text-white"
                  }`}
                >
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </BlurView>
  );
};

export default DateCalendar;

