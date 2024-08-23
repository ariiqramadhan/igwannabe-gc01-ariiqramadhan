import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Ionicons from '@expo/vector-icons/Ionicons';
import PostDetail from '../screens/PostDetail';
import PostStack from './PostStack';

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
                            <Ionicons name="home" size={size} color='#080814' />
                        ) : (
                            <Ionicons
                                name="home-outline"
                                size={size}
                                color='#080814'
                            />
                        ),
                    tabBarShowLabel: false
                }}
            />
        </Tab.Navigator>
    );
}
