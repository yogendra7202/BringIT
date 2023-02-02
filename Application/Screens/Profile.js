import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert, Pressable, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../Authentication/AuthProvider'
import Icon from 'react-native-vector-icons/FontAwesome';
import { lgtxtSz, midtxtSz, themeColor, txtSz } from '../theme';

const Profile = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <ImageBackground style={styles.mainContainer} source={require('../../src/profileBackground.jpg')}>
      <View style={styles.container}>

        <Image style={styles.profilePic} source={user ? { uri: user.photoURL } : require('../../src/profilePic.png')} />
        <Text style={styles.userName}>{user ? user.displayName : "Guest"}</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.field}>
            <Icon name="envelope" size={lgtxtSz} />
            {/* <Text>Email</Text> */}
            <Text style={styles.fieldTxt}>{user ? user.email : "-"}</Text>
          </View>
          <TouchableOpacity style={styles.field} onPress={() => navigation.navigate('EditPassword')}>
            <Icon name="key" size={lgtxtSz} />
            <Text style={styles.fieldTxt}>Change Password</Text>
            <Icon name="chevron-right" size={midtxtSz} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.field} onPress={() => navigation.navigate('Orders')}>
            <Icon name="shopping-basket" size={lgtxtSz} />
            <Text style={styles.fieldTxt}>My Orders</Text>
            <Icon name="chevron-right" size={midtxtSz} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.field} onPress={() => navigation.navigate('Address')}>
            <Icon name="map-marker" size={lgtxtSz} />
            <Text style={styles.fieldTxt}>My Address</Text>
            <Icon name="chevron-right" size={midtxtSz} style={{ right: 0 }} />
          </TouchableOpacity>

          {/* <Pressable style={styles.field} onPress={update}>
          <Icon name="pencil" size={lgtxtSz} style={{ marginRight: 15 }} />
          <Text style={styles.fieldTxt}>Edit Profile</Text>
        </Pressable> */}
          <Text style={styles.tcTxt} onPress={() => { Alert.alert('Soon Available.') }}>Terms & Conditions</Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.logoutBtnTxt}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  container: {
    flex: 0.85,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderColor: themeColor,
    borderWidth: 2,
    paddingHorizontal: 25,
  },
  profilePic: {
    position: 'absolute',
    borderRadius: 80,
    borderWidth: 2,
    borderColor: themeColor,
    borderBottomWidth: 0,
    width: 130,
    height: 130,
    top: -60,
    right: 70
  },
  userName: {
    fontSize: lgtxtSz,
    fontWeight: 'bold',
    marginVertical: 25,
  },
  field: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    borderWidth: 1,
    borderColor: themeColor,
    borderRadius: 20,
    alignItems: 'baseline',
    marginVertical: 10,
    // marginHorizontal: 25,
  },
  fieldTxt: {
    flex: .98,
    marginLeft: 15,
    fontSize: txtSz,
  },
  tcTxt: {
    alignSelf: 'center',
    fontSize: midtxtSz,
    margin: 12,
    color: themeColor
  },
  logoutBtn: {
    marginHorizontal: 35,
    padding: 18,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
    backgroundColor: themeColor,
    marginBottom: 100
  },
  logoutBtnTxt: {
    fontSize: midtxtSz,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase'
  },
})

export default Profile