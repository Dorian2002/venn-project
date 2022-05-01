import { useState } from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Identification from "./screens/Identification";
import Home from "./screens/Home";
import CreateProject from "./screens/CreateProject";
import Register from "./screens/Register";
import ColorContext from "./ColorContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [color, setColor] = useState(null);
  return (
    <ColorContext.Provider value={[color, setColor]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Identification" component={Identification} />
          <Stack.Screen name="Accueil" component={Home} />
          <Stack.Screen name="S'enregistrer" component={Register} />
          <Stack.Screen name="CréationDeProjet" component={CreateProject} />
        </Stack.Navigator>
      </NavigationContainer>
    </ColorContext.Provider>
  );
}

registerRootComponent(App);
