import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Screens/Home';
import Profile from './Screens/Profile';
import EditProfile from './Screens/EditProfile';
import Product from './Screens/Product';
import Cart from './Screens/Cart';
import Wishlist from './Screens/Wishlist';
import Search from './Screens/Search';
import { Text, View } from 'react-native';
import AntIcon from "react-native-vector-icons/AntDesign";
import { Icon } from '@rneui/themed';
import { themeColor, themegrey } from './theme';
import CheckOut from './Screens/CheckOut';
import Address from './Screens/Address';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function tabitem({ color, size }, iconName, labelName) {
    return (
        <>
            <AntIcon name={iconName} color={color} size={size} />
            <Text style={{ fontWeight: "bold", color: color, margin: 2 }}>{labelName}</Text>
        </>
    );
}
function tabSpecialItem({ color, size }, iconName, labelName) {
    return (
        <View style={{
            backgroundColor: color, position: 'absolute', top: -25, height: 80, width: 80,
            borderRadius: 40, justifyContent: 'center', alignItems: 'center',
            shadowColor: '#00f',
            elevation: 2
        }}>
            <Icon name={iconName} type='font-awesome-5' color="#fff" size={size}
                style={{}} />
            <Text style={{ color: "#fff" }}>{labelName}</Text>
        </View>
    );
}

const AppStack = () => {
    const [cartCount, setCartCount] = useState(0);

    return (
        <Tab.Navigator
            screenOptions={
                {
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        margin: 18,
                        height: 75,
                        borderRadius: 20,
                    },
                    // tabBarIconStyle: {},
                    // tabBarLabelStyle: { fontSize: 16, },
                    // tabBarItemStyle: { padding: 8, },
                    tabBarActiveTintColor: themeColor,
                    tabBarInactiveTintColor: themegrey
                }
            }
        // initialRouteName={'Profile'}
        >
            <Tab.Screen name='Home' options={{

                tabBarIcon: (item) => tabitem(item, "home", "Home"),

                headerRight: () => (
                    <Icon
                        onPress={() => alert('Notification Pane!')}
                        name="bell-o"
                        type='font-awesome'
                        iconStyle={{ padding: 8, borderRadius: 10, borderWidth: 1, marginRight: 10 }}
                    />),

            }}>
                {() => (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="HomeScreen" component={Home} />
                        <Stack.Screen name='Product' component={Product} />
                        {/* <Stack.Screen name='Profile' component={Profile} /> */}
                    </Stack.Navigator>
                )}
            </Tab.Screen>

            <Tab.Screen name='Search' options={{
                tabBarIcon: (item) => tabitem(item, "search1", "Search")
            }} >
                {() => (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="SearchScreen" component={Search} />
                        {/* <Stack.Screen name='ProductList' component={ProductList} /> */}
                        {/* <Stack.Screen name='Profile' component={Profile} /> */}
                    </Stack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen name='Cart' options={{
                tabBarIcon: (item) => tabSpecialItem(item, "shopping-cart", "Cart"),
                tabBarBadge: (cartCount > 0 ? cartCount : null),
                tabBarBadgeStyle: { backgroundColor: "#fff", color: themegrey, borderWidth: 1, top: -15, right: -5 }
            }} >
                {() => (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='CartScreen' >{
                            (props) => <Cart {...props} setCartCount={setCartCount} />
                        }</Stack.Screen>
                        <Stack.Screen name='CheckOut' component={CheckOut} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>

            <Tab.Screen name='Wishlist' component={Wishlist} options={{
                tabBarIcon: (item) => tabitem(item, "hearto", "Wishlist")
            }} />
            <Tab.Screen name='Profile' options={{
                tabBarIcon: (item) => tabitem(item, "user", "Profile"),
                headerRight: () => (
                    <Icon
                        onPress={() => alert('Editted')}
                        name='pencil'
                        type='font-awesome'
                        containerStyle={{ marginRight: 15 }}
                    />)
            }} >
                {() => (
                    <Stack.Navigator screenOptions={{ headerShown: false }}
                    // initialRouteName='Address'
                    >
                        <Stack.Screen name="ProfileScreen" component={Profile} />
                        <Stack.Screen name='EditProfile' component={EditProfile} />
                        <Stack.Screen name='Address' component={Address} />
                        {/* <Stack.Screen name='Profile' component={Profile} /> */}
                    </Stack.Navigator>
                )}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default AppStack