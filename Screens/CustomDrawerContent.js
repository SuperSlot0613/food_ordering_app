import React, { useState } from "react";
import { ScrollView, StyleSheet, Image, View } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Images from "../assets/logo.png";
import DrawerItem from "../Component/DrawerItem";
import { Avatar } from "react-native-elements";
import useAuth from "../Hooks/useAuth";

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const { user } = useAuth();
  const [image, setImage] = useState(user?.photoURL ? user.photoURL:"");
  const screens = [
    "Home",
    "Your Account",
    "Recommended",
    "Your Orders",
    "Your Wish List",
    "Buy Again",
    "Log Out"
  ];
  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.11} style={styles.header}>
        {/* <Image style={styles.logo} source={Images} /> */}
        {image === ""
          ? <Avatar
              rounded
              icon={{ name: "adduser", type: "antdesign" }}
              size="large"
              activeOpacity={0.7}
              containerStyle={{
                position: "relative",
                zIndex: 10,
                backgroundColor: "gray"
              }}
            />
          : <Avatar
              rounded
              source={{
                uri: image
              }}
              size="large"
              activeOpacity={0.7}
              containerStyle={{ position: "relative", zIndex: 10 }}
            />}
        <View style={styles.nameView}>
          <Text color="#AC2688" style={{ fontSize: 20 }}>
            {user.displayName}
          </Text>
          <Text color="#5E72E4" style={{ fontSize: 14 }} >{user.email}</Text>
        </View>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          <Block
            flex
            style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}
          >
            <Block
              style={{
                borderColor: "rgba(0,0,0,0.2)",
                width: "100%",
                borderWidth: StyleSheet.hairlineWidth
              }}
            />
            <Text color="#8898AA" style={{ marginTop: 16, marginLeft: 8 }}>
              DOCUMENTATION
            </Text>
          </Block>
          {/* <DrawerCustomItem title="Getting Started" navigation={navigation} /> */}
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: theme.SIZES.BASE * 2,
    paddingTop: theme.SIZES.BASE * 2.8,
    // justifyContent: "space-evenly",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    marginBottom: 10,
    borderColor: "#CAD1D7"
  },
  nameView: {
    marginTop: 10,
    marginLeft: 10,
    width: 170
  },
  logo: {
    width: "100%",
    flexWrap: "wrap",
    resizeMode: "center"
  }
});

export default CustomDrawerContent;
