import { relayInit } from "nostr-tools";

export const relay = relayInit("wss://nostr.zebedee.cloud");

export const DEFAULT_RELAYS = [
  "wss://nostr.zebedee.cloud",
  "wss://nostr-2.zebedee.cloud",
];
