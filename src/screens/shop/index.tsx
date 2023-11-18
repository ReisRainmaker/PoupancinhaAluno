import { Button, Card, Icon } from "@rneui/base";
import { View, Text, ImageBackground, StyleSheet, Dimensions, Image, ScrollView } from "react-native"

const windowWidth = Dimensions.get('window').width;
const getFontSize = (baseFontSize) => {
    const scaleFactor = windowWidth / 375; // 375 é a largura de referência
    const adjustedFontSize = Math.round(baseFontSize * scaleFactor);
    return adjustedFontSize;
};

const Shop = ({ Navigation }) => {

    return (
        <ImageBackground
            source={require('../../images/cedulas.jpg')}
            style={styles.container}
        >
            <ScrollView style={styles.fundoScroll}>
                <Text style={styles.textTitle}>Lojinha da (Professora)</Text>
                <View style={styles.cardContainer}>
                    <Card.Title
                        style={{fontSize: getFontSize(30)}}
                    >Nome do produto</Card.Title>
                    <Card.Divider />
                    <Card.Image
                        style={{ padding: 0 }}
                        source={{
                            uri:
                                'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                        }}
                    />
                    <Text style={{ 
                        marginBottom: 10,
                        fontSize: getFontSize(25),
                        textAlign: 'center'
                     }}>
                        R$ (Preço)
                    </Text>
                    <Text style={{ 
                        marginBottom: 10,
                        fontSize: getFontSize(15),
                        textAlign: 'center'
                     }}>
                        Descrição basica do item, como por exemplo: Um conjuto com lapiz borracha e caderno brochurinha.
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
                {////////////////////// repetição para verificação
                }
                <View style={styles.cardContainer}>
                    <Card.Title
                        style={{fontSize: getFontSize(30)}}
                    >Nome do produto</Card.Title>
                    <Card.Divider />
                    <Card.Image
                        style={{ padding: 0 }}
                        source={{
                            uri:
                                'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                        }}
                    />
                    <Text style={{ 
                        marginBottom: 10,
                        fontSize: getFontSize(18)
                     }}>
                        Descrição basica do produto
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
                </View><View style={styles.cardContainer}>
                    <Card.Title
                        style={{fontSize: getFontSize(30)}}
                    >Nome do produto</Card.Title>
                    <Card.Divider />
                    <Card.Image
                        style={{ padding: 0 }}
                        source={{
                            uri:
                                'https://img.freepik.com/fotos-premium/montanha-vulcanica-na-luz-da-noite-refletida-nas-aguas-calmas-do-lago_35766-2611.jpg?size=626&ext=jpg&ga=GA1.1.973471455.1700316106&semt=ais',
                        }}
                    />
                    <Text style={{ 
                        marginBottom: 10,
                        fontSize: getFontSize(18)
                     }}>
                        Descrição basica do produto
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
                </View><View style={styles.cardContainer}>
                    <Card.Title
                        style={{fontSize: getFontSize(30)}}
                    >Nome do produto</Card.Title>
                    <Card.Divider />
                    <Card.Image
                        style={{ padding: 0 }}
                        source={{
                            uri:
                            'https://img.freepik.com/fotos-gratis/uma-pintura-de-um-lago-de-montanha-com-uma-montanha-ao-fundo_188544-9126.jpg?size=626&ext=jpg'
                        }}
                    />
                    <Text style={{ 
                        marginBottom: 10,
                        fontSize: getFontSize(18)
                     }}>
                        Descrição basica do produto
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
                </ScrollView>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    textTitle: {
        fontSize: getFontSize(50),
        fontWeight: '700',
        color: '#123456',//////////////////    Mudar    /////////////////////
        backgroundColor: '#ab234a',//////////////////    Mudar    /////////////////////
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
        backgroundColor: '#aaaaaa',
        padding: 15,
        marginTop: 15,

    },
});


export default Shop;

