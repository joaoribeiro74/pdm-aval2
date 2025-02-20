import { useRouter } from "expo-router";
import { Alert, TouchableOpacity } from "react-native";
import useAuth from "../firebase/hooks/useAuth";
import StyledLogout from "./StyledLogout";
import { useTheme } from "../context/ThemeContext"; 
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HeaderRight() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { toggleTheme, theme } = useTheme();

  const themeIcon = theme === "light" ? (
    <Ionicons name="moon" size={24} color="#323232" />
  ) : (
    <Ionicons name="sunny" size={24} color="#f6f6f6" />
  );

  return (
    <>
      <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 10 }}>
        {themeIcon}
      </TouchableOpacity>
      <StyledLogout
        onPress={async () => {
          try {
            await logout();
            router.replace('/');
            console.log("Clicado!");
          } catch (error: any) {
            Alert.alert("Erro de Logout", error.toString());
          }
        }}
        title={"Logout"}
        style={{  }}
      />
    </>
  );
}
