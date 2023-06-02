import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modalVisible, setModalVisible] = useState(true);

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

  const limparCampos = () => {
    setNome("");
    setEmail("");
    setSenha("");
  };

  const criarUsuario = () => {
    axios
      .post(url, {
        name: nome,
        email: email,
        password: senha,
      })
      .then((response) => {
        console.log(response.data);
        pegarUsuarios();
        setModalVisible(false);
        limparCampos();
      })
      .catch((erro) => console.log(erro));
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
      <TouchableOpacity
        styles={styles.addButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                limparCampos();
              }}
            >
              <Text>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Criar Usuario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={(valor) => setNome(valor)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(valor) => setEmail(valor)}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={senha}
              onChangeText={(valor) => setSenha(valor)}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.createButton}
              onPress={criarUsuario}
            >
              <Text style={styles.modalTitle}>Criar Usuario</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    color: "#ff4500",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#ffffff",
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: "#dddddd",
    borderRadius: 4,
  },
  createButton: {
    borderColor: "#ff4500",
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
