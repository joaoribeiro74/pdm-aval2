import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

import HeaderRight from "../../../components/HeaderRight";
import Loading from "../../../components/Loading";
import globalStyles from "../../../styles/globalStyles";
import Sneaker from "../../../types/Sneaker";
import ViewSneaker from "@/components/ViewSneaker";
import useCollection from "@/firebase/hooks/useCollection";
import { useTheme } from "@/context/ThemeContext";

export default function SneakerDetails() {
  const { theme } = useTheme();

  const styles = theme === 'light' ? lightStyles : darkStyles;

  const router = useRouter();
  const { id } = useGlobalSearchParams();

  const sneakerId = typeof id === 'string' ? id : (Array.isArray(id) ? id[0] : undefined);


  const { data, remove, refreshData, loading } = useCollection<Sneaker>("sneakers");

  const sneaker = data.find(item => item.id === sneakerId);

  if (loading) {
    return <Loading />;
  }

  if (!sneaker) {
    return (
      <View style={globalStyles.container}>
        <Text>O sneaker não foi encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Detalhes",
          headerRight: () => <HeaderRight />,
        }}
      />

      <ViewSneaker
        sneaker={sneaker}
        onDelete={async () => {
          if (sneaker.id) {
            await remove(sneaker.id);
            await refreshData();
            router.push("/"); 
          }
        }}
        onEdit={() => {
          router.push({
            pathname: "/home/[id]/edit",
            params: {
              id: sneaker.id,
              brand: sneaker.brand,
              name: sneaker.name,
              size: sneaker.size.toString(),
              color: sneaker.color,
              price: sneaker.price.toString(),
              image: sneaker.image,
            },
          });
        }}
      />
    </View>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,  
    backgroundColor: "#f6f6f6",
  }
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,  
    backgroundColor: "#14242a",
  }
});


