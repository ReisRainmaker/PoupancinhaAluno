import { View, Text, ImageBackground, StyleSheet } from "react-native"


const Balance = ({ Navigation }) => {

    return (
        <ImageBackground
            source={require('../../images/cedulas.jpg')}
            style={styles.container}
        >

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
});

export default Balance;