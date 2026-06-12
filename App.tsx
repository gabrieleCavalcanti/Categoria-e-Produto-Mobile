import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/Home";
import Produtos, { Produto } from "./src/screens/Produtos";
import Categorias, { Categoria } from "./src/screens/Categorias";

export type RootStackParamList = {
  Home: undefined,
  Produtos: undefined,
  Categorias: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Produtos"
          component={Produtos}
        />
        <Stack.Screen
          name="Categorias"
          component={Categorias}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
