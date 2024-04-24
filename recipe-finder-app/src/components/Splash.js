import { StyleSheet, Text, View, ImageBackground, Platform, TouchableOpacity } from 'react-native'
import React from 'react'

const Splash = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/splashScreen1.jpg')}
                blurRadius={Platform.OS === 'ios' ? 8 : 4} resizeMode='cover' style={styles.SplashImg}>
                <Text style={styles.txt}>Recipe</Text>
                <Text style={styles.txt1}>Finder</Text>
                <TouchableOpacity style={styles.splashBtn} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.btnTxt}>Start Cooking</Text>
                </TouchableOpacity>
            </ImageBackground>

        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    SplashImg: {
        flex: 1,
        justifyContent: 'center',
    },

    txt: {
        color: 'white',
        fontSize: 72,
        textAlign: 'center',
        marginTop: 300,
        color: '#fff',
        fontFamily: 'Italiano-light',
    },

    txt1: {
        color: 'white',
        fontSize: 72,
        textAlign: 'center',
        color: 'orange',
        marginBottom: 5,
        fontFamily: 'Italiano-light',
        lineHeight: 72

    },

    splashBtn: {
        borderRadius: 15,
        alignSelf: 'center',
        padding: 15,
        backgroundColor: 'orange'
    },

    btnTxt: {
        color: '#fff',
        fontWeight: 'bold',

    }
})