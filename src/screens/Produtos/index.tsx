import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker'; // dropdown
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import api from '../../api/api';


export type Produto = {
    id_produto: number,
    nome_produto: string,
    vinculo_imagem: string,
    id_categoria: number,
    data_vencimento: Date,
    valor_produto: number,
    quantidade_minima: number,
}

type Categoria = {
    id_categoria: number;
    nome_categoria: string;
    ativo: boolean;
}


// export default function Produtos() {

//     const produtos: Produto[] = [
//         { id: 1, nomeProduto: 'Hidratante', valor: 43, id_categoria: 1 },
//         { id: 2, nomeProduto: 'Desodorante', valor: 3, id_categoria: 1 },
//         { id: 3, nomeProduto: 'Mascara', valor: 22, id_categoria: 2 },
//         { id: 4, nomeProduto: 'Esmalte Rosa Risque', valor: 11.90, id_categoria: 3 },
//     ]

//     const [busca, setBusca] = useState('');
//     const produtosFiltrados = produtos.filter(produto =>
//         produto.nomeProduto.toLocaleLowerCase().startsWith(busca.toLowerCase())
//     );

//     const [modalVisible, setModalVisible] = useState(false);
//     const [excluir, setExcluir] = useState(false);
//     const [editar, setEditar] = useState(false);
//     const [salvar, setSalvar] = useState(false);


//     return (
//         <View style={styles.container}>
//             {/* <Text>Pagina de Produto</Text> */}
//             <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
//                 <Text style={{ color: 'white', fontSize: 16 }}>Novo</Text>
//             </TouchableOpacity>
//             <FlatList
//                 data={produtosFiltrados}

//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (


//                     <View style={styles.card}>

//                         <Text style={styles.nomeProduto}>{item.nomeProduto}</Text>
//                         <View >
//                             <View style={styles.precosContainer}>
//                                 <Text>Valor: </Text>
//                                 <Text style={styles.preco}>
//                                     R$ {item.valor.toFixed(2).replace('.', ',')}
//                                 </Text>
//                             </View>
//                             <View style={styles.precosContainer}>
//                                 <Text>Categoria: </Text>
//                                 <Text style={styles.nomeCategoria}>{item.id_categoria}</Text>

//                             </View>
//                         </View>
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

//                         <Text>Incluir Produto</Text>


//                         <View style={{ padding: 20, backgroundColor: '#F8F8F8' }}>
//                             <TextInput
//                                 placeholder='Insira o Nome do Produtor'
//                             />
//                         </View>
//                         <View style={{ padding: 20, backgroundColor: '#F8F8F8' }}>
//                             <TextInput
//                                 placeholder='Insira o Preco do Produto'
//                             />
//                         </View>
//                         <View style={{ padding: 20, backgroundColor: '#F8F8F8' }}>
//                             <TextInput
//                                 placeholder='Insira Categoria'
//                                 // value={busca}
//                                 // onChangeText={setBusca}
//                             />
//                         </View>

//                             <TouchableOpacity onPress={() => setSalvar(true)} style={styles.button}>
//                                 <Text style={{ color: 'white', fontSize: 16 }}>Salvar</Text>
//                             </TouchableOpacity>

//                         </View>
//                     </View>
//             </Modal>
//         </View>
//     );
// }


export default function ProdutoScreen() {

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [nomeProduto, setNomeProduto] = useState('');
    const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null)
    const [vinculoImagem, setVinculoImagem] = useState('');
    const [idCategoria, setIdCategoria] = useState('');
    const [dataVencimento, setDataVencimento] = useState('');
    const [valorProduto, setValorProduto] = useState('');
    const [quantidadeMinima, setQuantidadeMinima] = useState('');
    const [imagemUri, setImagemUri] = useState('');

    const [categorias, setCategorias] = useState<Categoria[]>([]);


    useEffect(() => {
        const setup = async () => {
            await loadData();
            await loadCategorias();

        }
        setup();
    }, [])

    async function loadData(): Promise<void> {
        try {
            const response = await api.get('/produtos');
            console.log(response.data);
            // setCategorias(response.data.recurso);
            setProdutos(response.data.resultadoSelecionaTodos);
            setModalVisible(false);
        } catch (error) {
            console.error(error);
        }

    }
    async function loadCategorias() {
        try {
            const response = await api.get('/categoriasAtiva');

            console.log(response.data);

            setCategorias(response.data.categorias);

        } catch (error) {
            console.log(error);
        }
    }

    async function selecionarImagem() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImagemUri(result.assets[0].uri);
            console.log("Imagem:", result.assets[0].uri);
        }
    }

    // async function salvar() {
    //     try {
    //         const imagemPadrao =
    //             'icon.png';

    //         const body = {
    //             nome_produto: nomeProduto,
    //             vinculo_imagem: vinculoImagem.trim() || imagemPadrao,
    //             id_categoria: Number(idCategoria),
    //             data_vencimento: dataVencimento,
    //             valor_produto: Number(valorProduto),
    //             quantidade_minima: Number(quantidadeMinima)
    //         };

    //         console.log("BODY ENVIADO:", body);

    //         if (selectedProduto) {
    //             const response = await api.patch(
    //                 `/produtos/${selectedProduto.id_produto}`,
    //                 body
    //             );

    //             console.log(response.data);
    //         } else {
    //             const response = await api.post('/produtos', body);

    //             console.log(response.data);
    //         }

    //         closeModal();
    //         await loadData();

    //     } catch (error: any) {
    //         console.log("ERRO:");
    //         console.log(error.response?.data);
    //         console.log(error.message);
    //     }
    // }
    async function salvar() {
        console.log("SALVAR CLICADO");
        console.log("selectedProduto:", selectedProduto);
        console.log("EDITANDO?", !!selectedProduto);
        console.log("ID:", selectedProduto?.id_produto);
        try {
            const formData = new FormData();

            formData.append('nome_produto', nomeProduto);
            formData.append('id_categoria', idCategoria);
            formData.append('data_vencimento', dataVencimento);
            formData.append('valor_produto', valorProduto);
            formData.append('quantidade_minima', quantidadeMinima);

            // só envia imagem se uma nova foi selecionada
            if (imagemUri) {
                formData.append(
                    'image',
                    {
                        uri: imagemUri,
                        name: 'produto.jpg',
                        type: 'image/jpeg',
                    } as any
                );
            }

            let response;

            if (selectedProduto) {
                console.log("PATCH");

                response = await api.patch(
                    `/produtos/${selectedProduto.id_produto}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

            } else {
                response = await api.post(
                    '/produtos',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
            }

            console.log(response.data);

            closeModal();
            await loadData();

        } catch (error: any) {
            console.log(error.response?.data);
            console.log(error.message);
        }
    }

    function openCreate(): void {
        setSelectedProduto(null);

        setNomeProduto('');
        setVinculoImagem('');
        setIdCategoria('');
        setDataVencimento('');
        setValorProduto('');
        setQuantidadeMinima('');

        setModalVisible(true);
    }


    function openEdit(item: Produto): void {
        setSelectedProduto(item);

        setNomeProduto(item.nome_produto);
        setIdCategoria(String(item.id_categoria));
        setDataVencimento(
            String(item.data_vencimento).split('T')[0]
        );
        setValorProduto(String(item.valor_produto));
        setQuantidadeMinima(String(item.quantidade_minima));

        // limpa a imagem nova
        setImagemUri('');

        setModalVisible(true);
    }

    function formatarData(data: string | Date) {
        return new Date(data).toLocaleDateString('pt-BR');
    }

    function closeModal(): void {
        setModalVisible(false);
        //   setSelectedProduto(null);

        setNomeProduto('');
        setVinculoImagem('');
        setIdCategoria('');
        setDataVencimento('');
        setValorProduto('');
        setQuantidadeMinima('');
    }

    async function handleDelete(id: number) {
        try {
            const response = await api.delete(`/produtos/${id}`);

            Alert.alert(
                'Sucesso',
                'Produto excluído com sucesso!'
            );

            await loadData();

        } catch (error: any) {

            if (error.response?.status === 400) {
                Alert.alert(
                    'Não foi possível excluir',
                    error.response.data.errorMessage
                );
                return;
            }

            Alert.alert(
                'Erro',
                'Ocorreu um erro ao excluir o produto.'
            );

            console.log(error.response?.data);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleScreen}>Gestão de PRODUTOS</Text>

                <TouchableOpacity style={styles.addButton} onPress={openCreate}>
                    <Text style={styles.addButtonText}>+ Nova</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={produtos}
                // keyExtractor={(item) => String(item.Id)}
                keyExtractor={(item) => String(item.id_produto)}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.sideBar} />

                        <View style={styles.cardInner}>
                            <View style={styles.cardContent}>
                                <View style={styles.cardContent}>

                                    <Image
                                        source={{
                                            uri: `http://10.87.169.83:8000/uploads/Images/${item.vinculo_imagem}`
                                        }}
                                        style={styles.imagemProduto}
                                    />

                                    <Text style={styles.title}>
                                        {item.nome_produto}
                                    </Text>

                                    <Text style={styles.title}>
                                        Categoria: {
                                            categorias.find(
                                                categoria => categoria.id_categoria === item.id_categoria
                                            )?.nome_categoria || 'Não encontrada'
                                        }
                                    </Text>

                                </View>
                                <Text style={styles.title}>{item.nome_produto}</Text>
                                <Text style={styles.title}>ID: {item.id_produto}</Text>
                                <Text style={styles.title}>Valor: {item.valor_produto}</Text>
                                <Text style={styles.title}>Qtd Minima: {item.quantidade_minima}</Text>
                                <Text style={styles.title}>Vencimento: {formatarData(item.data_vencimento)}</Text>
                                <Text style={styles.title}>
                                    Categoria: {
                                        categorias.find(
                                            categoria => categoria.id_categoria === item.id_categoria
                                        )?.nome_categoria || 'Categoria não encontrada'
                                    }
                                </Text>
                            </View>

                            <View style={styles.actions}>
                                <TouchableOpacity
                                    style={[styles.iconButton]}
                                    onPress={() => openEdit(item)}
                                >
                                    <Text style={styles.iconText}>✏️ Editar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.iconButton]}
                                    onPress={() => handleDelete(item.id_produto)}
                                >
                                    <Text style={styles.iconText}>🗑️ Excluir</Text>
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
                            {selectedProduto ? "Editar Produto" : "Novo Produto"}
                        </Text>


                        <TextInput
                            placeholder="Digite o nome"
                            value={nomeProduto}
                            onChangeText={setNomeProduto}
                            style={styles.input}
                        />

                        {/* <TextInput
                            placeholder="Link da imagem"
                            value={vinculoImagem}
                            onChangeText={setVinculoImagem}
                            style={styles.input}
                        /> */}

                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={selecionarImagem}
                        >
                            <Text style={{ color: '#fff' }}>
                                Selecionar Imagem
                            </Text>
                        </TouchableOpacity>
                        {/* <TextInput
                            placeholder="ID Categoria"
                            value={idCategoria}
                            onChangeText={setIdCategoria}
                            keyboardType="numeric"
                            style={styles.input}
                        /> */}
                        <View style={styles.input}>
                            <Picker
                                selectedValue={idCategoria}
                                onValueChange={(itemValue) => setIdCategoria(String(itemValue))}
                            >
                                <Picker.Item
                                    label="Selecione uma categoria"
                                    value=""
                                />

                                {categorias.map((categoria) => (
                                    <Picker.Item
                                        key={categoria.id_categoria}
                                        label={categoria.nome_categoria}
                                        value={String(categoria.id_categoria)}
                                    />
                                ))}
                            </Picker>
                        </View>

                        <TextInput
                            placeholder="Data Vencimento (2026-12-31)"
                            value={dataVencimento}
                            onChangeText={setDataVencimento}
                            style={styles.input}
                        />

                        <TextInput
                            placeholder="Valor Produto"
                            value={valorProduto}
                            onChangeText={setValorProduto}
                            keyboardType="numeric"
                            style={styles.input}
                        />

                        <TextInput
                            placeholder="Quantidade Mínima"
                            value={quantidadeMinima}
                            onChangeText={setQuantidadeMinima}
                            keyboardType="numeric"
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
        backgroundColor: "#FF9800", // laranja 🍊
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
    imagemProduto: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginBottom: 12,
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



