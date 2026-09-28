import { Customer } from "./customers";

//Nothing here is stored. It is worked out from customers every draw, so it cannot disagree with the list.
export function summarise(customers: Customer[]) {
  const total = customers.reduce((sum, c) => sum + c.balance, 0);
  const owing = customers.filter((c) => c.balance > 0);
  //[...owing] : owing.length === 0 ? 0: Dividing by zero gives NaN , and the screen would read ₱ NaN
  const average = owing.length === 0 ? 0 : total / owing.length;
  //sort changes the array it is given. The copy keeps the server's order intact.
  const ranked = [...owing]
    .sort((a, b) => b.balance - a.balance)
    .map((c) => ({ ...c, share: total === 0 ? 0 : c.balance / total }));
  return {
    total,
    average,
    count: customers.length,
    owing: owing.length,
    settled: customers.length - owing.length,
    ranked,
  };
}
