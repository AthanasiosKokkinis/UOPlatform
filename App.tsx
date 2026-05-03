import React, { useEffect } from 'react';
import 'react-native-url-polyfill';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from './screens/LoginScreen';
import { MainScreen } from './screens/MainScreen';
import { HomeScreen } from './screens/HomeScreen';
import { PostScreen } from './screens/PostScreen';
import { Navbar } from './components/navigation/Navbar';
import { ProfileScreen } from './screens/ProfileScreen.tsx';
import { AboutScreen } from './screens/AboutScreen.tsx';
import { useAuthStore } from './stores/authStore';

const Stack = createNativeStackNavigator();
const NAVBAR_HEIGHT = 56;

function AppContent() {
  const insets = useSafeAreaInsets();
  const { user, initialized, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!initialized) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        {user && <Navbar />}

        <Stack.Navigator
          initialRouteName={user ? 'Main' : 'Login'}
          screenOptions={{
            headerShown: false,
            contentStyle: {
              paddingTop: user ? NAVBAR_HEIGHT + insets.top : 0,
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
    backgroundColor: '#1c1c1c',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
