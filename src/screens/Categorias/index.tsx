import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import api from '../../api/api';

interface Categoria {
  id_categoria: number;
  nome_categoria: string;
  ativo: boolean;
}

export default function CategoriaScreen() {

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeCategoria, setNomeCategoria] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null)

  // const categoriaRepo = new CategoriaRepository();

  useEffect(() => {
    const setup = async () => {
     await loadData();
    }
    setup();
  }, [])

  async function loadData(): Promise<void> {
    try {
          const response = await api.get('/categorias');
          console.log(response.data);
          // setCategorias(response.data.recurso);
          setCategorias(response.data.resultadoSelecionaTodos);
          setModalVisible(false);
    } catch (error) {
      console.error(error);
    }

  }

  // async function salvar() {
  //   if (!nomeCategoria.trim()) return;
  //   if (selectedCategoria) {
  //     //  await categoriaRepo.update(new Categoria(nomeCategoria, selectedCategoria.Id))
  //     // Instrução para update
  //   } else {
  //     //  await categoriaRepo.create(new Categoria(nomeCategoria, 0));
  //   }
  //   closeModal();
  //   await loadData();
  // }

  
  async function salvar() {
    if (!nomeCategoria.trim()) {Alert.alert('Atenção', 'Informe o nome da categoria.');return;}
    let response;
    if (selectedCategoria) {
        response = await api.patch(`/categorias/${selectedCategoria.id_categoria}`, {nome_categoria: nomeCategoria});
    } else {
        response = await api.post(`/categorias/`, {nome_categoria: nomeCategoria});
    }
    Alert.alert(response.data.message);
    closeModal();
    await loadData();
  }

    function openCreate(): void {
    setSelectedCategoria(null);
    setNomeCategoria('');
    setModalVisible(true);
}
    // function openEdit(item: Categoria): void {
    //     setSelectedCategoria(item);
    //     setNomeCategoria(item.Nome);
    //     setModalVisible(true);
    // }

    function openEdit(item: Categoria): void {
      setSelectedCategoria(item);
      setNomeCategoria(item.nome_categoria);
      setModalVisible(true);
    }

    function closeModal(): void{
        setModalVisible(false);
        // setSelectedCategoria(null);
        setNomeCategoria('')
    }

    // async function handleDelete(id:number): Promise<void> {
    //     Alert.alert(
    //         "Excluir",
    //         "Tem certeza que deseja excluir esta categoria",
    //         [
    //             {text: "CAncelar"},
    //             {text: "Excluir"}
    //         ]
    //     )
    // }

  //    async function handleDelete(id:number) {
  //   Alert.alert(
  //     "Excluir",
  //     "Tem certeza que deseja excluir esta categoria?",
  //     [
  //       {text: "Cancelar"},
  //       {
  //         text: "Excluir",
  //         onPress: async() => {
  //           // await categoriaRepo.delete(id);
  //           await loadData();
  //         },
  //       },
  //     ]
  //   );
  // }

  async function handleDelete(item: Categoria) {

    await api.patch(`/categorias/${item.id_categoria}`, {
      ativo: !item.ativo
    });

    await loadData();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleScreen}>Gestão de categorias</Text>

        <TouchableOpacity style={styles.addButton} onPress={openCreate}>
          <Text style={styles.addButtonText}>+ Nova</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={categorias}
        // keyExtractor={(item) => String(item.Id)}
        keyExtractor={(item) => String(item.id_categoria)}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.sideBar} />

            <View style={styles.cardInner}>
              <View style={styles.cardContent}>
                <Text style={styles.title}>ID: {item.id_categoria}</Text>
                <Text style={styles.title}>Categoria: {item.nome_categoria}</Text>
                <Text style={styles.title}>{item.ativo ? 'Ativo' : 'Desativado'}</Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.iconButton]}
                  onPress={() => openEdit(item)}
                >
                  <Text style={styles.iconText}>✏️ Editar</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  style={[styles.iconButton]}
                  onPress={() => handleDelete(item.Id)}
                >
                  <Text style={styles.iconText}>🗑️ Desativar/Ativar</Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleDelete(item)}
                >
                  <Text style={styles.iconText}>
                    {item.ativo ? "🗑️ Desativar" : "✅ Ativar"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            <Text style={styles.modalTitle}>
              {selectedCategoria ? "Editar Categoria" : "Nova Categoria"}
            </Text>


            <TextInput
              placeholder="Digite o nome"
              value={nomeCategoria}
              onChangeText={setNomeCategoria}
              style={styles.input}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={closeModal}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={salvar}
              >
                <Text style={{ color: "#fff" }}>Salvar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </View >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6'
  },
  sideBar: {
    width: 6,
    backgroundColor: "#541414", 
  },

  cardInner: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  titleScreen: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },

  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  card: {
    flexDirection: 'row',
    width: '95%',
    backgroundColor: "#ffffff",
    borderRadius: 12,
    // padding: 0,
    marginTop: 12,
    marginHorizontal: 10,
    overflow: 'hidden',

    // sombra iOS
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    // sombra Android
    elevation: 4,
  },

  cardContent: {
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: 'center',
    gap: 20
  },

  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  editButton: {
    backgroundColor: "#2196F3",
    marginRight: 6,
  },

  deleteButton: {
    backgroundColor: "#F44336",
    marginLeft: 6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 8,
  },

  cancelButton: {
    backgroundColor: "#eee",
  },

  saveButton: {
    backgroundColor: "#4CAF50",
  },
  iconButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
  },

  iconText: {
    fontSize: 14,
    fontWeight: "600",
  },

});
































































































// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, TouchableOpacity, FlatList, View, Image, TextInput, Modal, Pressable } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../../../App";
// import { useEffect, useState } from "react";
// import { initDB } from "../../database/database";
// // import {  } from "react-native/types_generated/index";
// import { CategoriaRepository } from "../../repositories/CategoriaRepository";
// import { Categoria } from "../../models/Categoria";

// export type Categorias = {
//     id: number,
//     categoria: string
// }

// type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Produtos'>;

// export default function Categorias() {

//     const [categorias1, setCategorias] = useState(Categoria[]>([]));
//     const [modalVisible, setModalVisible] = useState(false);
//     const [nomeCategoria, setNomeCategoria] = useState('');
    

//     const categoriaRepo = new CategoriaRepository();

//     // executa logo qundo carrega
//     useEffect(() =>{
//         const setup = async () => {
//             await initDB();
//             loadData();
//         }
//         setup();
//     },[])
    
//     async function loadData(): Promise<void> {
//         const data = await categoriaRepo.findAll();
//         setCategorias(data);
//         setModalVisible(false);
//     }

//     async function Salvar() {
//         if(!nomeCategoria.trim()) return
//         if (selectedCategoria) {

//         }else {
//             categoriaRepo.create(new Categoria(nomeCategoria, 0));
//         }
//     }

//     const categorias: Categorias[] = [
//         { id: 1, categoria: 'Corporal' },
//         { id: 2, categoria: 'Facial' },
//         { id: 3, categoria: 'Unhas' }
//     ]
//     const navigation = useNavigation<NavigationProps>();


//     const [busca, setBusca] = useState('');
//     const categoriasFiltrados = categorias.filter(categoria =>
//         categoria.categoria.toLocaleLowerCase().startsWith(busca.toLowerCase())
//     );


//     const [excluir, setExcluir] = useState(false);
//     const [editar, setEditar] = useState(false);
//     const [salvar, setSalvar] = useState(false);


//     return (
//         <View style={styles.container}>
//             {/* <Text>Pagina de Produto</Text> */}
//             <View style={styles.novo}>
//                 <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.buttonMais}>
//                     <Text style={{ color: 'white', fontSize: 16 }}>+</Text>
//                 </TouchableOpacity>
//             </View>
//             <FlatList
//                 data={categoriasFiltrados}

//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <View style={styles.card}>
//                         <Text style={styles.nomeProduto}>{item.categoria}</Text>
//                         <View style={styles.buttonExcluir}>
//                             <TouchableOpacity onPress={() => setExcluir(true)} style={styles.button}>
//                                 <Text style={{ color: 'white', fontSize: 16 }}>Excluir</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity onPress={() => setEditar(true)} style={styles.button}>
//                                 <Text style={{ color: 'white', fontSize: 16 }}>Editar</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>

//                 )}
//             />

//             <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} animationType='fade' transparent={true}>
//                 <View style={styles.overlay}>
//                     <View style={styles.modalBox}>
//                         <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton} >
//                             <Text>X</Text>
//                         </Pressable>

//                         <Text>Incluir Categoria</Text>


//                         <View style={{ padding: 20, backgroundColor: '#F8F8F8' }}>
//                             <TextInput
//                                 placeholder='Insira o Nome da Categoria'
//                             />
//                         </View>

//                         <TouchableOpacity onPress={() => setSalvar(true)} style={styles.button}>
//                             <Text style={{ color: 'white', fontSize: 16 }}>Salvar</Text>
//                         </TouchableOpacity>

//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         backgroundColor: '#541414',

//         // alignItems: "center",
//         // justifyContent: "center"
//     },
//     textBusca: {
//         borderRadius: 25,
//         backgroundColor: '#FFF',
//         padding: 15,
//         alignItems: 'center',
//         elevation: 2
//     },
//     imagem: {
//         width: 100,
//         height: 100,
//         marginBottom: 10,
//         resizeMode: 'contain'
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 15,
//         padding: 20,
//         marginBottom: 15,
//         alignItems: 'center',
//         justifyContent: 'center',

//         // sombra android
//         elevation: 1,

//         // sombra ios
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 6,
//         shadowOffset: { width: 0, height: 3 }
//     },
//     nomeProduto: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         textAlign: 'center'
//     },
//     precosContainer: {
//         flexDirection: 'row',
//         margin: 15,
//     },
//     precoParcelado: {
//         color: '#777',
//         fontSize: 14
//     },
//     precoAvista: {
//         color: '#2E7D32',
//         fontSize: 16,
//         fontWeight: 'bold'
//     },
//     acoesContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 15,
//         justifyContent: 'space-between',
//         width: '100%'
//     },
//     qtdContainer: {
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     buttonQtd: {
//         backgroundColor: '#EEE',
//         paddingHorizontal: 10,
//         paddingVertical: 10,
//         borderRadius: 5
//     },
//     quantidade: {
//         marginHorizontal: 10,
//         fontSize: 16,
//         fontWeight: 'bold'
//     },
//     buttonAddCaarrinho: {
//         backgroundColor: '#6200EE',
//         paddingHorizontal: 15,
//         paddingVertical: 8,
//         borderRadius: 8,
//         width: '50%',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     textAddCarrinho: {
//         color: '#fff',
//         fontWeight: 'bold'
//     },
//     overlay: {
//         flex: 1,
//         backgroundColor: "rgba(0,0,0,0.4)",
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     modalBox: {
//         width: "80%",
//         backgroundColor: "white",
//         padding: 20,
//         borderRadius: 12,
//         alignItems: "center"
//     },
//     closeButton: {
//         position: "absolute",
//         top: 0,
//         right: 0,
//         width: 35,
//         height: 35,
//         borderRadius: 5,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     buttonExcluir: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//         marginTop: 10
//     },
//     button: {
//         backgroundColor: '#541414',
//         padding: 10,
//         borderRadius: 8,
//         width: '45%',
//         alignItems: 'center',
//         marginTop: 10,
//     },
//     buttonMais: {
//         backgroundColor: '#000',
//         borderRadius: 20,
//         width: '20%',
//         alignItems: 'center',
//         marginTop: 10,

//     },
//     novo: {
//         alignContent: 'flex-end',
//         justifyContent: 'flex-end'
//     }


// })