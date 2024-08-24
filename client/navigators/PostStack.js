import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home";
import PostDetail from "../screens/PostDetail";
import UserDetail from "../screens/UserDetail";

const Stack = createNativeStackNavigator();

export default function PostStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="PostDetail" component={PostDetail} options={{headerTitle: 'Post Detail', headerBackTitleVisible: false, headerTintColor: '#080814'}}/>
            <Stack.Screen name="UserDetail" component={UserDetail} options={{headerTitle: 'User', headerBackTitleVisible: false, headerTintColor: '#080814'}}/>
        </Stack.Navigator>
    )
}