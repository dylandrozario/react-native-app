import Profile from "@/components/Profile";

const ProfilePage = () => {
  return (
    <Profile
      name="Alex Smith"
      email="alex.smith@gmail.com"
      avatarInitials="AS"
      followers={1247}
      following={89}
      onEditProfile={() => {
        // Handle edit profile
        console.log("Edit profile clicked");
      }}
      onSettings={() => {
        // Handle settings
        console.log("Settings clicked");
      }}
      onTicketPress={(id) => {
        // Handle ticket press
        console.log("Ticket pressed:", id);
      }}
      onAddMore={() => {
        // Handle add more
        console.log("Add more clicked");
      }}
    />
  );
};

export default ProfilePage;
