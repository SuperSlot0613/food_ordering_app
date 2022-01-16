import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import useAuth from "../Hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

// const Skip = ({...props}) => <Button title="Skip" color="#000000" />;

// const Next = ({ ...props }) => (
//   <Button title="Next" color="#000000" {...props}></Button>
// );

const OnboardingScreen = () => {
  const { user, isFirstLaunch, setIsFirstLaunch } = useAuth();
  const navigation = useNavigation();

  return (
    <Onboarding
      // SkipButtonComponent={Skip}
      // NextButtonComponent={Next}
      onSkip={() => {
        setIsFirstLaunch(false);
        navigation.replace("Register");
      }}
      onDone={() => {
        setIsFirstLaunch(false);
        console.log("onbordingScreen", isFirstLaunch);
        navigation.replace("Register");
      }}
      pages={[
        {
          backgroundColor: "#a6e4d0",
          image: <Image source={require("../assets/Onboarding1.png")} />,
          title: "Onboarding 1",
          subtitle: "Done with React Native Onboarding Swiper"
        },
        {
          backgroundColor: "#fdeb93",
          image: <Image source={require("../assets/Onboarding2.png")} />,
          title: "Onboarding 2",
          subtitle: "Done with React Native Onboarding Swiper"
        },
        {
          backgroundColor: "#fff",
          image: <Image source={require("../assets/Onboarding3.png")} />,
          title: "Onboarding 3",
          subtitle: "Done with React Native Onboarding Swiper"
        }
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});
