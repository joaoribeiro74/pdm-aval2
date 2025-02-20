import { useRouter } from "expo-router";
import Sneaker from "../types/Sneaker";
import StyledButton from "./StyledButton";
import { Alert, View, StyleSheet } from "react-native";
import CardSneaker from "./CardSneaker";
import { MaskedText } from "react-native-mask-text";
import { useTheme } from "@/context/ThemeContext";


interface ViewDetailsProps {
    sneaker: Sneaker;
}

export default function ViewDetails({ sneaker }: ViewDetailsProps) {
    const router = useRouter();
    const { colors } = useTheme();
  
    return (
    <View style={styles.container}>
      <CardSneaker sneaker={sneaker}>
        <View style={styles.row}>
            <View style={styles.priceContainer}>
                <MaskedText
                style={[styles.price, { color: colors.textColor}]}
                type="currency"
                options={{
                    prefix: 'R$ ',
                    decimalSeparator: ',',
                    groupSeparator: '.',
                    precision: 2,
                }}
                >
                {sneaker.price.toString()}
                </MaskedText>
            </View>
            <View style={styles.buttonContainer}>
                <StyledButton
                    testID={`show-details-${sneaker.id}`} 
                    title="Detalhes →"
                    onPress={() => {
                    if (sneaker.id) {
                        router.push(`/home/${sneaker.id}/`);
                    } else {
                        Alert.alert(
                        "Erro na View",
                        "Não é possível acessar os detalhes do tênis porque ele não possui um ID!"
                        );
                    }
                    }}
                    style={{ width: "110%", marginTop: 0 }}
                />
            </View>
        </View>
        </CardSneaker>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    priceContainer: {
      flex: 1,
      alignItems: 'flex-start',
    },
    buttonContainer: {
      alignItems: 'flex-end',
    },
    price: {
      fontWeight: "bold",
      fontSize: 15,
      color: "#000",
    },
  });
