import { useEffect, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import { decode, encode } from "base-64";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { relay } from "../constants/relay";

// Polyfill for base64
if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function useInitApp() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Octicons.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
        });
        // Connect to relay
        await relay.connect();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
    // Close the connection when the app is unmounted
    return () => {
      relay.close();
    };
  }, []);

  return isLoadingComplete;
}
