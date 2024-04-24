import { StyleSheet, View, StatusBar } from 'react-native'
import React from 'react'
import { BottomNavigation } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import  HomeScreen from './HomeScreen';
import RecipeFinder from './RecipeFinder';

const Home = () => {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home', color: '#000' },
    { key: 'recipefinder', title: 'Recipe Finder', icon: 'speedometer' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    recipefinder: RecipeFinder,
  });

  return (
    <View style={{ flex: 1, }}>
      <StatusBar/>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: '#002244' }}
        activeColor="orange" 
        inactiveColor="#fff"
        renderIcon={({ route,color }) => (
          <Ionicons name={route.icon} size={24} color={color} />
        )}
      />
    
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})