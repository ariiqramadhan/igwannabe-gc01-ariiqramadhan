import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';
import MainStack from './navigators/MainStack';
import AuthProvider from './contexts/AuthContext';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
    return (
        <RootSiblingParent>
            <AuthProvider>
                <ApolloProvider client={client}>
                    <StatusBar style="dark" />
                    <MainStack />
                </ApolloProvider>
            </AuthProvider>
        </RootSiblingParent>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
