import "text-encoding";

import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { NostrProvider } from "nostr-react";

import { DEFAULT_RELAYS } from "./constants/relay";
import useColorScheme from "./hooks/useColorScheme";
import useInitApp from "./hooks/useInitApp";
import Navigation from "./navigation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export default function App() {
  const isAppInitialized = useInitApp();
  const colorScheme = useColorScheme();

  if (!isAppInitialized) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <NostrProvider relayUrls={DEFAULT_RELAYS}>
        <SafeAreaProvider>
          <StatusBar />
          <Navigation colorScheme={colorScheme} />
        </SafeAreaProvider>
      </NostrProvider>
    </QueryClientProvider>
  );
}
