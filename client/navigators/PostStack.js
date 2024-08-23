import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home";
import PostDetail from "../screens/PostDetail";

const Stack = createNativeStackNavigator();

export default function PostStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="Post Detail" component={PostDetail}/>
        </Stack.Navigator>
    )
}