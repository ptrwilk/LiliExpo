import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { View } from "react-native";
import { LiliContext, ServerStatus } from "./src/Context/LiliContext";
import Heading from "./src/Core/Heading";
import Main from "./src/Core/Main";
import { Colors } from "./src/styles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndicatorMenu from "./src/Core/IndicatorMenu";

const Header = () => {
  return <View style={{ height: 30, backgroundColor: Colors.WhiteColor }} />;
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [serverStatus, setServerStatus] = useState<ServerStatus>("unknown");
  const navigationRef = useRef<any>();

  const navigate = (routeName: string) => {
    navigationRef.current?.navigate(routeName);
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.WhiteColor} />
      <LiliContext.Provider value={{ serverStatus, setServerStatus }}>
        <Header />
        <Heading navigate={navigate} />
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator>
            <Stack.Screen
              name="home"
              options={{ headerShown: false }}
              component={Main}
            />
            <Stack.Screen
              name="indicator-menu"
              options={{
                headerTitle: "",
                headerBackVisible: true,
                headerShadowVisible: false,
                animation: "slide_from_left",
              }}
              component={IndicatorMenu}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LiliContext.Provider>
    </>
  );
}
