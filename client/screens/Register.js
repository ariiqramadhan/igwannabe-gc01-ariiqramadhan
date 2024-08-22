import {
    Image,
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function Register({ navigation }) {
    return (
        <SafeAreaProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.container}>
                        <View style={styles.headers}>
                            <Image
                                style={styles.logo}
                                source={require('../assets/instagram.png')}
                            />
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                Instagram
                            </Text>
                            <Text style={{ color: '#9D9D9D', marginTop: 6 }}>Discover New Connections!</Text>
                        </View>
                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Username"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry={true}
                            />
                        </View>
                        <LinearGradient
                            colors={[
                                '#fba557',
                                '#e77546',
                                '#ce286b',
                                '#a71e9b',
                            ]}
                            start={[0, 1]}
                            end={[1, 0]}
                            style={styles.signUp}
                        >
                            <Pressable
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Sign Up
                                </Text>
                            </Pressable>
                        </LinearGradient>
                    </View>
                    <Text style={{ color: '#9D9D9D', textAlign: 'center' }}>
                        Already have account?{' '}
                        <Text
                            style={{ textDecorationLine: 'underline' }}
                            onPress={() => navigation.navigate('Login')}
                        >
                            Sign In
                        </Text>
                    </Text>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        marginTop: 50,
    },
    input: {
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,

        elevation: 8,
        shadowColor: '#9D9D9D',
        width: 300,
        marginBottom: 15,
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#FFF',
    },
    signUp: {
        width: 300,
        padding: 15,
        borderRadius: 30,
        marginTop: 25,
    },
    logo: {
        marginBottom: 30,
        width: 90,
        height: 90,
    },
    headers: {
        alignItems: 'center'
    }
});
