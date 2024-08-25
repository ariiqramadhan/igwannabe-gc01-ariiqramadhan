import { Text, View } from "react-native";

export default function Tags({ tag }) {
    return (
        <View
            style={{
                backgroundColor: '#CDCDCD',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 20,
            }}
        >
            <Text style={{ fontSize: 12 }}>{tag}</Text>
        </View>
    );
}
