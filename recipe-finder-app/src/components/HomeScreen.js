import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const data = [
    { image: require('../../assets/carousel/slider1.png') },
    { image: require('../../assets/carousel/slider2.png') },
    { image: require('../../assets/carousel/slider3.png') },
    { image: require('../../assets/carousel/slider4.png') },
    { image: require('../../assets/carousel/slider5.png') }
];

const categories = [
    { id: 0, uri: require('../../assets/carousel/slider1.png'), title: 'Chowmin', desc: 'Chow mein is a popular Chinese stir-fried noodle dish, typically made with egg noodles, vegetables, and a variety of protein such as chicken, beef, or shrimp. Its known for its savory flavor and versatility, often seasoned with soy sauce, garlic, and ginger.'},
    { id: 1, uri: require('../../assets/carousel/slider2.png'), title: 'Pasta', desc: 'Pasta is a staple Italian dish made from unleavened dough of durum wheat flour, mixed with water or eggs, then formed into various shapes such as spaghetti, penne, or fettuccine. Its often served with a variety of sauces, including marinara, Alfredo, or pesto, making it a versatile and beloved comfort food worldwide.' },
    { id: 2, uri: require('../../assets/carousel/slider3.png'), title: 'Pizza', desc: 'Pizza is an iconic Italian dish consisting of a yeasted flatbread topped with tomato sauce, cheese, and various toppings such as pepperoni, mushrooms, or vegetables. Its baked in a hot oven, resulting in a crispy crust and gooey melted cheese, making it a favorite comfort food enjoyed globally.'},
    { id: 3, uri: require('../../assets/carousel/slider4.png'), title: 'Burger', desc: 'A burger is a sandwich consisting of a cooked patty of ground meat, typically beef, served in a sliced bun. Its often accompanied by various toppings such as lettuce, tomato, cheese, and condiments like ketchup or mayonnaise, making it a classic comfort food enjoyed in many variations worldwide.'},
    { id: 4, uri: require('../../assets/carousel/slider5.png'), title: 'Sandwich', desc: 'A sandwich is a versatile meal made by placing fillings such as meat, cheese, or vegetables between slices of bread. Its a convenient and customizable option for a quick lunch or snack, enjoyed in various styles from classic PB&J to gourmet club sandwiches.'},
];

const { width: screenWidth } = Dimensions.get('window');


const SPACING = 5;


const HomeScreen = () => {

    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    const handleSearchTextChange = (text) => {
        setSearchText(text);
    };

    const [activeIndex, setActiveIndex] = React.useState(0);

    const _renderItem = ({ item, index }) => {
        return (
            <>
                <View style={styles.itemContainer}>
                    <Image source={item.image} style={styles.image} />
                </View>
            </>
        );
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>FOODIEMOODIE</Text>
                        <View style={{ flexDirection: 'row', marginTop: 3 }}>
                            <TouchableOpacity onPress={toggleSearch}>
                                <Ionicons name='search-outline' size={20} style={styles.searchIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons name='home-outline' size={20} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    {searchVisible && (
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search..."
                                value={searchText}
                                onChangeText={handleSearchTextChange}
                            />
                            <TouchableOpacity onPress={toggleSearch}>
                                <Ionicons name='close-outline' size={20} style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                    )}
                <Text style={{ fontSize: 27, fontFamily: 'Abril' }}>Discover</Text>
                <View style={styles.carousel}>
                    <Carousel
                        layout={'default'}
                        data={data}
                        renderItem={_renderItem}
                        sliderWidth={screenWidth}
                        itemWidth={screenWidth}
                        onSnapToItem={(index) => setActiveIndex(index)}
                    />
                    <Pagination
                        dotsLength={data.length}
                        activeDotIndex={activeIndex}
                        containerStyle={{ paddingTop: 10 }}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        }}
                        inactiveDotStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.25)'
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                    />
                </View>

                <View style={styles.categoriesSection}>
                    <Text style={styles.categoriesText}>Categories</Text>
                    <FlatList
                        data={categories}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ width: 100, marginRight: 38 }}>
                                    <Image source={item.uri} style={styles.itemImage} />
                                    <Text style={styles.itemText} numberOfLines={1}>
                                        {item.title}
                                    </Text>
                                </View>
                            );
                        }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>

                <View>
                    <Text style={styles.popularText}>Popular Recipes</Text>
                    <FlatList
                        data={categories}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <View style={{ width: '70%', marginBottom: 20 }}>
                                        <Image source={item.uri} style={styles.itemPopularImage} />
                                        <View style={{ marginLeft: 5 }}>
                                            <Text style={styles.popularTitle}>{item.title}</Text>
                                            <Text style={styles.popularDesc}>{item.desc}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#FFFFF0',
        marginBottom: 0
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 17,
        color: 'orange',
        fontFamily: 'OpenSans-bold',
        marginBottom: 30
    },
    searchIcon: {
        marginRight: 10
    },

    carousel: {
        height: '13%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    itemContainer: {
        width: screenWidth,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '95%',
        height: '100%',
        resizeMode: 'cover',
        marginTop: 30,
        borderRadius: 15,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 7,
        marginBottom: 10
    },
    closeIcon: {
        marginLeft: 10,
        color: '#aaa',
    },
    categoriesSection: {
        marginBottom: 20
    },
    categoriesText: {
        marginBottom: 10,
        fontSize: 17,
        fontFamily: 'Abril'
    },
    itemText: {
        fontSize: 30,
        position: 'absolute',
        bottom: SPACING * 0,
        backgroundColor: 'rgba(128,128,128,0.5)',
        width: "129.5%",
        height: 45,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        textAlign: 'center',
        fontFamily: 'Italiano-light',
        color: 'orange',

    },
    itemImage: {
        width: '130%',
        height: 100,
        objectFit: 'cover',
        borderWidth: 5,
        borderRadius: 15

    },
    popularText: {
        fontFamily: 'Abril',
        fontSize: 20,
        marginBottom: 13
    },
    itemPopularImage: {
        width: '143%',
        height: 160,
        objectFit: 'cover',
        borderWidth: 5,
        borderRadius: 15,
    },
    popularTitle: {
        fontFamily: 'Roboto-medium',
        fontSize: 20,
        fontWeight: 'bold'
    },
    popularDesc: {
        fontFamily: 'Roboto-light',
        color: '#999',
        width: 300,
        marginBottom: 10
    }
})