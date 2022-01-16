import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { AsyncStorage } from "react-native";
import * as Google from "expo-google-app-auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import * as Location from "expo-location";
import { auth } from "../firebase";

const config = {
  iosClientId:
    "233202881824-67nvvnto8un86a52sa66rcncenel660p.apps.googleusercontent.com",
  androidClientId:
    "233202881824-pfnc7e3ltdf7nkru586mv5io2br7rkth.apps.googleusercontent.com",
  scops: ["profile", "email", "games", "location"],
  permissions: ["public_profile", "email", "gender", "location"]
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Wait, we are fetching you location..."
  );

  useEffect(
    () =>
      AsyncStorage.getItem("alreadyLaunched").then(value => {
        if (value == null) {
          AsyncStorage.setItem("alreadyLaunched", "true");
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      }),
    []
  );

  useEffect(
    () =>
      onAuthStateChanged(auth, async user => {
        if (user) {
          //logged in
          setuser(user);
          console.log(user);
        } else {
          setuser(null);
        }
      }),
    []
  );

  // useEffect(() => {
  //   CheckIfLocationEnabled();
  //   GetCurrentLocation();
  // }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Service not enabled",
        "Please enable your location services to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    let  coords  = await Location.getCurrentPositionAsync();
    console.log("Location cords",coords);

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
      console.log("Location Address",response);
      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
        console.log(address);
        setDisplayCurrentAddress(address);
      }
    }
  };

  const removeAsyncStorage = () => {
    AsyncStorage.clear();
    // console.log("remove Asyn");
  };

  const registerWithEmailId = userData => {
    createUserWithEmailAndPassword(auth, userData.Email, userData.Password)
      .then(userCredential => {
        // Signed in
        var user = userCredential.user;
        // console.log(user);
        user.displayName = userData.Name;
        setuser(user);
        // ...
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };

  const signWithEmailId = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        var userinfo = userCredential.user;
        // console.log(userinfo);
        setuser(userinfo);
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const signWithGoogleId = async () => {
    await Google.logInAsync(config)
      .then(async logInResult => {
        if (logInResult.type === "success") {
          // console.log(logInResult)
          const { idToken, accessToken } = logInResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credential);
        }

        return Promise.reject();
      })
      .catch(error => setError(error))
      .finally(() => console.log("LOgin Finally"));
  };

  const signOutPage = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setuser(null);
      })
      .catch(error => {
        // An error happened.
        console.log(error);
      });
  };

  const memoValue = useMemo(
    () => ({
      user,
      isFirstLaunch,
      setIsFirstLaunch,
      signWithGoogleId,
      signOutPage,
      signWithEmailId,
      registerWithEmailId,
      removeAsyncStorage
    }),
    [user, isFirstLaunch]
  );

  return (
    <AuthContext.Provider value={memoValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
