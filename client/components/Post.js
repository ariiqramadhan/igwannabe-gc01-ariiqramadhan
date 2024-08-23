import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ReadMore from 'react-native-read-more-text';
import { useMutation } from '@apollo/client';
import { GET_POSTS, LIKE_POST } from '../queries/query';

export default function Post({ post, navigation }) {
    const [like, { error, loading, data }] = useMutation(LIKE_POST, {
        refetchQueries: [GET_POSTS],
    });
    function renderTruncatedFooter(handlePress) {
        return (
            <Pressable onPress={handlePress}>
                <Text style={{ color: '#9D9D9D', marginTop: 5 }}>
                    Read more
                </Text>
            </Pressable>
        );
    }

    function renderRevealedFooter(handlePress) {
        return (
            <Pressable onPress={handlePress}>
                <Text style={{ color: '#9D9D9D', marginTop: 5 }}>
                    Show less
                </Text>
            </Pressable>
        );
    }

    async function handleLike() {
        try {
            await like({
                variables: {
                    postId: post._id,
                },
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={{ gap: 8, marginBottom: 12 }}>
            <View style={styles.postHead}>
                <View style={styles.usernameLogo}>
                    <Image
                        source={require('../assets/blank-pp.jpg')}
                        style={{ width: 44, height: 44 }}
                    />
                    <Text style={{ fontWeight: '600', color: '#080814' }}>
                        {post.author.username}
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
                <Pressable onPress={() => navigation.navigate('PostDetail', {id: post._id})}>
                    <Image
                        src={post.imageUrl}
                        style={{ width: '100%', height: 400 }}
                    />
                </Pressable>
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
                        <Text style={{ fontSize: 16, color: '#080814' }}>
                            {post.likes.length}
                        </Text>
                    </View>
                    <View style={styles.footLogo}>
                        <MaterialCommunityIcons
                            name="comment-outline"
                            size={26}
                            color="#080814"
                        />
                        <Text style={{ fontSize: 16, color: '#080814' }}>
                            {post.comments.length}
                        </Text>
                    </View>
                    <View style={styles.footLogo}>
                        <Feather name="send" size={26} color="#080814" />
                        <Text style={{ fontSize: 16, color: '#080814' }}>
                            0
                        </Text>
                    </View>
                </View>
                <FontAwesome name="bookmark-o" size={24} color="#080814" />
            </View>
            <View style={{ width: '100%', paddingHorizontal: 8 }}>
                <ReadMore
                    numberOfLines={1}
                    renderTruncatedFooter={renderTruncatedFooter}
                    renderRevealedFooter={renderRevealedFooter}
                >
                    <Text style={{ fontWeight: '600', textAlign: 'justify', color: '#080814' }}>
                        {post.author.username}{' '}
                        <Text style={{ fontWeight: 'normal', color: '#080814' }}>
                            {post.content}
                        </Text>
                    </Text>
                    <Text>{'\n\n'}</Text>
                    <Text style={{ color: '#4092EF' }}>
                        {post.tags?.map((tag) => `#${tag} `)}
                    </Text>
                </ReadMore>
            </View>
        </View>
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
