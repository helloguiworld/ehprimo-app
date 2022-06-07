import { StatusBar } from 'expo-status-bar';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TestScreen from './src/screens/TestScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator
          mode='modal'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name='Test' component={TestScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({
// });
