import { useState } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native"


const windowWidth = Dimensions.get('window').width;
const getFontSize = (baseFontSize) => {
    const scaleFactor = windowWidth / 375; // 375 é a largura de referência
    const adjustedFontSize = Math.round(baseFontSize * scaleFactor);
    return adjustedFontSize;
};


const TableBalanceChange = () => {

    const [data, setData] = useState(null);
    const [tipo, setTipo] = useState(null);
    const [valorAnterior, setValorAnterior] = useState(null);
    const [valorAtual, setValorAtual] = useState(null);
    const [descricao, setDescricao] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <View>
            <TouchableOpacity onPress={toggleDetails}>
                <View style={styles.linhasTableInicial}>
                    <Text style={styles.textTable}>13/02/1996 - 16:24</Text>
                    <Text style={styles.textTable}>Soma</Text>
                    <Text style={styles.textTable}>R$ 20,00</Text>
                    
                </View>
            </TouchableOpacity>
            {showDetails && (
                <View style={styles.containerTabela2e3}>
                    <View style={styles.linhasTable2}>
                        <Text style={styles.textTable}>Descrição:</Text>
                        <Text style={styles.textTable}>
                            Premiação por completar a atividade de português do dia 12/11/2023
                        </Text>
                    </View>
                    <View style={styles.linhasTable3}>
                        <Text style={styles.textTable}>Valor anterior: </Text>
                        <Text style={styles.textTable}>R$ 100,00</Text>
                    </View>
                    <View style={styles.linhasTable3}>
                        <Text style={styles.textTable}>Valor após mudança: </Text>
                        <Text style={styles.textTable}>R$ 120,00</Text>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({


    linhasTableInicial: {
        alignSelf: "center",
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '94%',
        backgroundColor: '#ACBFC5',/////////////////  Mudar /////////////////
        margin: 2,
        padding: 10,
        borderRadius: 10,
    },
    containerTabela2e3: {
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: '#ACB333',/////////////////  Mudar /////////////////
        maxWidth: '100%',
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

export default TableBalanceChange;