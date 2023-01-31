import React, { useEffect, useState } from 'react'
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
import PushNotification from 'react-native-push-notification';
import { notificatonListener, requestUserPermission } from './FireBase/NoticationService';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import Order from './Screens/Order';
import EditPassword from './Screens/EditPassword';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

PushNotification.createChannel(
    {
        channelId: "bring-it", // (required)
        channelName: "Bring IT", // (required)
        //   channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        //   playSound: false, // (optional) default: true
        //   soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        //   importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        //   vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    // (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);
requestUserPermission();
notificatonListener();

function tabitem({ color, size }, iconName, labelName) {


    // async function checkToken() {
    //     const fcmToken = await messaging().getToken();
    //     if (fcmToken) {
    //         console.log("My Token ", fcmToken);
    //     }
    // }

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
            shadowColor: themeColor,
            elevation: 2
        }}>
            <Icon name={iconName} type='font-awesome' color="#fff" size={size}
                style={{}} />
            <Text style={{ color: "#fff" }}>{labelName}</Text>
        </View>
    );
}

const AppStack = () => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <Tab.Navigator
            screenOptions={
                {
                    tabBarShowLabel: false,
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: {
                        position: 'absolute',
                        margin: 10,
                        height: 75,
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: '#bbb'
                    },
                    // tabBarIconStyle: {},
                    // tabBarLabelStyle: { fontSize: 16, },
                    // tabBarItemStyle: { padding: 8, },
                    tabBarActiveTintColor: themeColor,
                    tabBarInactiveTintColor: themegrey,
                    headerShown: false,
                }
            }
        // initialRouteName={'Profile'}
        >
            <Tab.Screen name='Home' options={{

                tabBarIcon: (item) => tabitem(item, "home", "Home"),

                // headerRight: () => (
                //     <Icon
                //         onPress={() => alert('Notification Pane!')}
                //         name="bell-o"
                //         type='font-awesome'
                //         iconStyle={{ padding: 8, borderRadius: 10, borderWidth: 1, marginRight: 10 }}
                //     />),

            }}>
                {() => (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="HomeScreen" component={Home}
                            options={
                                {
                                    headerShown: true,
                                    title: 'BringIT',
                                    headerRight: () => (
                                        <Icon
                                            onPress={() => alert('Notification Pane!')}
                                            name="bell-o"
                                            type='font-awesome'
                                            iconStyle={{ padding: 8, borderRadius: 10, borderWidth: 1 }}
                                        />),
                                }
                            } />
                        <Stack.Screen name='Product' component={Product} />
                        {/* <Stack.Screen name='Profile' component={Profile} /> */}
                    </Stack.Navigator>
                )}
            </Tab.Screen>

            <Tab.Screen name='Search' component={Search} options={{
                headerShown: true,
                tabBarIcon: (item) => tabitem(item, "search1", "Search")
            }} />
            {/* {() => (
                    <Stack.Navigator
                    // screenOptions={{ headerShown: false }}
                    >
                        <Stack.Screen name="SearchScreen" component={Search} /> 
                    </Stack.Navigator>
                )}
            </Tab.Screen> */}
            <Tab.Screen name='Cart' options={{
                tabBarIcon: (item) => tabSpecialItem(item, "opencart", "Cart"),
                tabBarBadge: (cartCount > 0 ? cartCount : null),
                // tabBarBadge: cartCount,
                tabBarBadgeStyle: {
                    backgroundColor: "#fff",
                    color: themegrey,
                    borderWidth: 1,
                    top: -15,
                    // right: -5
                    left: 0
                }
            }} >
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen name='CartScreen' options={
                            {
                                title: 'Cart',
                            }
                        } >
                            {
                                (props) => <Cart {...props} setCartCount={setCartCount} />
                            }
                        </Stack.Screen>
                        <Stack.Screen name='CheckOut' component={CheckOut} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>

            <Tab.Screen name='Wishlist' component={Wishlist} options={{
                tabBarIcon: (item) => tabitem(item, "hearto", "Wishlist"),
                headerShown: true,
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
                    <Stack.Navigator
                    // initialRouteName='Address'
                    >
                        <Stack.Screen name="ProfileScreen" component={Profile}
                            options={({ navigation }) => ({
                                title: 'Profile',
                                headerRight: () => (
                                    <Icon
                                        onPress={() => navigation.navigate('EditProfile')}
                                        name="pencil"
                                        type='font-awesome'
                                    />),
                            })} />
                        <Stack.Screen name='EditProfile' options={{ title: 'Edit Profile' }} component={EditProfile} />
                        <Stack.Screen name='EditPassword' options={{ title: 'Change Password' }} component={EditPassword} />
                        <Stack.Screen name='Address' component={Address} />
                        <Stack.Screen name='Orders' options={{ title: 'My Orders' }} component={Order} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default AppStack