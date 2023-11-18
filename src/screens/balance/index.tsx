import { useEffect, useState } from "react";
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native"
import axiosConfig from "../../config/axios";
import { format } from 'date-fns';

const windowWidth = Dimensions.get('window').width;
const getFontSize = (baseFontSize) => {
    const scaleFactor = windowWidth / 375; // 375 é a largura de referência
    const adjustedFontSize = Math.round(baseFontSize * scaleFactor);
    return adjustedFontSize;
};

const Balance = ({ Navigation, route }) => {

    const { conta } = route.params;
    const [movimentacoesConta, setMovimentacoesConta] = useState([])
    const [showDetails, setShowDetails] = useState([]);
    const descricaoNull = "Sem descrição específica"

    /////// fazer um Get movimentações by idConta por: /movimentacao/getByConta/:idConta
    useEffect(() => {
        const getUserByEmail = async () => {
            try {
                if (conta) {
                    const response = await axiosConfig.get(`movimentacao/getByConta/${conta.idConta}`);
                    const data = response.data;
                    setMovimentacoesConta(data);
                    console.log("Retorno das movimentações", response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar informações das movimentações:', error);
            }
        };

        getUserByEmail();
    }, [conta]);
    const toggleDetails = (movimentacaoItemId) => {
        setShowDetails((prevDetails) => {
            return { ...prevDetails, [movimentacaoItemId]: !prevDetails[movimentacaoItemId] };
        });
    };
    /*
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    */
    return (
        <ImageBackground
            source={require('../../images/cedulas.jpg')}
            style={styles.container}
        >
            <ScrollView>
                <View style={styles.containerInterno}>
                    <View style={styles.containerSaldo}>
                        <Text style={styles.textSaldoTitle}>Saldo atual:</Text>
                        <Text style={styles.textSaldoValor}>R$ {conta.saldoAtual}</Text>
                    </View>
                    {
                        movimentacoesConta.length <= 0 && (
                            <View style={styles.linhasTableInicial}>
                                <Text>Nenhuma movimentação na conta ainda.</Text>
                            </View>
                        )
                    }
                    {movimentacoesConta.map((movimentacaoItem) => (
                        <View key={movimentacaoItem.idMovimentacao}>
                            <TouchableOpacity onPress={() => toggleDetails(movimentacaoItem.idMovimentacao)}>
                                <View style={styles.linhasTableInicial}>
                                    <Text style={styles.textTable}>{format(new Date(movimentacaoItem.dataHora), 'dd/MM/yyyy')}</Text>
                                    <Text style={styles.textTable}>{movimentacaoItem.tipo}</Text>
                                    <Text style={styles.textTable}>R${movimentacaoItem.valor.toFixed(2)}</Text>

                                </View>
                            </TouchableOpacity>
                            {showDetails[movimentacaoItem.idMovimentacao] && (
                                <View style={styles.containerTabela2e3}>
                                    <View style={styles.linhasTable2}>
                                        <Text style={styles.textTable}>Descrição:</Text>
                                        <Text style={styles.textTable}>
                                            {movimentacaoItem.descricao === null || movimentacaoItem.descricao === "" ? descricaoNull : movimentacaoItem.descricao}
                                        </Text>
                                    </View>
                                    <View style={styles.linhasTable3}>
                                        <Text style={styles.textTable}>Valor anterior: </Text>
                                        <Text style={styles.textTable}>R${movimentacaoItem.totalAnterior.toFixed(2)}</Text>
                                    </View>
                                    <View style={styles.linhasTable3}>
                                        <Text style={styles.textTable}>Valor após mudança: </Text>
                                        <Text style={styles.textTable}>R${movimentacaoItem.totalAtual.toFixed(2)}</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    containerInterno: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        //justifyContent: 'flex-start',
        width: '100%',
        height: '100%'
    },
    containerSaldo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ACBFC5',/////////////////  Mudar /////////////////
        borderRadius: 15,
        height: '24%',
        lineHeight: '1cm',
        width: '95%',
        margin: 10,
        padding: 10,
    },
    textSaldoTitle: {
        fontSize: getFontSize(20),
        fontWeight: '700',
        color: '#123456',
    },
    textSaldoValor: {
        fontSize: getFontSize(20),
        fontWeight: '700',
        color: '#343434',
    },
    linhasTableInicial: {
        alignSelf: "center",
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        minWidth: '96%',
        maxWidth: '98%',
        backgroundColor: '#ACBFC5',/////////////////  Mudar /////////////////
        margin: 2,
        padding: 10,
        borderRadius: 10,
    },
    containerTabela2e3: {
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: '#ACB333',/////////////////  Mudar /////////////////
        minWidth: '96%',
        maxWidth: '98%',
        padding: 10,
    },
    linhasTable2: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'space-between',

        margin: 1,
        padding: 5,
    },
    linhasTable3: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',

        margin: 1,
        padding: 5,
    },
    textTable: {
        fontSize: getFontSize(16),
        flexWrap: 'wrap',
    },

});

export default Balance;