import { StatusBar } from 'expo-status-bar';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import colors from './src/colors';

import TestScreen from './src/screens/TestScreen';
import GameScreen from './src/screens/GameScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: 'rgb(255, 45, 85)',
    background: colors.white,
  },
};

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <StatusBar style='auto' />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: 'modal',
            cardStyle: {
              backgroundColor: 'red',
            },
          }}
        >
          <Stack.Screen name='Test' component={TestScreen} />
          <Stack.Screen name='Game' component={GameScreen} />
          <Stack.Screen name='Registration' component={RegistrationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
