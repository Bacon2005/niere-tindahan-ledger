import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { SEED } from "@/data/customers";
import { useState } from "react";

export default function HomeScreen() {
  const [customers, setCustomers] = useState(SEED);

  const total = customers.reduce((sum, c) => sum + c.balance, 0);
  const customerCount = customers.filter((c) => c.balance > 0).length;
  const totalCustomers = customers.length;
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedText type="code">Mobile Sari-Sari</ThemedText>
          <ThemedText type="title" style={{ textAlign: "left" }}>
            Seven Evelyn
          </ThemedText>
          <ThemedText type="code">MGA UTANG NGA WALA GI BAYAD</ThemedText>
        </ThemedView>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <ThemedText type="code">Total Utang: </ThemedText>
          <ThemedText type="title">₱ {total.toFixed(2)}</ThemedText>
          <ThemedText type="code">Customer with Utang: </ThemedText>
          <ThemedText type="title">
            {customerCount} of {totalCustomers}
          </ThemedText>
        </ThemedView>

        {Platform.OS === "web" && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.one,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
