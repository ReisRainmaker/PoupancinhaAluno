import { Button, Card, Icon } from "@rneui/base";
import { useEffect, useState } from "react";
import { View, Text, ImageBackground, StyleSheet, Dimensions, Image, ScrollView, ColorValue } from "react-native"
import axiosConfig from "../../config/axios";

const windowWidth = Dimensions.get('window').width;
const getFontSize = (baseFontSize) => {
    const scaleFactor = windowWidth / 375; // 375 é a largura de referência
    const adjustedFontSize = Math.round(baseFontSize * scaleFactor);
    return adjustedFontSize;
};

const Shop = ({ Navigation, route }) => {

    const { aluno } = route.params;
    const [professor, setProfessor] = useState(null)
    const [userProfessor, setUserProfessor] = useState(null)
    const [produtos, setProdutos] = useState([])
    const produtoSemDescricao = "Sem descrição especifica"

    //////////// Pegar o professor pelo idTurma no aluno ////////////
    useEffect(() => {
        const getProfessorByTurma = async () => {
            try {
                if (aluno) {
                    const response = await axiosConfig.get(`professor/byTurma/${aluno.idTurma}`);
                    const data = response.data;
                    setProfessor(data);
                    console.log("Retorno do professor", response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar Professor:', error);
            }
        };

        getProfessorByTurma();
    }, [aluno]);

    //////////// pegar os produtos pelo id do professor
    useEffect(() => {
        const getProdutoByProfessor = async () => {
            try {
                if (professor) {
                    const response = await axiosConfig.get(`produto/byProfessor/${professor.idProfessor}`);
                    const data = response.data;
                    setProdutos(data);
                    console.log("Retorno de produtos", response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar Produtos:', error);
            }
        };

        getProdutoByProfessor();
    }, [professor]);
    // //////////// Pegar nome do professor pelo idUser do professor
    // useEffect(() => {
    //     const getProfessorUser = async () => {
    //         try {
    //             if (professor) {
    //                 const response = await axiosConfig.get(`home/idUser/${professor.idUser}`);
    //                 const data = response.data;
    //                 setUserProfessor(data);
    //                 console.log("Retorno do usuário Professor", response.data);
    //             }
    //         } catch (error) {
    //             console.error('Erro ao buscar usuário do professor:', error);
    //         }
    //     };

    //     getProfessorUser();
    // }, [professor]);


    return (
        <ImageBackground
            source={require('../../images/cedulas.jpg')}
            style={styles.container}
        >
            <ScrollView style={styles.fundoScroll}>
                <Text style={styles.textTitle}>Lojinha da turma </Text>


                {
                    produtos.length <= 0 && (
                        <View style={styles.linhasTableInicial}>
                            <Text>Nenhum produto a venda ainda...</Text>
                        </View>
                    )
                }
                {
                    produtos.map((produtoItem) => (
                        <View key={produtoItem.idProduto} style={styles.cardContainer}>
                            <Card.Title
                                style={{ fontSize: getFontSize(30) }}
                            >{produtoItem.nome}</Card.Title>
                            <Card.Divider />
                            <Card.Image
                                style={{ 
                                    padding: 0 ,
                                    height: 200
                                }}
                                source={{
                                    uri:
                                        produtoItem.imagem,
                                }}
                            />
                            <Text style={{
                                marginBottom: 10,
                                fontSize: getFontSize(25),
                                textAlign: 'center'
                            }}>
                                R$ {produtoItem.preco}
                            </Text>
                            <Text style={{
                                marginBottom: 10,
                                fontSize: getFontSize(15),
                                textAlign: 'center'
                            }}>
                                {produtoItem.descricao === null || produtoItem.descricao === "" ? produtoSemDescricao : produtoItem.descricao}
                            </Text>
                            <Button

                                buttonStyle={{
                                    borderRadius: 8,
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginBottom: 0,
                                }}
                                title="COMPRAR"
                            />
                        </View>
                    ))
                }
            </ScrollView>

        </ImageBackground>
    )
}
const baseColor: ColorValue[] = ['#ACBFC5', '#578EA2', '#B8D4DB', '#CDD3AD', '#8EB282', '#EAC376', '#D2996E'];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    linhasTableInicial: {
        alignSelf: "center",
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        minWidth: '96%',
        maxWidth: '98%',
        backgroundColor: baseColor[5],/////////////////  Mudar /////////////////
        margin: 2,
        padding: 10,
        borderRadius: 10,
    },
    textTitle: {
        fontSize: getFontSize(50),
        fontWeight: '700',
        color: '#EEEEEE',//////////////////    Mudar    /////////////////////
        backgroundColor: baseColor[5],//////////////////    Mudar    /////////////////////
        borderRadius: 14,
        alignSelf: 'center',
        width: '96%',
        textAlign: 'center'
    },
    fundoScroll: {
        width: '100%'
    },
    cardContainer: {
        borderRadius: 14,
        backgroundColor: baseColor[6],
        padding: 15,
        marginTop: 15,

    },
});


export default Shop;

