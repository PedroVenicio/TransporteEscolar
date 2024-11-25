import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fontisto, AntDesign } from '@expo/vector-icons';
import axios from 'axios';

import Login from './Screens/Login_tela';
import Votacao from './Screens/Votacao_tela';
import Excecao from './Screens/Excecao';
import HomeAdm from './Screens/HomeAdm';
import HomeMotorista from './Screens/HomeMotorista';
import AlunosRota from './Screens/AlunosRota';

function HomeTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
    initialRouteName="Votacao"
    screenOptions={{
      tabBarStyle: { backgroundColor: '#3B1D1D' },
      tabBarActiveTintColor: '#b90000',
      tabBarInactiveTintColor: 'white',
      headerShown: false,
      }}
    >
      <Tab.Screen
        name='Votacao'
        component={Votacao}
        options={{
          tabBarLabel: 'Votação',
          tabBarIcon: ({ color }) => (<AntDesign name="checksquareo" size={24} color={color} />)
        }}
      />
      <Tab.Screen
        name='Excecao'
        component={Excecao}
        options={{
          tabBarLabel: 'Exceção',
          tabBarIcon: ({ color }) => (<AntDesign name="exception1" size={24} color={color} />)
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "red",
          headerTitleAlign: "center"
        }}
      >
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name='HomeAdm' component={HomeAdm} options={{ headerShown: false }} />
        <Stack.Screen name='HomeMotorista' component={HomeMotorista} options={{ headerShown: false }} />
        <Stack.Screen name='AlunosRota' component={AlunosRota} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>);
}