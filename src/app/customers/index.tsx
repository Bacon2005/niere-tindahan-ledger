import {
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomerRow } from "@/components/customer-row";

import { useState } from "react";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useRouter, useTheme } from "expo-router";
import AddCustomerModal from "@/components/add-customer-modal";
import { useCustomers } from "@/hooks/use-customers";

export default function CustomersScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { status, customers, problem, retry } = useCustomers();
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);

  if (status === "loading")
    return (
      <ThemedView style={styles.middle}>
        <ActivityIndicator />
      </ThemedView>
    );
  if (status === "error")
    return (
      <ThemedView style={styles.middle}>
        <ThemedText>{problem}</ThemedText>
        <Button title="Try again" onPress={retry} />
      </ThemedView>
    );
  if (status === "empty")
    return (
      <ThemedView style={styles.middle}>
        <ThemedText>No customers yet.</ThemedText>
      </ThemedView>
    );

  const shown = customers.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );
  const total = shown.reduce((sum, c) => sum + c.balance, 0);

  return (
    <SafeAreaView style={{ flex: 1, padding: 24, gap: 12 }}>
      <ThemedText style={{ fontSize: 28, fontWeight: "600" }}>
        Customers
      </ThemedText>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search Customers"
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 12,
          borderColor: "white",
          color: "white",
        }}
      />
      <ThemedText style={{ fontSize: 18 }}>
        Total Owed: ₱ {total.toFixed(2)}
      </ThemedText>
      <Button title="Add customer" onPress={() => setAdding(true)} />
      <AddCustomerModal
        visible={adding}
        onClose={() => setAdding(false)}
        onAdded={retry}
      />
      <FlatList
        data={shown}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <CustomerRow
            name={item.name}
            balance={item.balance}
            onPress={() => router.push(`/customers/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <ThemedText>No Customers Match "{query}".</ThemedText>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  middle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.three,
  },
});
