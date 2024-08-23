import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { deleteItemAsync } from 'expo-secure-store';
import Post from '../components/Post';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../queries/query';
import Loading from '../components/Loading';

export default function Home() {
    const { data, error, loading } = useQuery(GET_POSTS);
    const { setIsSignedIn } = useContext(AuthContext);
    async function handleLogout() {
        try {
            await deleteItemAsync('access_token');
            setIsSignedIn(false);
        } catch (err) {
            console.log(err);
        }
    }

    if (!data) {
        return <Loading />
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.headers}>
                    <Text
                        style={{ fontSize: 24, fontWeight: 'bold', color: '#080814' }}
                        onPress={handleLogout}
                    >
                        Instagram
                    </Text>
                    <View style={styles.headersLogo}>
                        <AntDesign name="hearto" size={24} color="#080814" />
                        <AntDesign name="message1" size={24} color="#080814" />
                    </View>
                </View>

                <View style={{ flex: 20 }}>
                    {/* <ScrollView contentContainerStyle={{ gap: 16 }}>
                        {data && data.GetPosts?.map(post => <Post key={post._id} post={post}/>)}
                    </ScrollView> */}
                    <FlatList 
                        data={data?.GetPosts}
                        renderItem={({item}) => <Post post={item}/>}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    headers: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    headersLogo: {
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
