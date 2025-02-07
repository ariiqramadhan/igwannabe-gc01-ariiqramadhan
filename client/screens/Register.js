import {
    ActivityIndicator,
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
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../queries/query';
import { useState } from 'react';
import Toast from 'react-native-root-toast';

export default function Register({ navigation }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, { data, loading, error }] = useMutation(REGISTER);

    async function handleRegister() {
        try {
            const newUser = {
                email,
                name,
                password,
                username,
            };

            await register({
                variables: {
                    newUser,
                },
            });

            navigation.navigate('Login');
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
                            <View style={styles.arrowSign}>
                                <Pressable
                                    onPress={() => navigation.navigate('Login')}
                                >
                                    <FontAwesome6
                                        name="arrow-left-long"
                                        size={24}
                                        color="#FFF"
                                    />
                                </Pressable>
                            </View>
                            <Text
                                style={{
                                    fontSize: 40,
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    position: 'absolute',
                                }}
                            >
                                Sign Up
                            </Text>
                        </View>
                        <View style={styles.form}>
                            <View
                                style={{
                                    flex: 3,
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    marginTop: 30,
                                }}
                            >
                                <View>
                                    <View>
                                        <Text
                                            style={{
                                                marginBottom: 5,
                                                color: '#080814',
                                            }}
                                        >
                                            Name
                                        </Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Name"
                                            onChangeText={setName}
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
                                            Email
                                        </Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Email"
                                            onChangeText={setEmail}
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
                                    {false ? (
                                        <View style={styles.loading}>
                                            <ActivityIndicator size={'large'} />
                                        </View>
                                    ) : (
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
                                            <Pressable onPress={handleRegister}>
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
                                    )}
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
                                    Already have account?{' '}
                                    <Text
                                        style={{
                                            textDecorationLine: 'underline',
                                        }}
                                        onPress={() =>
                                            navigation.navigate('Login')
                                        }
                                    >
                                        Sign In
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
        flex: 6,
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
        height: '30%',
    },
    arrowSign: {
        alignItems: 'flex-start',
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
    },
});
