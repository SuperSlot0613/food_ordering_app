import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Screens/Home";
import Profile from "./Screens/Profile";
import CustomDrawerContent from "./Screens/CustomDrawerContent";
import Header from "./Component/Header";
import tabs from "./constants/tabs";
import Orders from "./Screens/Orders";
import WishList from "./Screens/WishList";
import Elements from "./Screens/Elements";
import Register from "./Screens/Register";
import useAuth from "./Hooks/useAuth";
import OnboardingScreen from "./Screens/OnboardingScreen";
import ProductScreen from "./Screens/ProductScreen";
import ItemDetails from "./Component/ItemDetails";
import BuyScreen from "./Screens/BuyScreen"
import MapScreen from "./Screens/MapScreen";

const { width } = Dimensions.get("screen");

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) =>
            <Header
              title="Home"
              search
              navigation={navigation}
              scene={scene}
              tabs={tabs.categories}
            />,
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
       <Stack.Screen
          options={{
            header: ({ navigation, scene }) =>
              <Header
                black
                title="Product"
                navigation={navigation}
                scene={scene}
              />,
            cardStyle: { backgroundColor: "#FFFFFF" },
            headerTransparent: true
          }}
          name="ProductScreen"
          component={ProductScreen}
        />
         <Stack.Screen
          options={{
            header: ({ navigation, scene }) =>
              <Header
                black
                title="Item Details"
                navigation={navigation}
                scene={scene}
              />,
            cardStyle: { backgroundColor: "#FFFFFF" },
            headerTransparent: true
          }}
          name="ItemDetails"
          component={ItemDetails}
        />
         <Stack.Screen
          name="MapScreen"
          component={MapScreen}
        />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="YourAccount"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="YourAccount"
        component={Profile}
        options={{
          header: ({ navigation, scene }) =>
            <Header
              black
              title="Profile"
              navigation={navigation}
              scene={scene}
            />,
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

const Menu = () => {
  const { user,isFirstLaunch } = useAuth();

  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => (user!==null && <CustomDrawerContent {...props} />)}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      screenOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName={(user===null && !isFirstLaunch)?"OnboardingScreen":"Home"}
    >
      {user!==null?
      (
        <>
        <Drawer.Screen
          options={{
            headerShown: false
          }}
          name="HomeScreen"
          component={HomeStack}
        />
        <Drawer.Screen
          options={{
            headerShown: false
          }}
          name="YourAccount"
          component={ProfileStack}
        />
        <Drawer.Screen
          options={{
            header: ({ navigation, scene }) =>
              <Header
                black
                title="Recommended"
                navigation={navigation}
                scene={scene}
              />,
            cardStyle: { backgroundColor: "#FFFFFF" },
            headerTransparent: true
          }}
          name="Recommended"
          component={Elements}
        />
        <Drawer.Screen
          options={{
            header: ({ navigation, scene }) =>
              <Header
                black
                title="Your Orders"
                navigation={navigation}
                scene={scene}
              />,
            cardStyle: { backgroundColor: "#FFFFFF" },
            headerTransparent: true
          }}
          name="YourOrders"
          component={Orders}
        />
        <Drawer.Screen
          options={{
            header: ({ navigation, scene }) =>
              <Header
                black
                title="Your WishList"
                navigation={navigation}
                scene={scene}
              />,
            cardStyle: { backgroundColor: "#FFFFFF" },
            headerTransparent: true
          }}
          name="YourWishList"
          component={WishList}
        />
         <Drawer.Screen
          options={{
            header: ({ navigation, scene }) =>
              <Header
                black
                title="Buy Again"
                navigation={navigation}
                scene={scene}
              />,
            cardStyle: { backgroundColor: "#FFFFFF" },
            headerTransparent: true
          }}
          name="BuyAgain"
          component={BuyScreen}
        />
        </>
      ):(
        <>
        {
          !isFirstLaunch ?
          (
            <Drawer.Screen
            options={{
              header: ({ navigation, scene }) =>
                <Header
                  black
                  title="Register"
                  navigation={navigation}
                  scene={scene}
                />,
              cardStyle: { backgroundColor: "#FFFFFF" },
              headerTransparent: true,
              swipeEnabled: false
            }}
            name="Register"
            component={Register}
          />
          ):
          (
            <Drawer.Screen
            options={{
             headerShown: false
            }}
            name="OnboardingScreen"
            component={OnboardingScreen}
          />
          )
        }
        </>
      )
      }
    </Drawer.Navigator>
  );
};

export default Menu;

const styles = StyleSheet.create({});
