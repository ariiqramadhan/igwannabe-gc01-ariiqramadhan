import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';
import MainStack from './navigators/MainStack';
import AuthProvider from './contexts/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <ApolloProvider client={client}>
                <StatusBar style="dark" />
                <MainStack />
            </ApolloProvider>
        </AuthProvider>
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
