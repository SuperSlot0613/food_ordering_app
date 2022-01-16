import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Menu from "./Menu";
import { AuthProvider } from "./Hooks/useAuth";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
import { Provider } from "react-redux";
import { store } from "./Store/store";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <AuthProvider>
            <Menu />
          </AuthProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
