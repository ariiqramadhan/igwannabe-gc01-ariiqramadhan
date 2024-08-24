import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getItemAsync } from 'expo-secure-store';

const httpLink = createHttpLink({
    uri: 'https://7a65-139-228-48-10.ngrok-free.app',
});

const authLink = setContext(async (_, { headers }) => {
    const access_token = await getItemAsync('access_token');
    return {
        headers: {
            ...headers,
            authorization: access_token ? `Bearer ${access_token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;