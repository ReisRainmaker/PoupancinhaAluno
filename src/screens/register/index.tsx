import { useState } from "react";
import { View, Text, ImageBackground, StyleSheet, Dimensions, TextInput, TouchableOpacity, ColorValue, Button } from "react-native"
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as SecureStore from 'expo-secure-store'
import axiosConfig from "../../config/axios";
import firebaseApp from "../../config/firebase";
import { createUserWithEmailAndPassword, initializeAuth } from 'firebase/auth'
import { SafeAreaView } from "react-native-safe-area-context";


const windowWidth = Dimensions.get('window').width;
const getFontSize = (baseFontSize) => {
    const scaleFactor = windowWidth / 375; // 375 é a largura de referência
    const adjustedFontSize = Math.round(baseFontSize * scaleFactor);
    return adjustedFontSize;
};



const Register = ({ navigation }) => {

    const [resultado, setResultado] = useState('Informe seus dados');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimanto] = useState(new Date(1598051730000));
    const [senha, SetSenha] = useState('');
    const [repitaSenha, SetRepitaSenha] = useState('');
    const [turma, setTurma] = useState('Teste');
    const [open, setOpen] = useState(false)

    const criarConta = async () => {
        if (nome == '' || sobrenome == '' || email == '' || senha == '' || repitaSenha == '' || turma == '') {
            setResultado('Preencha todos os campos corretamente');
            return
        } else if (senha != repitaSenha) {
            setResultado('As senhas digitadas estão diferentes')
            return
        } else if (senha.length > 6) {
            setResultado('A senhadeve ter mais de 6 digitos')
            return
        }else {
            try {
                const response = await axiosConfig.post('auth/register', {
                    name: nome,
                    sobreNome: sobrenome,
                    email: email,
                    dataNascimento: dataNascimento,
                    senha: senha,
                    turma: turma,
                    tipoUsuario: 'Aluno',
                });

                // Verifique a resposta da API 
                if (response.data) {
                    setResultado('Conta criada com sucesso.');
                    const auth = initializeAuth(firebaseApp)
                    createUserWithEmailAndPassword(auth, email, senha)
                        .then((resposta) => {
                            console.log(resposta.user)
                            SecureStore.setItemAsync('token', resposta.user.uid)
                            navigation.navigate('Minha Poupancinha')
                        }).catch((error) => {
                            console.log(error)
                            setResultado('Falha ao cadastrar login. Verifique seus dados e tente novamente')
                        })

                }
            } catch (error) {
                // Em caso de erro
                console.error('Erro ao criar a conta:', error);
                setResultado('Erro ao criar a conta. Verifique seus dados e tente novamente.');
            }

        }
    };



    ///////////// Configurações date Piker /////////////
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDataNascimanto(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: dataNascimento,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };
    const showDatepicker = () => {
        showMode('date');
    };


    return (
        <ImageBackground
            source={require('../../images/cedulas.jpg')}
            style={styles.container}
        >
            <SafeAreaView style={styles.card}>
                <Text style={styles.title}>Digite suas informações</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    onChangeText={(text) => setNome(text)}
                    value={nome}></TextInput>

                <TextInput
                    style={styles.input}
                    placeholder="Sobrenome"
                    onChangeText={(text) => setSobrenome(text)}
                    value={sobrenome}></TextInput>
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    onChangeText={(text) => setEmail(text)}
                    value={email}></TextInput>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Senha"
                    onChangeText={(text) => SetSenha(text)}
                    value={senha}></TextInput>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Repita a senha"
                    onChangeText={(text) => SetRepitaSenha(text)}
                    value={repitaSenha}></TextInput>
                <TextInput
                    style={styles.input}
                    placeholder="Turma"
                    onChangeText={(text) => setTurma(text)}
                    value={turma}></TextInput>

                <TouchableOpacity style={styles.buttonDate} onPress={showDatepicker} >
                    <Text style={styles.buttonTextDate}>Data de nascimento:</Text>
                    <Text style={styles.buttonTextDate}>{dataNascimento.toLocaleString('pt-BR')}</Text>
                </TouchableOpacity>

                <Text style={styles.textResultado}>{resultado}</Text>

                <TouchableOpacity style={styles.buttonCriar} onPress={criarConta} >
                    <Text style={styles.buttonTextCriar}>Criar Conta</Text>
                </TouchableOpacity>
            </SafeAreaView>
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
    card: {
        backgroundColor: baseColor[1],
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    title: {
        fontSize: getFontSize(24),
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        fontSize: getFontSize(16),
        
    },

    buttonDate: {
        backgroundColor: baseColor[3],
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonTextDate: {
        color: 'black',
        fontSize: getFontSize(14),
        textAlign: 'center',
    },

    buttonCriar: {
        backgroundColor: baseColor[5],
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonTextCriar: {
        color: 'white',
        fontSize: getFontSize(22),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textResultado: {
        fontSize: getFontSize(16),
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default Register;
