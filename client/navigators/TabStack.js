import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import PostStack from './PostStack';
import Explore from '../screens/Explore';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AddPost from '../screens/AddPost';
import Octicons from '@expo/vector-icons/Octicons';

const Tab = createBottomTabNavigator();

export default function TabStack() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="MainHome"
                component={PostStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) =>
                        focused ? (
                            <Ionicons name="home" size={size} color="#080814" />
                        ) : (
                            <Ionicons
                                name="home-outline"
                                size={size}
                                color="#080814"
                            />
                        ),
                    tabBarShowLabel: false,
                }}
            />
            <Tab.Screen
                name="Explore"
                component={Explore}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) =>
                        focused ? (
                            <FontAwesome
                                name="search"
                                size={24}
                                color="#080814"
                            />
                        ) : (
                            <FontAwesome
                                name="search"
                                size={24}
                                color="#080814"
                                style={{ opacity: 0.8 }}
                            />
                        ),
                    tabBarShowLabel: false,
                }}
            />
            <Tab.Screen
                name="AddPost"
                component={AddPost}
                options={{
                    headerTitle: 'New Post',
                    tabBarIcon: ({ color, size, focused }) =>
                        focused ? (
                            <Octicons
                                name="diff-added"
                                size={24}
                                color="#080814"
                            />
                        ) : (
                            <Octicons
                                name="diff-added"
                                size={24}
                                color="#080814"
                                style={{ opacity: 0.8 }}
                            />
                        ),
                    tabBarShowLabel: false,
                }}
            />
        </Tab.Navigator>
    );
}
