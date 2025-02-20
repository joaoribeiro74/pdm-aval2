import {
  Text,
  TouchableOpacityProps,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

type StyledButtonProps = {
  title: string;
} & TouchableOpacityProps;

export default function StyledButton({ title, ...props }: StyledButtonProps) {
  const { colors } = useTheme();
  
  const [isActive, setIsActive] = useState(false);

  const handlePressIn = () => {
    setIsActive(true); 
  };

  const handlePressOut = () => {
    setIsActive(false); 
  };

  return (
    <TouchableOpacity {...props} style={[styles.button, { backgroundColor: colors.backgroundColor, borderColor: colors.borderColor, boxShadow: colors.boxShadow.default }, props.style, isActive && styles.active]}
    onPressIn={handlePressIn}
    onPressOut={handlePressOut}>
      <Text style={[styles.buttonText, { color: colors.textColor}]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    marginTop: 50,
    width: 200,
    height: 45,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#323232",
    backgroundColor: "#f6f6f6",
    boxShadow: "4px 4px #323232",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    boxShadow: "0px 0px #323232",
    transform: [{ translateX: 3 }, { translateY: 3 }],
    opacity: 1,
  },
  buttonText: {
    color: "#323232",
    fontSize: 17,
    fontWeight: "600",
  },
});