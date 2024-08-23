import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import {
    Image,
    Keyboard,
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
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMutation, useQuery } from '@apollo/client';
import { COMMENT_POST, GET_POST, LIKE_POST } from '../queries/query';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';

export default function PostDetail() {
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
            <ScrollView style={{flex: 1, backgroundColor: '#FFF'}}>
                <View
                    style={{
                        flex: 1,
                        gap: 8,
                        paddingTop: 12,
                        backgroundColor: '#FFF',
                    }}
                >
                    <View style={styles.postHead}>
                        <View style={styles.usernameLogo}>
                            <Image
                                source={require('../assets/blank-pp.jpg')}
                                style={{ width: 44, height: 44 }}
                            />
                            <Text
                                style={{ fontWeight: '600', color: '#080814' }}
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
                                color="#080814"
                            />
                        </View>
                    </View>
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
                                        color="#080814"
                                    />
                                </TouchableHighlight>
                                <Text
                                    style={{ fontSize: 16, color: '#080814' }}
                                >
                                    {data?.GetPost.likes.length}
                                </Text>
                            </View>
                            <View style={styles.footLogo}>
                                <MaterialCommunityIcons
                                    name="comment-outline"
                                    size={26}
                                    color="#080814"
                                />
                                <Text
                                    style={{ fontSize: 16, color: '#080814' }}
                                >
                                    {data?.GetPost.comments.length}
                                </Text>
                            </View>
                            <View style={styles.footLogo}>
                                <Feather
                                    name="send"
                                    size={26}
                                    color="#080814"
                                />
                                <Text
                                    style={{ fontSize: 16, color: '#080814' }}
                                >
                                    0
                                </Text>
                            </View>
                        </View>
                        <FontAwesome
                            name="bookmark-o"
                            size={24}
                            color="#080814"
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
                    <View style={{ paddingHorizontal: 8, marginTop: 20 }}>
                        {data?.GetPost.comments.map((val, i) => {
                            return (
                                <View key={i} style={{ marginBottom: 8 }}>
                                    <Text
                                        style={{
                                            fontWeight: '600',
                                            color: '#080814',
                                        }}
                                    >
                                        {val.username}
                                    </Text>
                                    <Text style={{ color: '#080814' }}>
                                        {val.content}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                    <View style={{ paddingHorizontal: 8 }}>
                        <TextInput
                            placeholder="Add a comment..."
                            onChangeText={setUserComment}
                            onSubmitEditing={handleComment}
                            autoCapitalize={false}
                            autoCorrect={false}
                            value={userComment}
                        />
                    </View>
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
});
