import { Slot } from "expo-router";
import { ThemeProvider } from "@/context/ThemeContext";

export default function _layout() {
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
