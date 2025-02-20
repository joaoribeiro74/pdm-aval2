import { View, Text, StyleSheet, Image } from 'react-native'
import React, { ReactNode } from 'react'
import Sneaker from '@/types/Sneaker'
import { MaskedText } from 'react-native-mask-text'
import { useTheme } from '@/context/ThemeContext';

interface CardSneakerProps {
    sneaker: Sneaker;
    children: ReactNode;
    showDetails?: boolean;
    isSecondPage?: boolean;
}

const brandAliases: { [key: string]: string } = {
  jordan: 'jordan',
  'nike air jordan': 'jordan',
  'air jordan': 'jordan',
  nike: 'nike',
  adidas: 'adidas',
  'new balance': 'new balance',
  puma: 'puma',
  vans: 'vans',
};

const brandLogos: { [key: string]: any } = {
  nike: require('@/assets/logos/nike.png'),
  adidas: require('@/assets/logos/adidas.png'),
  'new balance': require('@/assets/logos/newbalance.png'),
  puma: require('@/assets/logos/puma.png'),
  jordan: require('@/assets/logos/jordan.png'),
  vans: require('@/assets/logos/vans.png'),
  default: require('@/assets/logos/default.png'),
}

export default function CardSneaker({ sneaker, children, showDetails = false, isSecondPage = false }: CardSneakerProps) {
  const { colors } = useTheme();
  const normalizedBrand = brandAliases[sneaker.brand.toLowerCase()] || 'default';
  const logo = brandLogos[normalizedBrand];

  return (
    <View style={[isSecondPage ? styles.buttonSecondPage : styles.button, { backgroundColor: colors.backgroundColor, boxShadow: colors.boxShadow.default, borderColor: colors.borderColor}]}>
      <Image source={logo} style={isSecondPage ? styles.logoSecondPage : styles.logo} />
      <Text style={[styles.titleProduct, {color: colors.textColor}]}>{sneaker.brand} {sneaker.name}</Text>
      <Text style={[styles.title, {color: colors.textColor}]}>ID: 
        <Text style={styles.info}> {sneaker.id}</Text>
      </Text>
      
      {showDetails && (  
        <>
          <Text style={[styles.title, {color: colors.textColor}]}>Cor(es): 
            <Text style={styles.info}> {sneaker.color}</Text>    
          </Text>
          <Text style={[styles.title, {color: colors.textColor}]}>Tamanho: 
            <Text style={styles.info}> {sneaker.size}</Text>
          </Text>
          {sneaker.image ? (
              <Image
                testID="sneaker-image" // Adicionando o testID aqui também
                source={{ uri: sneaker.image }}
                style={[styles.image, { borderColor: colors.borderColor, boxShadow: colors.boxShadow.imageShadow } as any]}
              />
            ) : (
              <Image
                testID="sneaker-image" // Adicionando o testID aqui para a imagem padrão
                source={require('@/assets/images/Sneaker.png')}
                style={[styles.image, { borderColor: colors.borderColor, boxShadow: colors.boxShadow.default } as any]}
              />
            )}
          <Text style={[styles.price, { color: colors.textColor}]}>
            <MaskedText
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
          </Text>
        </>
      )}

      <View style={isSecondPage ? styles.actionsSecondPage : styles.actions}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
      width: '90%',
      display: 'flex',
      marginTop: 20,
      padding: 30,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: "#323232",
      backgroundColor: "#f6f6f6",
      boxShadow: "4px 4px #323232",
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonSecondPage: {
      width: '90%',
      display: 'flex',
      paddingHorizontal: 30, 
      borderRadius: 5,
      borderWidth: 2,
      borderColor: "#323232",
      backgroundColor: "#f6f6f6",
      boxShadow: "4px 4px #323232",
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleProduct: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 15,
    },
    title: {
        fontSize: 15,
        fontWeight: "900",
        marginBottom: 5,
    },
    info: {
        fontWeight: "500",
        fontSize: 13,
    },
    actions: {
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
    },
    actionsSecondPage: {
      marginTop: 5,
      width: '100%',
      alignItems: 'center',
  },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 10,
      resizeMode: 'contain',
    },
    logoSecondPage: {
      width: 100,
      height: 100,
      marginTop: 20,
      marginBottom: 10,
      resizeMode: 'contain',
    },
    priceContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-start', 
      marginBottom: 15,
    },
    price: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    image: {
      width: 200,
      height: 200,
      borderWidth: 2,
      borderRadius: 5,
      marginVertical: 10,
      boxShadow: '2px 2px #323232'
    },
  });
