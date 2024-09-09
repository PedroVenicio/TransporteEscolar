import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fontisto, MaterialIcons, AntDesign } from '@expo/vector-icons';
import axios from 'axios';

import Login from './Screens/Login_tela';
import Votacao from './Screens/Votacao_tela';
import Localizacao from './Screens/Localizacao';
import Pagamento from './Screens/Pagamentos';

function HomeTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName='HomeTabs'
      screenOptions={{
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "grey",
        tabBarActiveBackgroundColor: "transparent",
        tabBarInactiveBackgroundColor: "transparent",
        headerStyle: { backgroundColor: "red" },
        headerTitle: ' '
      }}
    >
      <Tab.Screen
        name='Localizacao'
        component={Localizacao}
        options={{
          tabBarLabel: 'Localizacao',
          tabBarIcon: ({ color }) => (<Fontisto name="bus" size={30} color={color} />)
        }}
      />
      <Tab.Screen
        name='Votacao'
        component={Votacao}
        options={{
          tabBarLabel: 'Votação',
          tabBarIcon: ({ color }) => (<AntDesign name="checksquareo" size={24} color={color} />)
        }}
      />
      <Tab.Screen
        name='Pagamento'
        component={Pagamento}
        options={{
          tabBarLabel: 'Pagamento',
          tabBarIcon: ({ color }) => (<MaterialIcons name="attach-money" size={38} color={color} />)
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
