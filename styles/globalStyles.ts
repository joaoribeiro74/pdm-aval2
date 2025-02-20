import { StyleSheet } from "react-native";

const theme = {
  primaryColor: "#fff",
  defaultRadius: 5,
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,    
    backgroundColor: "#e8e8e8",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    display: 'flex',
    marginTop: 50,
    width: 120,
    height: 45,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "323232",
    backgroundColor: "#f6f6f6",
    boxShadow: "4px 4px #323232",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default globalStyles;
