import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

const RecipeDetails = ({ route }) => {
    const { recipe } = route.params;
    const [imageLoading, setImageLoading] = useState(true);

    const removeHtmlTags = (text) => {
        return text ? text.replace(/<[^>]*>?/gm, '') : '';
    };

    const instructionsArray = removeHtmlTags(recipe.instructions)?.split('\n') || [];

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: recipe.image }}
                    style={styles.recipeImage}
                    resizeMode="cover"
                    onLoadStart={() => setImageLoading(true)}
                    onLoadEnd={() => setImageLoading(false)}
                />
                {imageLoading && (
                    <ActivityIndicator
                        style={styles.loadingIndicator}
                        size="large"
                        color="#000"
                    />
                )}
            </View>
            <Text style={styles.title}>{recipe.title}</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[
                    recipe.extendedIngredients.length > 0 && {
                        type: 'sectionTitle',
                        value: 'Ingredients:',
                    },
                    ...recipe.extendedIngredients.map((item, index) => ({
                        type: 'ingredient',
                        data: item,
                        index,
                    })),
                    instructionsArray.length > 0 && {
                        type: 'sectionTitle',
                        value: 'Instructions:',
                    },
                    ...instructionsArray.map((item, index) => ({
                        type: 'instruction',
                        data: item,
                        index,
                    })),
                ]}
                renderItem={({ item }) => {
                    if (item.type === 'sectionTitle') {
                        return <Text style={styles.sectionTitle}>{item.value}</Text>;
                    } else if (item.type === 'ingredient') {
                        return (
                            <Text style={styles.ingredient}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {item.index + 1}:
                                </Text>
                                 {item.data.original}
                            </Text>
                        );
                    } else if (item.type === 'instruction') {
                        return <Text style={styles.instructions}>{item.data}</Text>;
                    } else {
                        return null;
                    }
                }}
                keyExtractor={(item, index) => `${item.type}-${index}`}
            />
        </View>
    );
};

export default RecipeDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    imageContainer: {
        position: 'relative',
    },
    recipeImage: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    loadingIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ingredient: {
        marginBottom: 5,
    },
    instructions: {
        fontSize: 16,
        marginBottom: 30,
    },
});
