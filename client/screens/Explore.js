import {
    Image,
    Keyboard,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import ExplorePost from '../components/ExplorePost';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_POSTS, SEARCH_USERS } from '../queries/query';
import UsersSearch from '../components/UsersSearch';
import Toast from 'react-native-root-toast';

const black = '#080814';

export default function Explore({ navigation }) {
    const [searchInput, setSearchInput] = useState('');
    const [showCancel, setShowCancel] = useState(false);
    const [searchSection, setSearchSection] = useState(false);
    const { data, error, loading } = useQuery(GET_POSTS);
    const [getUsers, { data: usersData, error: usersError, loading: usersLoading }] = useLazyQuery(SEARCH_USERS);

    function showSearch() {
        setShowCancel(true);
        setSearchSection(true);
    }

    async function hideSearch() {
        Keyboard.dismiss();
        setSearchSection(false);
        setShowCancel(false);
        setSearchInput('');
        try {
            await getUsers({
                variables: {
                    username: null
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
    
    async function handleSearch() {
        try {
            await getUsers({
                variables: {
                    username: searchInput
                }
            })
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
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.headers}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 16,
                        }}
                    >
                        <View style={styles.formInput}>
                            <FontAwesome
                                name="search"
                                size={18}
                                color="#9D9D9D"
                            />
                            <TextInput
                                style={{ fontSize: 18, flex: 1, color: black }}
                                placeholder="Search"
                                placeholderTextColor={'#9D9D9D'}
                                autoCapitalize={false}
                                autoCorrect={false}
                                onPress={showSearch}
                                onChangeText={setSearchInput}
                                onSubmitEditing={handleSearch}
                                value={searchInput}
                            />
                        </View>
                        {showCancel ? (
                            <Pressable onPress={hideSearch}>
                                <Text style={{ fontSize: 18, color: black }}>Cancel</Text>
                            </Pressable>
                        ) : (
                            ''
                        )}
                    </View>
                </View>
                <View style={{ flex: 20 }}>
                    {searchSection ? (
                        <View style={{ flex: 1, padding: 12 }}>
                            <ScrollView>
                                <View style={{gap: 12}}>
                                    {usersData && usersData?.SearchUsers.map((val, i) => <UsersSearch key={i} user={val} navigation={navigation} />)}
                                </View>
                            </ScrollView>
                        </View>
                    ) : (
                        <ScrollView>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    flex: 1,
                                }}
                            >
                                {data &&
                                    data?.GetPosts.map((val, i) => (
                                        <ExplorePost key={i}
                                            post={val}
                                            navigation={navigation}
                                        />
                                ))}
                            </View>
                        </ScrollView>
                    )}
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
    formInput: {
        flexDirection: 'row',
        backgroundColor: '#F4F5F7',
        borderRadius: 5,
        padding: 8,
        gap: 8,
        alignItems: 'center',
        flex: 1,
    },
});
