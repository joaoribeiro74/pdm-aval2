import {
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableHighlightProps
  } from "react-native";

  import { useTheme } from "@/context/ThemeContext";
  
  type StyledButtonProps = {
    title: string;
  } & TouchableHighlightProps;
  
  export default function StyledButton({ title, ...props }: StyledButtonProps) {
    const { colors } = useTheme();


    return (
      <TouchableHighlight {...props} style={[styles.button, { boxShadow: colors.boxShadow.logoutShadow, borderColor: colors.borderColor }, props.style]}>
        <Text style={[styles.buttonText, { color: colors.textColor }]}>{title}</Text>
      </TouchableHighlight>
    );
  }
  
  const styles = StyleSheet.create({
    button: {
      fontSize: 8,
      color: '#323232',
      marginLeft: 12,
      width: 'auto',
      boxShadow: '2px 2px #323232',
      paddingHorizontal: 5,
      borderRadius: 2,
      borderWidth: 1,
    },
    buttonText: {
      color: "#323232",
      fontSize: 15,
      fontWeight: "600",
      padding: 2,
    },
  });

  