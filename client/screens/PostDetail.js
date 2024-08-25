import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMutation, useQuery } from '@apollo/client';
import { COMMENT_POST, GET_POST, LIKE_POST } from '../queries/query';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Toast from 'react-native-root-toast';

const black = '#080814';

export default function PostDetail({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [userComment, setUserComment] = useState('');
    const route = useRoute();
    const { id } = route.params;
    const [like, likeObj] = useMutation(LIKE_POST, {
        refetchQueries: [GET_POST],
    });
    const [comment, commentObj] = useMutation(COMMENT_POST, {
        refetchQueries: [GET_POST],
    });

    const { data, error, loading } = useQuery(GET_POST, {
        variables: {
            getPostId: id,
        },
    });

    async function handleComment() {
        try {
            await comment({
                variables: {
                    newComment: {
                        content: userComment,
                    },
                    postId: id,
                },
            });
            setUserComment('');
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

    async function handleLike() {
        try {
            await like({
                variables: {
                    postId: id,
                },
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
                <View
                    style={{
                        flex: 1,
                        gap: 8,
                        paddingTop: 12,
                        backgroundColor: '#FFF',
                    }}
                >
                    <Pressable
                        onPress={() =>
                            navigation.navigate('UserDetail', {
                                id: data.GetPost.authorId,
                            })
                        }
                    >
                        <View style={styles.postHead}>
                            <View style={styles.usernameLogo}>
                                <Image
                                    source={require('../assets/blank-pp.jpg')}
                                    style={{ width: 44, height: 44 }}
                                />
                                <Text
                                    style={{ fontWeight: '600', color: black }}
                                >
                                    {data?.GetPost.author.username}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Entypo
                                    name="dots-three-horizontal"
                                    size={20}
                                    color={black}
                                />
                            </View>
                        </View>
                    </Pressable>
                    <View>
                        <Image
                            src={data?.GetPost.imageUrl}
                            style={{ width: '100%', height: 400 }}
                        />
                    </View>
                    <View style={styles.postFoot}>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            <View style={styles.footLogo}>
                                <TouchableHighlight
                                    onPress={handleLike}
                                    underlayColor="none"
                                >
                                    <AntDesign
                                        name="hearto"
                                        size={26}
                                        color={black}
                                    />
                                </TouchableHighlight>
                                <Text style={{ fontSize: 16, color: black }}>
                                    {data?.GetPost.likes.length}
                                </Text>
                            </View>
                            <View style={styles.footLogo}>
                                <MaterialCommunityIcons
                                    name="comment-outline"
                                    size={26}
                                    color={black}
                                />
                                <Text style={{ fontSize: 16, color: black }}>
                                    {data?.GetPost.comments.length}
                                </Text>
                            </View>
                            <View style={styles.footLogo}>
                                <Feather name="send" size={26} color={black} />
                                <Text style={{ fontSize: 16, color: black }}>
                                    0
                                </Text>
                            </View>
                        </View>
                        <FontAwesome
                            name="bookmark-o"
                            size={24}
                            color={black}
                        />
                    </View>
                    <View style={{ width: '100%', paddingHorizontal: 8 }}>
                        <Text
                            style={{ fontWeight: '600', textAlign: 'justify' }}
                        >
                            {data?.GetPost.author.username}{' '}
                            <Text style={{ fontWeight: 'normal' }}>
                                {data?.GetPost.content}
                            </Text>
                        </Text>
                        <Text>{''}</Text>
                        <Text style={{ color: '#4092EF' }}>
                            {data?.GetPost.tags?.map((tag) => `#${tag} `)}
                        </Text>
                    </View>
                    <View style={{ paddingHorizontal: 8 }}>
                        <Text style={{ fontWeight: '600' }}>
                            {data?.GetPost.comments[0]?.username}{' '}
                            <Text style={{ fontWeight: 'normal' }}>
                                {data?.GetPost.comments[0]?.content}
                            </Text>
                        </Text>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={{ marginTop: 4, color: '#9D9D9D' }}>
                                View all comments
                            </Text>
                        </Pressable>
                    </View>
                    <Modal
                        animationType="slide"
                        visible={modalVisible}
                        transparent={true}
                    >
                        <View style={styles.modal}>
                            <TouchableWithoutFeedback
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <View
                                    style={{
                                        height: '40%',
                                        width: '100%',
                                    }}
                                ></View>
                            </TouchableWithoutFeedback>
                            <View style={styles.commentSection}>
                                <View style={styles.commentSectionHeader}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: '600',
                                        }}
                                    >
                                        Comments
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 8,
                                        paddingHorizontal: 8,
                                        paddingTop: 20,
                                        paddingBottom: 80,
                                        width: '100%',
                                    }}
                                >
                                    <ScrollView>
                                        <View style={{ flex: 1 }}>
                                            {data?.GetPost.comments.map(
                                                (val, i) => {
                                                    return (
                                                        <View
                                                            key={i}
                                                            style={{
                                                                marginBottom: 8,
                                                            }}
                                                        >
                                                            <View
                                                                style={
                                                                    styles.usernameComment
                                                                }
                                                            >
                                                                <View>
                                                                    <Image
                                                                        source={require('../assets/blank-pp.jpg')}
                                                                        style={{
                                                                            width: 44,
                                                                            height: 44,
                                                                        }}
                                                                    />
                                                                </View>
                                                                <View>
                                                                    <Text
                                                                        style={{
                                                                            fontWeight:
                                                                                '600',
                                                                            color: black,
                                                                        }}
                                                                    >
                                                                        {val.username}
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            color: '#080814',
                                                                        }}
                                                                    >
                                                                        {
                                                                            val.content
                                                                        }
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    );
                                                }
                                            )}
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                            <KeyboardAvoidingView
                                behavior={
                                    Platform.OS === 'ios' ? 'padding' : 'height'
                                }
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    left: 0,
                                    backgroundColor: '#FFF',
                                }}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        paddingHorizontal: 8,
                                        backgroundColor: '#FFF',
                                        marginBottom: 40,
                                    }}
                                >
                                    <View style={styles.addComment}>
                                        <Image
                                            source={require('../assets/blank-pp.jpg')}
                                            style={{ width: 44, height: 44 }}
                                        />
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: 8,
                                                justifyContent: 'space-between',
                                                flex: 1,
                                            }}
                                        >
                                            <View style={{ flex: 1 }}>
                                                <TextInput
                                                    placeholder="Add Comments..."
                                                    placeholderTextColor="#9D9D9D"
                                                    style={
                                                        styles.addCommentForm
                                                    }
                                                    onChangeText={
                                                        setUserComment
                                                    }
                                                    onSubmitEditing={
                                                        handleComment
                                                    }
                                                    autoCapitalize={false}
                                                    autoCorrect={false}
                                                    value={userComment}
                                                />
                                            </View>
                                            <Pressable onPress={handleComment}>
                                                <Ionicons
                                                    name="send"
                                                    size={24}
                                                    color={black}
                                                />
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    headersLogo: {
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    postHead: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },
    usernameLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    postFoot: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    footLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    modal: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 22,
    },
    commentSection: {
        height: '60%',
        width: '100%',
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentSectionHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        width: '100%',
        borderColor: '#9D9D9D',
    },
    usernameComment: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },
    addComment: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        width: '100%',
    },
    addCommentForm: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#A6A6A6',
        padding: 10,
        color: black,
    },
});
