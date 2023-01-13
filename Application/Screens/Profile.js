import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../Authentication/AuthProvider'
import Icon from 'react-native-vector-icons/FontAwesome';

const txtSz = 20, midTxtSz = 22, lgTxtSz = 26;
const themecolor = '#006699';

const Profile = () => {
  const { user, logout, update } = useContext(AuthContext);
  return (
    <ImageBackground style={styles.mainContainer} source={require('../../src/profileBackground.jpg')}>
      <View style={styles.container}>

        <Image style={styles.profilePic} source={user ? { uri: user.photoURL } : require('../../src/profilePic.png')} />
        <Text style={styles.userName}>{user ? user.displayName : "Guest"}</Text>

        <View style={styles.field}>
          <Icon name="envelope" size={lgTxtSz} />
          {/* <Text>Email</Text> */}
          <Text style={styles.fieldTxt}>{user ? user.email : "-"}</Text>
        </View>
        <View style={styles.field}>
          <Icon name="phone" size={lgTxtSz} />
          {/* <Text>Phone No.</Text> */}
          <Text style={styles.fieldTxt}>{user ? user.phoneNumber : "-"}</Text>
        </View>
        <View style={styles.field}>
          <Icon name="calendar" size={lgTxtSz} />
          {/* <Text>Password</Text> */}
          <Text style={styles.fieldTxt}>01-Sept-2001</Text>
        </View>
        <View style={styles.field}>
          <Icon name="map-marker" size={lgTxtSz} />
          {/* <Text>Address</Text> */}
          <View>
            <Text style={styles.fieldTxt}>Building No.</Text>
            <Text style={styles.fieldTxt}>Street, Block</Text>
            <Text style={styles.fieldTxt}>City, State - Pincode</Text>
          </View>
        </View>
        {/* <Pressable style={styles.field} onPress={update}>
          <Icon name="pencil" size={lgTxtSz} style={{ marginRight: 15 }} />
          <Text style={styles.fieldTxt}>Edit Profile</Text>
        </Pressable> */}
        <Text style={styles.tcTxt} onPress={() => { Alert.alert('Soon Available.') }}>Terms & Conditions</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutBtnTxt}>Log Out</Text>
        </TouchableOpacity>
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
    borderColor: themecolor,
    borderWidth: 2,
    paddingHorizontal: 25,
  },
  profilePic: {
    position: 'absolute',
    borderRadius: 80,
    borderWidth: 2,
    borderColor: themecolor,
    borderBottomWidth: 0,
    width: 130,
    height: 130,
    top: -60,
    right: 70
  },
  userName: {
    fontSize: lgTxtSz,
    fontWeight: 'bold',
    marginVertical: 25,
  },
  field: {
    flexDirection: 'row',
    padding: 20,
    borderWidth: 1,
    borderColor: themecolor,
    borderRadius: 20,
    alignItems: 'flex-start',
    marginVertical: 12,
    // marginHorizontal: 25,
  },
  fieldTxt: {
    marginLeft: 15,
    fontSize: txtSz,
  },
  tcTxt: {
    alignSelf: 'center',
    fontSize: midTxtSz,
    margin: 16,
    color: themecolor
  },
  logoutBtn: {
    marginHorizontal: 35,
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
    backgroundColor: themecolor,
  },
  logoutBtnTxt: {
    fontSize: midTxtSz,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase'
  },
})

export default Profile