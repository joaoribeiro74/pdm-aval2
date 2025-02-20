import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { Alert, TextInput, View, StyleSheet, Text } from "react-native";
import StyledButton from "../../../components/StyledButton";
import { useState } from "react";
import useCollection from "../../../firebase/hooks/useCollection";
import Sneaker from "../../../types/Sneaker";
import { MaskedTextInput } from "react-native-mask-text";
import { useTheme } from "@/context/ThemeContext";

export default function Edit() {
  const router = useRouter();
  const { colors } = useTheme();
  const { id, brand: initialBrand, name: initialName, size: initialSize, color: initialColor, price: initialPrice, image: initialImage } = useGlobalSearchParams();

  const { update, refreshData } = useCollection<Sneaker>("sneakers");

  const [brand, setBrand] = useState(initialBrand as string || "");
  const [name, setName] = useState(initialName as string || "");
  const [size, setSize] = useState(initialSize?.toString() || "");
  const [color, setColor] = useState(initialColor as string || "");
  const [price, setPrice] = useState(initialPrice?.toString() || "");
  const [image, setImage] = useState(initialImage as string || "");

  const handleUpdate = async () => {
    if (!id) return;
    try {
      const numericPrice = price.replace(/[^\d,]/g, "").replace(",", ".");

      await update(id.toString(), {
        brand,
        name,
        size: parseInt(size),
        color,
        price: parseFloat(numericPrice),
        image,
      });
      await refreshData();
      if (router.canDismiss()) {
        router.replace(`/`); 
      } 
    } catch (error: any) {
      Alert.alert("Atualizar Sneaker falhou", error.toString());
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundColor}]}>
      <Stack.Screen options={{ title: "Editar Sneaker" }} />

      <Text style={[styles.text, { color: colors.textColor }]}>Marca:</Text>
      <TextInput
        style={[styles.input, { borderColor: colors.borderColor, boxShadow: colors.boxShadow.default, color: colors.textColor }]}
        value={brand}
        onChangeText={setBrand}
      />
      <Text style={[styles.text, { color: colors.textColor }]}>Nome:</Text>
      <TextInput
        style={[styles.input, { borderColor: colors.borderColor, boxShadow: colors.boxShadow.default, color: colors.textColor }]}
        value={name}
        onChangeText={setName}
      />
      <Text style={[styles.text, { color: colors.textColor }]}>Tamanho:</Text>
      <TextInput
        style={[styles.input, { borderColor: colors.borderColor, boxShadow: colors.boxShadow.default, color: colors.textColor }]}
        placeholder="Tamanho"
        value={size}
        keyboardType="numeric"
        onChangeText={setSize}
        maxLength={2}
      />
      <Text style={[styles.text, { color: colors.textColor }]}>Cor(es):</Text>
      <TextInput
        style={[styles.input, { borderColor: colors.borderColor, boxShadow: colors.boxShadow.default, color: colors.textColor }]}
        value={color}
        onChangeText={setColor}
      />
      <Text style={[styles.text, { color: colors.textColor }]}>Preço:</Text>
      <MaskedTextInput
        type="currency"
        options={{
          prefix: 'R$ ',
          decimalSeparator: ',',
          groupSeparator: '.',
          precision: 2
        }}
        value={price}
        onChangeText={(text, rawText) => {
          setPrice(rawText); 
        }}
        style={[styles.input, { borderColor: colors.borderColor, boxShadow: colors.boxShadow.default, color: colors.textColor }]}
        placeholder="Preço"
      />
      <Text style={[styles.text, { color: colors.textColor }]}>URL da Imagem:</Text>
      <TextInput
        style={[styles.input, { borderColor: colors.borderColor, boxShadow: colors.boxShadow.default, color: colors.textColor }]}
        value={image}
        onChangeText={setImage}
      />
      <StyledButton title="Atualizar" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 15,
    borderColor: "#323232",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'black',
    boxShadow: "4px 4px #323232"

  },
  text: {
    fontWeight: "bold",
    marginBottom: 3,
    marginHorizontal: 3,
  },
});
