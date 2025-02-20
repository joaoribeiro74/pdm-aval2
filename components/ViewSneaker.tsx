import { useRouter } from "expo-router";
import { Alert, Text, View, StyleSheet, ScrollView } from "react-native";
import Sneaker from "../types/Sneaker";
import StyledButton from "./StyledButton";
import CardSneaker from "./CardSneaker";

interface ViewSneakerProps {
  sneaker: Sneaker;
  onDelete: Function;
  onEdit: Function;
}

export default function ViewSneaker({ sneaker, onDelete, onEdit }: ViewSneakerProps) {
  const router = useRouter();

  return (
    <ScrollView
      style={{ marginTop: 12 }}
    >
      <CardSneaker sneaker={sneaker} showDetails={true} isSecondPage={true}>
        {null}
      </CardSneaker>

      <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
      <StyledButton
          title="Editar"
          onPress={() => {
            onEdit(sneaker.id);
          }}
          style={{ width: "48%", marginTop: 15 }}
        />

        <StyledButton
          title="Deletar"
          onPress={() => {
            if (sneaker.id) {
              Alert.alert("Deletar Sneaker", "Você tem certeza?", [
                {
                  text: "Sim",
                  onPress: async () => {
                    onDelete();
                  },
                },
                {
                  text: "Não",
                  style: "cancel",
                },
              ]);
            } else {
              Alert.alert(
                "Erro ao Deletar",
                "Não é possível acessar os detalhes do tênis porque ele não possui um ID!"
              );
            }
          }}
          style={{ width: "48%", backgroundColor: "red", marginRight: 4, marginTop: 15 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    display: 'flex',
    marginTop: 20,
    padding: 30,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "323232",
    backgroundColor: "#f6f6f6",
    boxShadow: "4px 4px #323232",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});