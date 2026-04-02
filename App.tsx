import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from './screens/LoginScreen';
import { MainScreen } from './screens/MainScreen';
import { HomeScreen } from './screens/HomeScreen';
import { PostScreen } from './screens/PostScreen';
import { Navbar } from './components/navigation/Navbar';
import { ProfileScreen } from './screens/ProfileScreen.tsx';
import{AboutScreen} from './screens/AboutScreen.tsx';
const Stack = createNativeStackNavigator();
const NAVBAR_HEIGHT = 56;

function AppContent() {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Navbar />

        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
            contentStyle: {
              paddingTop: NAVBAR_HEIGHT + insets.top,
            },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Post" component={PostScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});