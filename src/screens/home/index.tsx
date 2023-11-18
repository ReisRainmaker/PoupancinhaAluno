import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, ColorValue, Dimensions } from 'react-native';
import axiosConfig from '../../config/axios';

const windowWidth = Dimensions.get('window').width;
const getFontSize = (baseFontSize) => {
    const scaleFactor = windowWidth / 375; // 375 é a largura de referência
    const adjustedFontSize = Math.round(baseFontSize * scaleFactor);
    return adjustedFontSize;
};


const Home = ({ navigation, route }) => {

    const { email } = route.params;
    const [userData, setUserData] = useState(null);
    const [alunoData, setAlunoData] = useState(null);
    const [contaData, setContaData] = useState(null);
    const [nomeAluno, setNomeAluno] = useState('');
    const [saldoAluno, setSaldoAluno] = useState(null);

    /////////////////////// Use efect do Get Usuário /////////////////////////
    useEffect(() => {
        const getUserByEmail = async () => {
            if (email) {
                const response = await axiosConfig.get(`homeAluno/user/${email}`)
                    .then((response) => {
                        const data = response.data;
                        setUserData(data);
                        setNomeAluno(data.nome)
                        console.log("Retorno do usuário", response.data)
                    }).catch((error) => {
                        console.error('Erro ao buscar informações do Usuário:', error);
                    })
            }
        }
        if (!userData) {
            getUserByEmail();

        }
    }, [email, userData, nomeAluno]);

    /////////////////////// Use efect do Get Aluno /////////////////////////
    useEffect(() => {
        const getAlunoByUser = async () => {
            if (userData) {
                //console.log("entra no if da segunda chamada")
                const response = await axiosConfig.get(`homeAluno/aluno/${userData.id}`)
                    .then((response) => {
                        const data = response.data;
                        setAlunoData(data);
                        console.log("Retorno do Aluno", response.data)
                    }).catch((error) => {
                        console.error('Erro ao buscar informações do Aluno:', error);
                    })
            }
        }
        if (userData && !alunoData) {
            getAlunoByUser();
        }
    }, [userData, alunoData]);
    /////////////////////// Use efect do Get Conta /////////////////////////
    useEffect(() => {
        const getContaByAluno = async () => {
            if (alunoData) {
                const response = await axiosConfig.get(`homeAluno/conta/${alunoData.idAluno}`)
                    .then((response) => {
                        const data = response.data;
                        setContaData(data);
                        setSaldoAluno(data.saldoAtual.toFixed(2))
                        console.log("Retorno da conta", response.data)
                    }).catch((error) => {
                        console.error('Erro ao buscar informações da conta:', error);
                    })
            }
        }
        if (!contaData && alunoData) {
            getContaByAluno();
        }
    }, [alunoData, contaData, saldoAluno]);

    return (
        <ImageBackground
            source={require('../../images/cedulas.jpg')}
            style={styles.container}
        >
            <View>
                <View style={styles.header}>
                    <Image
                        source={require('../../images/imagecharacter/boy.jpg')}
                        style={styles.logo}
                    />
                    <View>
                        <Text style={styles.headerText}>Poupancinha de</Text>
                        <Text style={styles.headerName}>{nomeAluno}</Text>
                    </View>
                </View>
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>Saldo disponível:</Text>
                    <Text style={styles.balanceAmount}>R$ {saldoAluno}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Extrato', {conta: contaData})}>
                        <Text style={styles.buttonText1}>Extrato</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Loja')}>
                        <Text style={styles.buttonText2}>Compras</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button3} onPress={() => navigation.navigate('Jogos')}>
                        <Text style={styles.buttonText3}>Jogos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button4} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonText4}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>

    );
};
const baseColor: ColorValue[] = ['#ACBFC5', '#578EA2', '#B8D4DB', '#CDD3AD', '#8EB282', '#EAC376', '#D2996E'];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "5%",

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 20,
        backgroundColor: baseColor[4],
        marginHorizontal: '5%',
        padding: 10,
    },
    headerTextContainer: {
        flexDirection: 'column',
    },
    headerText: {
        fontSize: getFontSize(20),
        fontWeight: '700',
        color: 'white',
    },
    headerName: {
        fontSize: getFontSize(25),
        fontWeight: 'bold',
        color: 'white',
    },
    logo: {
        height: '85%',
        width: '17%',
        overflow: 'hidden',
        borderRadius: 50,
    },
    balanceContainer: {
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: baseColor[2],
        width: '80%',
        borderRadius: 20,
        alignSelf: 'center',

    },
    balanceLabel: {
        fontSize: getFontSize(20),
        color: 'white',
        marginBottom: 20,
        textShadowColor: baseColor[4],
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 4,
    },
    balanceAmount: {
        fontSize: getFontSize(29),
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
        textShadowColor: baseColor[4],
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 4,
    },
    buttonsContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    button1: {
        backgroundColor: baseColor[1],
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
        width: '80%'
    },
    buttonText1: {
        color: 'white',
        fontSize: getFontSize(15),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button2: {
        backgroundColor: baseColor[5],
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
        width: '80%'
    },
    buttonText2: {
        color: 'white',
        fontSize: getFontSize(15),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button3: {
        backgroundColor: baseColor[6],
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
        width: '80%'
    },
    buttonText3: {
        color: 'white',
        fontSize: getFontSize(15),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button4: {
        backgroundColor: baseColor[3],
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
        width: '80%'
    },
    buttonText4: {
        color: 'white',
        fontSize: getFontSize(15),
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Home;
