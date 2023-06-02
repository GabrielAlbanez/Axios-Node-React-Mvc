import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const url = "http://10.112.240.199:30000/usuarios";

  useEffect(() => {
    pegarUsuarios();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.email}</Text>
      <Text style={styles.itemEmail}>{item.name}</Text>
    </View>
  );
  const pegarUsuarios = async () => {
    axios
      .get(url)
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <View style={styles.container}>
      <Text>Lista De Usuarios</Text>
      <FlatList
        data={usuarios}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  flatList: {
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#dddddd",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemEmail: {
    fontSize: 14,
    color: "#999999",
  },
  addButton: {
    backgroundColor: "#ff4500",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 8,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#ffffff",
    marginBottom: 10,
    padding: 10,
    borderColor: "#dddddd",
    borderRadius: 4,
  },
  createButton: {
    borderColor: "#dddddd",
    padding: 12,
    alignItems: "center",
    borderRadius: 4,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
