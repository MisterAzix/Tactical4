import React from 'react';
import Puissance4 from './components/puissance4';
import { AppLoading } from 'expo';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { useFonts, SuezOne_400Regular } from '@expo-google-fonts/suez-one';
import { NativeRouter, Route, Link } from "react-router-native";
import Home from './Pages/Home';
import Room from './Pages/Room';

const App = () => {
  let [fontsLoaded] = useFonts({
    SuezOne_400Regular,
  });
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NativeRouter>
      <StatusBar hidden />
      <View style={styles.container}>
        <Route exact path="/room" component={Home} />
        <Route path="/" component={Room} />
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#04091B',
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: "center",
    fontSize: 15
  }
});

export default App;