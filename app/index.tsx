import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, View, StyleSheet, ScrollView, ImageBackground } from "react-native";

import Loading from "../components/Loading";
import StyledButton from "../components/StyledButton";
import useAuth from "../firebase/hooks/useAuth";
import { useTheme } from "@/context/ThemeContext";

export default function _screen() {
  const { user, login, loading } = useAuth();
  const router = useRouter();
  const { colors, theme } = useTheme();

  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("123456");

  useEffect(() => {
    if (user) {
      router.replace("/home/");
    }
  }, [user]);

  if (loading) return <Loading />;

  const backgroundImage = theme === 'dark'
    ? require('@/assets/images/background-dark.png')
    : require('@/assets/images/background-light.png');

  return (
    <ImageBackground 
      source={backgroundImage}
      resizeMode="cover"
      style={[styles.background, {backgroundColor: colors.backgroundColor}]}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.form, { backgroundColor: colors.backgroundColor, boxShadow: colors.boxShadow.default, borderColor: colors.borderColor}]}>
        <Text style={[styles.title, { color: colors.textColor}]}>
          Bem-Vindo, {"\n"}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textColor}]}>faça login para continuar</Text>

        <TextInput
          style={[styles.input, { borderColor: colors.borderColor, boxShadow: colors.boxShadow.default, backgroundColor: colors.backgroundColor, color: colors.textColor }]}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#black"
        />
        <TextInput
          style={[styles.input, { borderColor: colors.borderColor, boxShadow: colors.boxShadow.default, backgroundColor: colors.backgroundColor, color: colors.textColor }]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Senha"
          placeholderTextColor="#black"
        />

        <StyledButton
          title="Login"
          onPress={async () => {
            try {
              await login(email, password);
              router.push("/home/");
            } catch (error: any) {
              Alert.alert("Erro de Login", error.toString());
            }
          }}
        />
      </View>
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
    zIndex: -1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoCont: {
    display: 'flex',
    padding: 20,
    flexDirection: 'column',
  },
  form: {
    padding: 20,
    backgroundColor: "white",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "flex-start",
    gap: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#323232",
    boxShadow: '4px 4px #323232',
  },
  title: {
    color: '#323232',
    fontWeight: "900",
    fontSize: 20,
  },
  subtitle: {
    color: '#666',
    fontWeight: "600",
    fontSize: 15,
    marginTop: -15,
    marginBottom: 40,
  },
  input: {
    width: 250,
    height: 50,
    borderRadius: 5,
    borderColor: "#323232",
    borderWidth: 2,
    boxShadow: "4px 4px #323232",
    fontSize: 15,
    fontWeight: "600",
    backgroundColor: "#f6f6f6",
    padding: 10,
    display: 'flex',
    alignItems: 'center',
  }, 
  logo: {
    width: 100, 
    height: 100, 
    alignSelf: 'center', 
    marginBottom: 50,
  },
});
