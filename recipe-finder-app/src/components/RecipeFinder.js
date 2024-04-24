import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const predefinedOptions = ['Salt', 'Water', 'Chicken', 'Eggs', 'Tomatoes', 'Potatoes', 'Wheat', 'Flour', 'Cheese'];


const RecipeFinder = () => {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();


    const handleOptionClick = (option) => {
        setIngredients(prevIngredients => prevIngredients ? prevIngredients + ', ' + option : option);
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=9e47f975e42d485595e73d53f7ee1195`);
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRecipeClick = async (recipe) => {
        try {
            // Fetch recipe details from Spoonacular API
            const response = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=9e47f975e42d485595e73d53f7ee1195`);
            const data = await response.json();
            navigation.navigate('RecipeDetails', { recipe: data });
        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recipe Finder</Text>
            <View>
                <TextInput
                    style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 7, marginBottom: 10 }}
                    placeholder="Enter ingredients (separated by commas)"
                    value={ingredients}
                    onChangeText={(text) => setIngredients(text)}
                />
                <View style={{ marginBottom: 10 }}>
                    <FlatList
                        data={predefinedOptions}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleOptionClick(item)} style={styles.option}>
                                <Text style={styles.optionText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <TouchableOpacity onPress={handleSearch} style={styles.seacrhBtn}>
                    <Text style={styles.searchText}>Search</Text>
                </TouchableOpacity>
            </View>

            {loading && (
                <View style={{ marginTop: 20 }}>
                    <ActivityIndicator size="large" color="orange" />
                </View>
            )}

            <FlatList
                data={recipes}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleRecipeClick(item)}>
                        <View style={{ marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                            <Text>Missing Ingredients: {item.missedIngredientCount}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>

    );
};

export default RecipeFinder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFF0',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        fontFamily: 'Abril',
        textAlign: 'center'
    },
    option: {
        backgroundColor: '#f0f0f0',
        padding: 5,
        borderRadius: 10,
        margin: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionText: {
        fontSize: 10,
    },
    seacrhBtn: {
        borderWidth: 1,
        padding: 7,
        borderRadius: 15,
        backgroundColor: '#002244',
        marginBottom: 20
    },
    searchText: {
        textAlign: 'center',
        color: '#fff'
    }
});

