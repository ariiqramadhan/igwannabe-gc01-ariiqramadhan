import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { Image, StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Post({ post }) {
    return (
        <View style={{ gap: 8 }}>
            <View style={styles.postHead}>
                <View style={styles.usernameLogo}>
                    <Image
                        source={require('../assets/blank-pp.jpg')}
                        style={{ width: 44, height: 44 }}
                    />
                    <Text style={{ fontWeight: '600' }}>{post.author.username}</Text>
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
                        color="black"
                    />
                </View>
            </View>
            <View>
                <Image
                    src={post.imageUrl}
                    style={{ width: '100%', height: 400 }}
                />
            </View>
            <View style={styles.postFoot}>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <View style={styles.footLogo}>
                        <AntDesign name="hearto" size={26} color="black" />
                        <Text style={{ fontSize: 16 }}>{post.likes.length}</Text>
                    </View>
                    <View style={styles.footLogo}>
                        <MaterialCommunityIcons
                            name="comment-outline"
                            size={26}
                            color="black"
                        />
                        <Text style={{ fontSize: 16 }}>{post.comments.length}</Text>
                    </View>
                    <View style={styles.footLogo}>
                        <Feather name="send" size={26} color="black" />
                        <Text style={{ fontSize: 16 }}>0</Text>
                    </View>
                </View>
                <FontAwesome name="bookmark-o" size={24} color="black" />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            ></View>
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
        paddingHorizontal: 8
    },
    footLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
});