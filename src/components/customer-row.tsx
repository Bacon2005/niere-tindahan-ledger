import { Pressable, View } from "react-native";
import { ThemedText } from "./themed-text";
import { useState } from "react";

type CustomerRowProps = { name: string; balance: number; lastPaid: string };

export function CustomerRow({ name, balance, lastPaid }: CustomerRowProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      style={{ paddingVertical: 14, borderBottomWidth: 1, borderColor: "#ddd" }}
    >
      <ThemedText style={{ fontSize: 18 }}>{name}</ThemedText>
      <ThemedText>₱{balance.toFixed(2)}</ThemedText>
      {expanded && <ThemedText>Last Paid {lastPaid}</ThemedText>}
    </Pressable>
  );
}
