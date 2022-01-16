import { Block, theme } from "galio-framework";
import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  Button
} from "react-native";
import Cards from "../Component/Cards";
import NormalCard from "../Component/NormalCard";
const { width } = Dimensions.get("screen");
import { db } from "../firebase";
import {
  collection,
  getDocs,
} from "@firebase/firestore";
import { selectValue } from "../feature/navSlice";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [foodItem, setfoodItem] = useState([]);
  const navigation = useNavigation();

  useEffect(async () => {
    const passes = await getDocs(collection(db, "fooditem")).then(snapshot =>
      snapshot.docs.map(doc => setfoodItem(doc.data().item))
    );
    // console.log(foodItem);
    // console.log(foodItem[0].image);
  }, []);

  const data=[
    { 
      id:"1",
      images:"https://st.depositphotos.com/3147737/4982/i/950/depositphotos_49827853-stock-photo-medu-vada-a-south-indian.jpg",
      title:"Vada"
    },
    { 
      id:"2",
      images:"https://st.depositphotos.com/3147737/4982/i/950/depositphotos_49827853-stock-photo-medu-vada-a-south-indian.jpg",
      title:"Vada"
    },
    { 
      id:"3",
      images:"https://st.depositphotos.com/3147737/4982/i/950/depositphotos_49827853-stock-photo-medu-vada-a-south-indian.jpg",
      title:"Vada"
    },
    { 
      id:"4",
      images:"https://st.depositphotos.com/3147737/4982/i/950/depositphotos_49827853-stock-photo-medu-vada-a-south-indian.jpg",
      title:"Vada"
    },
    { 
      id:"5",
      images:"https://st.depositphotos.com/3147737/4982/i/950/depositphotos_49827853-stock-photo-medu-vada-a-south-indian.jpg",
      title:"Vada"
    },
    { 
      id:"6",
      images:"https://st.depositphotos.com/3147737/4982/i/950/depositphotos_49827853-stock-photo-medu-vada-a-south-indian.jpg",
      title:"Vada"
    },
  ]

  const value = useSelector(selectValue);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.articles}
    >
      <StatusBar translucent={true} />
      <Block flex>
        <Text style={{ fontSize: 22, marginBottom: 6, fontWeight: "700" }}>
          Eat What makes you Happy
        </Text>
        <Block flex row style={{ justifyContent: "space-evenly" }}>
        {/* <FlatList
          ItemSeparatorComponent={
            Platform.OS !== "android" &&
            (({ highlighted }) =>
              <View
                style={[style.separator, highlighted && { marginLeft: 0 }]}
              />)
          }
          data={data}
          renderItem={({ item, index }) =>
          <NormalCard
            images={item.images}
            title={item.title}
          />}
          numColumns={4}
        /> */}
          <NormalCard
            images="https://st.depositphotos.com/3147737/4982/i/950/depositphotos_49827853-stock-photo-medu-vada-a-south-indian.jpg"
            title="Vada"
            id="
            WUGzyKlfLcBBJr3ejZ2l"
          />
          <NormalCard
            images="https://deih43ym53wif.cloudfront.net/idly-food-india-shutterstock_101041240_7bd8a6703f.jpeg"
            title="Idli"
            id="
            wd3wEQRuCIUahE7e0ohT"
          />
          <NormalCard
            images="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB2piBQQ_kWTQEcjHTycAEYBU62wP4diVCrA&usqp=CAU"
            title="Dosa"
          />
          <NormalCard
            images="https://static.toiimg.com/thumb/52727664.cms?width=1200&height=900"
            title="Chaat"
          />
        </Block>
        <Block flex row style={{ justifyContent: "space-evenly" }}>
          <NormalCard
            images="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p.jpg"
            title="Burger"
          />
          <NormalCard
            images="https://www.whiskaffair.com/wp-content/uploads/2020/08/Kadai-Paneer-2-3.jpg"
            title="Paneer"
          />
          <NormalCard
            images="https://pinchofwellness.com/wp-content/uploads/2020/01/healthier-sweet-potato-fries_1.png"
            title="Fries"
          />
          <NormalCard
            images="https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            title="Healthy"
          />
        </Block>
        <Block flex row style={{ justifyContent: "space-evenly" }}>
          <NormalCard
            images="https://gumlet.assettype.com/freepressjournal/import/2019/04/Rolls-Manias-aloo-chilly-roll.jpg?format=webp&w=400&dpr=2.6"
            title="Rolls"
          />
          <NormalCard
            images="https://i.pinimg.com/originals/e1/da/d5/e1dad5315972c8a9db86fb01d69c7ecb.jpg"
            title="Thali"
          />
          <NormalCard
            images="https://healthyfitnessmeals.com/wp-content/uploads/2018/08/Grilled-chicken-burrito-bowls-10.jpg"
            title="Bowl"
          />
          <NormalCard
            images="https://static.toiimg.com/thumb/msid-73270560,imgsize-411491,width-800,height-600,resizemode-75/73270560.jpg"
            title="Khichdi"
          />
        </Block>
      </Block>
      <Block flex row={false}>
        <Cards
          title="I Love Icecream Re"
          title2="Venella,Chocolate"
          image="https://images.unsplash.com/photo-1516559828984-fb3b99548b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
          price="250"
          horizontal={true}
        />
        <FlatList
          ItemSeparatorComponent={
            Platform.OS !== "android" &&
            (({ highlighted }) =>
              <View
                style={[style.separator, highlighted && { marginLeft: 0 }]}
              />)
          }
          data={foodItem}
          renderItem={({ item, index }) =>
            <Cards
              Key={index}
              title={item.name}
              title2={item.description}
              image={item.image}
              price={item.price}
              id={item?.id}
              horizontal={true}
            />}
        />
      </Block>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
    marginLeft: 8
  },
  scollcard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ff0000"
  }
});
