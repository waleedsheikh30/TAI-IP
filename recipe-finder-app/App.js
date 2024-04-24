import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/components/Home';
import Splash from './src/components/Splash';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import myFont from './assets/Fonts/Italianno-Regular.ttf'
import abril from './assets/Fonts/AbrilFatface-Regular.ttf'
import openSansBold from './assets/Fonts/OpenSans-Bold.ttf'
import openSansSemiBold from './assets/Fonts/OpenSans-SemiBold.ttf'
import robotoMedium from './assets/Fonts/Roboto-Medium.ttf'
import robotoLight from './assets/Fonts/Roboto-Light.ttf'
import RecipeDetails from './src/components/RecipeDetails';
import RecipeFinder from './src/components/RecipeFinder';

const Stack = createNativeStackNavigator();


export default function App() {

  const [fontsLoaded] = useFonts({
    'Italiano-light': myFont,
    'Abril': abril,
    'OpenSans-bold': openSansBold,
    'OpenSans-semibold': openSansSemiBold,
    'Roboto-medium': robotoMedium,
    'Roboto-light': robotoLight,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash Screen" component={Splash} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="RecipeFinder" component={RecipeFinder} options={{headerShown: false}}/>
        <Stack.Screen name="RecipeDetails" component={RecipeDetails}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});
