import { StatusBar } from "expo-status-bar";
import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
export default function App() {
  const url = "http://10.112.240.199:30000/usuarios";
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [upadateModalVisible, setUpdateModalVisible] = useState(false)
  const [selectUser, setSelectUSer] = useState(null)


  const pegarUsuarios = async () => {
    axios
      .get(url)
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => console.log(error));
  };

  const limparCampos = () => {
    setNome("")
    setEmail("")
    setSenha("")
  }

  const auxiliadorDeDeletacao = (id) => {
    Alert.alert(
      'Confimer',
      'Tem certeza que deseja excluir esse Usuario?',
      [{
        text: 'Sim',
        onPress: () => deletarUsuario(id)
      },
      {
        text: 'não',
        style: 'cancel'
      }
      ]
    )
  }

  const deletarUsuario = (id) => {
    axios.delete(`${url}/${id}`)
      .then(() => {
        const usuariosAtualizados = usuarios.filter((usuario) => usuario.id !== id)
        setUsuarios(usuariosAtualizados)
      })
      .catch((errors) => { console.log(errors) })
  }



  const criarNovoUsuario = () => {
    axios.post(url, {
      name: nome,
      email: email,
      password: senha
    })
      .then(resposta => {
        console.log(resposta.data)
        pegarUsuarios()
        setModalVisible(false)
        limparCampos()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const autalilzarUser = (usuarioAutualizado) => {
    const data = {
      name: nome || usuarioAutualizado.nome,
      email: email || usuarioAutualizado.email,
      password: senha || usuarioAutualizado.password
    }

    axios.put(`${url}/${usuarioAutualizado.id}`, data)
      .then((responsta) => {
        console.log(responsta.data);
        setUsuarios(
          usuarios.map((item) => {
            if (item.id === usuarioAutualizado.id) {
              return {
                ...item,
                name: data.name,
                email: data.email

              }
            }
            return item
          })
        )
        setUpdateModalVisible(false)
        setNome("")
        setEmail("")
      })
      .catch((errors) => {
        console.log(errors)
      })
  }

  useEffect(() => {
    pegarUsuarios();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemEmail}>{item.email}</Text>
      <TouchableOpacity
        onPress={() => {
          setUpdateModalVisible(true)
          setSelectUSer(item)
          setNome(item.name)
          setEmail(item.email)
        }}
      >
        <Feather name='edit' size={24} color={"#888"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => auxiliadorDeDeletacao(item.id)}>
        <Feather name='trash' size={24} color="#888" />
      </TouchableOpacity>
    </View>
  );






  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Adicionar Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={text => setNome(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TouchableOpacity style={styles.button} onPress={criarNovoUsuario}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={setModalVisible(false)}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        visible={upadateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Atualizar Usuario</Text>
            <TextInput
              style={styles.input}
              placeholder="nome"
              value={nome}
              onChangeText={text => setNome(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                autalilzarUser(selectUser)
              }}
            >
              <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText} onPress={() => {
                setUpdateModalVisible(false)
                limparCampos()
              }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.headerText}>Usuarios</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>


      <FlatList
        data={usuarios}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  header:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:20,
  },
  headerText:{
    fontSize:24,
    fontWeight:"bold",
    
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
    backgroundColor: 'blue',
    // width: 60,
    // height: 60,
    // borderRadius: 30,
    // alignItems: "center",
    // justifyContent: "center",
    // position: "absolute",
    // bottom: 20,
    // right: 20,
    // elevation: 5,
    padding:10,
    borderRadius:5,
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
