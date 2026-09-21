import { Pressable, View } from "react-native";
import { ThemedText } from "./themed-text";
import { useTheme } from "@/hooks/use-theme";

type CustomerRowProps = {
  name: string;
  balance: number;
  onPress: () => void;
};

export function CustomerRow({ name, balance, onPress }: CustomerRowProps) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{ paddingVertical: 14, borderBottomWidth: 1, borderColor: "#ddd" }}
    >
      <ThemedText style={{ fontSize: 18 }}>{name}</ThemedText>
      <ThemedText>₱{balance.toFixed(2)}</ThemedText>
    </Pressable>
  );
}
