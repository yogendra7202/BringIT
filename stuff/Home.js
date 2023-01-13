import { View, FlatList, StyleSheet, Image, ScrollView, Dimensions, Text } from 'react-native'
import slides from '../Data/slides';

const width = Dimensions.get("window").width;
const height = width / 100 * 60; //60%

const Home = () => {

    return (
        <View style={styles.container}>
            {/* <FlatList
                data={slides}
                renderItem={({ item }) => <Child item={item} />}
                horizontal
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.id}
                scrollEventThrottle={32}
            /> */}
            <ScrollView
                style={styles.slider}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            >
                {
                    slides.map((image, index) => (
                        <Image source={{ uri: image }} key={index}
                            style={styles.image}
                        />
                    ))
                }
            </ScrollView>
            <View style={styles.dotgroup}>

                {
                    slides.map((i,k) => (
                        <Text key={i} style={styles.dot}>&#11044;</Text>
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center'
    },
    slider: {
        width,
        height,
        backgroundColor: 'red'
    },
    image: {
        width,
        height,
        resizeMode: 'cover'
    },
    dot: {
        // fontSize: 22,
        color: true ? '#fff' : 'blue',
        marginHorizontal: 2
    },
    dotgroup: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    }
})

export default Home