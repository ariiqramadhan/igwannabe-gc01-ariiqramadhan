import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";

const itemWidth = Dimensions.get('window').width / 3;

export default function ExplorePost({ post, navigation }) {
    return (
        <Pressable onPress={() => navigation.navigate('PostDetail', {id: post._id})}>
            <View style={styles.item}>
                <Image 
                    src={post.imageUrl}
                    style={{width: itemWidth, height: itemWidth, objectFit: 'cover'}}
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    item: {
        width: itemWidth,
        height: itemWidth,
        borderWidth: 1,
        borderColor: '#FFF',
    }
});