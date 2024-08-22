import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Home() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.headers}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                        Instagram
                    </Text>
                    <View style={styles.headersLogo}>
                        <AntDesign name="hearto" size={24} color="black" />
                        <AntDesign name="message1" size={24} color="black" />
                    </View>
                </View>
                <View style={{flex: 20, justifyContent: 'flex-end'}}>
                    <Text>Test</Text>
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
        paddingHorizontal: 20,
    },
    headersLogo: {
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
