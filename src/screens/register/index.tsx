import { useState } from "react";
import { View, Text, ImageBackground, StyleSheet, Dimensions, TextInput, TouchableOpacity, ColorValue } from "react-native"
import axiosConfig from "../../config/axios";

const windowWidth = Dimensions.get('window').width;
const getFontSize = (baseFontSize) => {
    const scaleFactor = windowWidth / 375; // 375 é a largura de referência
    const adjustedFontSize = Math.round(baseFontSize * scaleFactor);
    return adjustedFontSize;
};



const Register = ({ Navigation }) => {

    const [resultado, setResultado] = useState('Informe seus dados');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimanto] = useState('');
    const [senha, SetSenha] = useState('');
    const [turma, setTurma] = useState('Teste');
    const [tipoUser, setTipoUser] = useState('Aluno');

    const criarConta = async () => {
        try {
          const response = await axiosConfig.post('auth/register', {
            name: nome,
            sobreNome: sobrenome,
            email: email,
            dataNascimento: dataNascimento,
            senha: senha,
            turma: turma,
            tipoUsuario: tipoUser, 
          });
    
          // Verifique a resposta da API 
          if (response.data) {
            setResultado('Conta criada com sucesso.');
            
            Navigation.navigate('Minha Poupancinha');
          }
        } catch (error) {
          // Em caso de erro
          console.error('Erro ao criar a conta:', error);
          setResultado('Erro ao criar a conta. Verifique seus dados e tente novamente.');
        }
      };

    return (
        <ImageBackground
            source={require('../../images/cedulas.jpg')}
            style={styles.container}
        >
            <View style={styles.card}>
                <Text style={styles.title}>Digite suas informações</Text>
                <TextInput style={styles.input} placeholder="Nome"></TextInput>
                <TextInput style={styles.input} placeholder="Sobrenome"></TextInput>
                <TextInput style={styles.input} placeholder="E-mail"></TextInput>
                <TextInput style={styles.input} placeholder="Data de nascimento"></TextInput>
                <TextInput style={styles.input} secureTextEntry={true} placeholder="Senha"></TextInput>
                <TextInput style={styles.input} secureTextEntry={true} placeholder="Repita a senha"></TextInput>
                <TextInput style={styles.input} placeholder="Turma"></TextInput>
                <Text>{resultado}</Text>
                <TouchableOpacity style={styles.buttonCriar} onPress={criarConta} >
                    <Text style={styles.buttonTextCriar}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
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
        height: 40,
        padding: 10,
        marginBottom: 10,
    },
    buttonCriar: {
        backgroundColor: baseColor[5],
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonTextCriar: {
        color: 'white',
        fontSize: getFontSize(18),
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Register;
