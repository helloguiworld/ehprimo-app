import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import colors from './src/colors';

import { UserContextProvider } from './src/contexts/userContext';

import TestScreen from './src/screens/TestScreen';
import GameScreen from './src/screens/GameScreen';

import PlayerScreen from './src/screens/PlayerScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <UserContextProvider>

        <StatusBar style='auto' />
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              // presentation: 'modal',
              cardStyle: {
                backgroundColor: colors.white,
              },
            }}
          >
            <Stack.Group>
              <Stack.Screen name='Test' component={TestScreen} />
            </Stack.Group>

            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name='Game' component={GameScreen} />
              <Stack.Screen name='Player' component={PlayerScreen} />
              <Stack.Screen name='Registration' component={RegistrationScreen} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>

      </UserContextProvider>
    </SafeAreaProvider >
  );
};
