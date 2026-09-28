export type Customer = {
  id: string;
  name: string;
  balance: number;
  lastPaid: string;
};

const BASE = process.env.EXPO_PUBLIC_API_URL;
if (!BASE) throw new Error("Set EXPO_PUBLIC_API_URL in .env");

//*async : Marks a function that waits. Without it, await on the next line is an error.

async function get(path: string) {
  //*await fetch(): The function stops here. The worker goes back to drawing the screen and returns when the answer arrives.
  //*Promise.race : Whichever finishes first wins. The answer, or the timer.

  const res = await Promise.race([fetch(BASE + path), timeout(8000)]);
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}
//*Promise<Customer[]> The caller gets a promise, never the array itself.

export const fetchCustomers = (): Promise<Customer[]> => get("/api/customers");
export const fetchCustomer = (id: string): Promise<Customer> =>
  get("/api/customers/" + id);

//*timeout: A promise that does nothing but fail, after the time you give it.

function timeout(ms: number): Promise<never> {
  return new Promise((_, fail) =>
    //Step 5 reads this word to pick the message.
    setTimeout(() => fail(new Error("timeout")), ms),
  );
}

export async function addCustomer(
  name: string,
  balance: number,
): Promise<Customer> {
  const res = await Promise.race([
    fetch(BASE + "/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, balance }),
    }),
    timeout(8000),
  ]);
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}
