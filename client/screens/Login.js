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
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries/query';
import { AuthContext } from '../contexts/AuthContext';
import { setItemAsync } from 'expo-secure-store';
import Toast from 'react-native-root-toast';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, { error, data, loading }] = useMutation(LOGIN);
    const { setIsSignedIn } = useContext(AuthContext);

    async function handleLogin() {
        try {
            const res = await login({
                variables: {
                    username,
                    password
                }
            });

            const access_token = res.data.Login.access_token;
            await setItemAsync('access_token', access_token);
            setIsSignedIn(true);
        } catch (err) {
            let toast = Toast.show(err.graphQLErrors[0].message, {
                duration: 1500,
                hideOnPress: true,
                position: Toast.positions.TOP,
                backgroundColor: '#E53835',
                textColor: '#FFF',
                opacity: 1
            });
            console.log(err);
        }
    }

    return (
        <SafeAreaProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.safeArea}>
                    <LinearGradient
                        colors={['#fba557', '#e77546', '#ce286b', '#a71e9b']}
                        style={styles.background}
                    />
                    <View style={styles.container}>
                        <View style={styles.headers}>
                            <Image
                                style={styles.logo}
                                source={require('../assets/instagram_2.png')}
                            />
                        </View>
                        <View style={styles.form}>
                            <View
                                style={{
                                    flex: 3,
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 40,
                                        fontWeight: 'bold',
                                        color: '#080814',
                                    }}
                                >
                                    Login
                                </Text>
                                <View>
                                    <View>
                                        <Text
                                            style={{
                                                marginBottom: 5,
                                                color: '#080814',
                                            }}
                                        >
                                            Username
                                        </Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Username"
                                            onChangeText={setUsername}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                        />
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                marginBottom: 5,
                                                color: '#080814',
                                            }}
                                        >
                                            Password
                                        </Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Password"
                                            secureTextEntry={true}
                                            onChangeText={setPassword}
                                            autoCapitalize='none'
                                            autoCorrect={false}
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
                                            onPress={handleLogin}
                                        >
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Sign In
                                            </Text>
                                        </Pressable>
                                    </LinearGradient>
                                </View>
                            </View>
                            <View
                                style={{ flex: 1, justifyContent: 'flex-end' }}
                            >
                                <Text
                                    style={{
                                        color: '#9D9D9D',
                                        textAlign: 'center',
                                    }}
                                >
                                    Don't have account?{' '}
                                    <Text
                                        style={{
                                            textDecorationLine: 'underline',
                                        }}
                                        onPress={() =>
                                            navigation.navigate('Register')
                                        }
                                    >
                                        Sign Up
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        width: '100%',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    headers: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: '100%',
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
        width: 90,
        height: 90,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '50%',
    },
});
