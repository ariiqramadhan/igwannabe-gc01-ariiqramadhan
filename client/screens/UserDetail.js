import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import { FOLLOW_USER, GET_USER } from '../queries/query';
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import Toast from 'react-native-root-toast';

const black = '#080814';

export default function UserDetail({ navigation }) {
    const route = useRoute();
    const { id } = route.params;
    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            getUserId: id,
        },
    });

    const [follow, followObj] = useMutation(FOLLOW_USER, {
        refetchQueries: [GET_USER],
    });

    async function handleFollow() {
        try {
            await follow({
                variables: {
                    newFollow: {
                        followingId: id,
                    },
                },
            });
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

    useEffect(() => {
        if (data) {
            navigation.setOptions({
                headerTitle: data?.GetUser.username,
            });
        }
    }, [data]);
    return (
        <View style={styles.container}>
            <ScrollView>
                <View
                    style={{
                        alignItems: 'center',
                        gap: 24,
                        paddingTop: 12,
                    }}
                >
                    <View>
                        <Image
                            source={require('../assets/blank-pp.jpg')}
                            style={{ width: 100, height: 100 }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', gap: 32 }}>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={styles.followStyle}>
                                {data?.GetUser.followers.length}
                            </Text>
                            <Text style={{ color: black }}>followers</Text>
                        </View>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={styles.followStyle}>
                                {data?.GetUser.following.length}
                            </Text>
                            <Text>following</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', gap: 4 }}>
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: 'bold',
                                color: black,
                            }}
                        >
                            {data?.GetUser.name}
                        </Text>
                        <View
                            style={{
                                backgroundColor: '#EFEFEF',
                                padding: 5,
                                borderRadius: 30,
                                paddingHorizontal: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text>@ {data?.GetUser.username}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 24 }}>
                        <TouchableHighlight
                            style={styles.buttonFollow}
                            onPress={handleFollow}
                            underlayColor={'#0075C2'}
                        >
                            <Text style={{ color: '#FFF' }}>Follow</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.buttonMessage}>
                            <Text style={{ color: black }}>Message</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ paddingHorizontal: 8 }}>
                        <Text style={{ textAlign: 'justify' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Cras suscipit lorem vitae purus blandit, ac
                            pretium augue feugiat. Integer tincidunt nibh risus,
                            ac ultrices lectus tempus et. Sed erat nunc.
                        </Text>
                    </View>
                </View>
                <View style={{ marginTop: 24, marginBottom: 5 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}
                    >
                        <View style={{flex: 1, alignItems: 'center', borderBottomColor: '#000', borderBottomWidth: 2}}>
                            <MaterialCommunityIcons
                                name="border-all"
                                size={32}
                                color="#000"
                                style={{ opacity: 1 }}
                            />
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Feather
                                name="video"
                                size={32}
                                color="#000"
                                style={{ opacity: 0.6 }}
                            />
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <MaterialCommunityIcons
                                name="contacts-outline"
                                size={32}
                                color="#000"
                                style={{ opacity: 0.6 }}
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', height: 140 }}>
                        <View
                            style={{
                                flex: 1,
                                borderWidth: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text>Photo</Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                borderWidth: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text>Photo</Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                borderWidth: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text>Photo</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 140 }}>
                        <View
                            style={{
                                flex: 1,
                                borderWidth: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text>Photo</Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                borderWidth: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text>Photo</Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                borderWidth: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text>Photo</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 140 }}>
                        <View
                            style={{
                                flex: 1,
                                borderWidth: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text>Photo</Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                borderWidth: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text>Photo</Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                borderWidth: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text>Photo</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    followStyle: {
        fontSize: 22,
        fontWeight: '600',
        color: black,
    },
    buttonFollow: {
        backgroundColor: '#0095F6',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        width: 100,
        alignItems: 'center'
    },
    buttonMessage: {
        backgroundColor: '#EFEFEF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        width: 100,
        alignItems: 'center'
    },
});
