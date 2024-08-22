import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabStack from './TabStack';
import Register from '../screens/Register';
import Login from '../screens/Login';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getItemAsync } from 'expo-secure-store';
import Loading from '../components/Loading';

const Stack = createNativeStackNavigator();

export default function MainStack() {
    const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    async function checkToken() {
        try {
            setLoading(true);
            const access_token = await getItemAsync('access_token');
            if (access_token) {
                setIsSignedIn(true);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkToken();
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isSignedIn ? (
                    <Stack.Screen
                        name="Tab"
                        component={TabStack}
                        options={{ headerShown: false }}
                    />
                ) : (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Register"
                            component={Register}
                            options={{ headerShown: false }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
