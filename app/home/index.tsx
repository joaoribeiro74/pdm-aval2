import { Stack, useRouter } from "expo-router";
import { FlatList, View, StyleSheet } from "react-native";

import { useTheme } from "../../context/ThemeContext";
import HeaderRight from "../../components/HeaderRight";
import Loading from "../../components/Loading";
import StyledButton from "../../components/StyledButton";
import useCollection from "../../firebase/hooks/useCollection";
import Sneaker from "../../types/Sneaker";
import ViewDetails from "@/components/ViewDetails";

export default function Home() {
  const { data, create, update, remove, refreshData, loading } =
    useCollection<Sneaker>("sneakers");

    const { colors } = useTheme();
    const router = useRouter();
    
  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundColor }]}>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => <HeaderRight />,
        }}
      />

      <StyledButton
        testID="create-button"
        style={{ marginBottom: 20, marginTop: -10}}
        title="Criar sneaker"
        onPress={() => router.push("/home/create")}
      />

{loading ? (
        <Loading />
      ) : (
        <FlatList
          testID="card-sneaker"
          data={data}
          renderItem={({ item }) => (
            <View 
              testID={`sneaker-item-${item.id}`} 
              style={{ marginBottom: 10 }}>
              <ViewDetails sneaker={item} />
            </View>
          )}
          style={{ width: "100%" }}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  editForm: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 5,
    backgroundColor: "#f6f6f6",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "flex-start",
    borderWidth: 2,
    borderColor: "#323232",
    boxShadow: '4px 4px #323232',
  },
  input: {
    width: '100%',
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
    marginBottom: 30,
    marginTop: 3,
  },
});
