import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, ColorValue, Dimensions } from 'react-native';
import Orientation from 'react-native-orientation-locker';

const windowWidth = Dimensions.get('window').width;
const getFontSize = (baseFontSize) => {
    const scaleFactor = windowWidth / 375; // 375 é a largura de referência
    const adjustedFontSize = Math.round(baseFontSize * scaleFactor);
    return adjustedFontSize;
};

const Home = ({ navigation }) => {

    const [nomeAluno, setNomeAluno] = useState('');
    const [saldoAluno, setSaldoAluno] = useState('');


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
                        <Text style={styles.headerText}>Poupancinha do:</Text>
                        <Text style={styles.headerName}>Nome do usuário</Text>
                    </View>
                </View>
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>Saldo disponível:</Text>
                    <Text style={styles.balanceAmount}>R$ Pegar valor api</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Extrato')}>
                        <Text style={styles.buttonText1}>Extrato</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Loja')}>
                        <Text style={styles.buttonText2}>Compras</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button3} onPress={() => navigation.navigate('Jogos')}>
                        <Text style={styles.buttonText3}>Jogos</Text>
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
});

export default Home;
