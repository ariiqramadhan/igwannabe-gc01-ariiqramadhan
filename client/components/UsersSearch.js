import { Image, Pressable, Text, View } from 'react-native';

export default function UsersSearch({ user, navigation }) {
    return (
        <Pressable onPress={() => navigation.navigate('UserDetail', {id: user._id})}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Image
                    source={require('../assets/blank-pp.jpg')}
                    style={{ width: 44, height: 44 }}
                />
                <View>
                    <Text style={{ fontWeight: 'bold' }}>{user.username}</Text>
                    {user.name && <Text style={{ fontSize: 13 }}>{user.name}</Text>}
                </View>
            </View>
        </Pressable>
    );
}
