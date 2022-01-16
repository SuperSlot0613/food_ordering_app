import { Block, theme } from "galio-framework";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_BASKET, selectBasket } from "../feature/navSlice";

const ItemDetails = () => {
  const route = useRoute();
  const { name, price, description, image, veg, count ,id} = route.params;
  const [itemcount, setitemcount] = useState(1);
  const [extrachess, setextrachess] = useState(0);
  const [Onion, setOnion] = useState(0);
  const [Meat, setMeat] = useState(0);
  const dispatch = useDispatch();
  const basket = useSelector(selectBasket);
  console.log(basket);

  return (
    <SafeAreaProvider>
      <Block flex row={false} style={[styles.card, styles.shadow]}>
        <TouchableOpacity>
          <Block style={styles.imageContainer}>
            <Image
              source={{
                uri: image
              }}
              style={[
                styles.horizontalImage,
                styles.verticalStyles,
                styles.horizontalStyles
              ]}
              resizeMode="stretch"
            />
          </Block>
        </TouchableOpacity>
        <TouchableWithoutFeedback>
          <Block flex row={false} style={[styles.cardDescription]}>
            <Block flex row={false} style={{ alignItems: "center" }}>
              <Text style={{ color: "black", fontWeight: "600", fontSize: 36 }}>
                {name}
              </Text>
              <Text
                size={18}
                style={{ color: "gray", fontWeight: "600", marginTop: 15 }}
              >
                {description}
              </Text>
              <Text
                style={{ color: "crimson", fontWeight: "700", fontSize: 26,marginTop: 20 }}
              >
                ₹{price * itemcount + 30 * extrachess + 20 * Onion + 50 * Meat}
              </Text>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Block flex row={false} style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() =>
                dispatch(
                  ADD_TO_BASKET({
                    id,
                    name,
                    image,
                    description,
                    veg,
                    itemcount,
                    price,
                    extrachess,
                    Onion,
                    Meat
                  })
                )}
            >
              <Block
                style={[
                  {
                    width: 150,
                    height: 42,
                    backgroundColor: "crimson",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                  },
                  styles.shadow
                ]}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 24
                  }}
                >
                  Add Basket
                </Text>
              </Block>
            </TouchableOpacity>
            <Block
              flex
              row
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center"
                }}
                onPress={() => setextrachess(1 + extrachess)}
              >
                <Block
                  style={[
                    {
                      width: 70,
                      height: 45,
                      backgroundColor: "crimson",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      margin: 10
                    },
                    styles.shadow
                  ]}
                >
                  <Image
                    source={{
                      uri:
                        "https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-cheese-netherlands-icongeek26-linear-colour-icongeek26.png"
                    }}
                    style={{ width: 40, height: 40 }}
                    resizeMode="stretch"
                  />
                </Block>
                <Text
                  style={{ color: "black", fontWeight: "600", fontSize: 18 }}
                >
                  Cheese
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: "center"
                }}
                onPress={() => setOnion(1 + Onion)}
              >
                <Block
                  style={[
                    {
                      width: 70,
                      height: 45,
                      backgroundColor: "crimson",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      margin: 10
                    },
                    styles.shadow
                  ]}
                >
                  <Image
                    source={{
                      uri:
                        "https://img.icons8.com/external-soft-fill-juicy-fish/60/000000/external-onion-plant-based-diet-soft-fill-soft-fill-juicy-fish.png"
                    }}
                    style={{ width: 40, height: 40 }}
                    resizeMode="stretch"
                  />
                </Block>
                <Text
                  style={{ color: "black", fontWeight: "600", fontSize: 18 }}
                >
                  Onion
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: "center"
                }}
                onPress={() => setMeat(1 + Meat)}
              >
                <Block
                  style={[
                    {
                      width: 70,
                      height: 45,
                      backgroundColor: "crimson",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      margin: 10
                    },
                    styles.shadow
                  ]}
                >
                  <Image
                    source={{
                      uri:
                        "https://img.icons8.com/office/80/000000/steak-rare.png"
                    }}
                    style={{ width: 40, height: 40 }}
                    resizeMode="stretch"
                  />
                </Block>
                <Text
                  style={{ color: "black", fontWeight: "600", fontSize: 18 }}
                >
                  Meat
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    </SafeAreaProvider>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 370,
    margin: 10
  },
  imageContainer: {
    borderRadius: 3,
    // elevation: 1,
    overflow: "hidden"
  },
  image: {
    borderRadius: 3
  },
  horizontalImage: {
    height: 250,
    width: "auto"
  },
  cardTitle: {
    // flex:1,
    flexWrap: "wrap",
    paddingBottom: 1,
    fontWeight: "700"
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
    alignItems: "center"
  },
  horizontalStyles: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 190,
    borderTopLeftRadius: 190,
    borderBottomLeftRadius: 3
  },
  verticalStyles: {
    borderBottomRightRadius: 190,
    borderBottomLeftRadius: 210
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2
  }
});
