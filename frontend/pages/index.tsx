import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

type Item = { id: number; name: string };

export default function Home() {
  const [backendStatus, setBackendStatus] = useState("checking...");
  const [items, setItems] = useState<Item[]>([]);
  const [newName, setNewName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authHeader, setAuthHeader] = useState("");
  const [authStatus, setAuthStatus] = useState("logged out");
  const [protectedResponse, setProtectedResponse] = useState("");

  const loadStatus = () => {
    fetch(`${API}/api/status`)
      .then((r) => r.json())
      .then((d) => setBackendStatus(d.status))
      .catch(() => setBackendStatus("unreachable"));
  };

  const loadItems = () => {
    fetch(`${API}/api/items`)
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  };

  useEffect(() => {
    loadStatus();
    loadItems();
  }, []);

  const addItem = async () => {
    if (!newName) return;
    await fetch(`${API}/api/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    setNewName("");
    loadItems();
  };

  const deleteItem = async (id: number) => {
    await fetch(`${API}/api/items/${id}`, { method: "DELETE" });
    loadItems();
  };

  const login = async () => {
    const header = "Basic " + btoa(`${username}:${password}`);
    const res = await fetch(`${API}/api/protected`, {
      headers: { Authorization: header },
    });
    if (res.ok) {
      setAuthHeader(header);
      setAuthStatus("logged in as " + username);
      const data = await res.json();
      setProtectedResponse(JSON.stringify(data));
    } else {
      setAuthStatus("login failed");
    }
  };

  const logout = () => {
    setAuthHeader("");
    setAuthStatus("logged out");
    setProtectedResponse("");
  };

  const callProtected = async () => {
    const res = await fetch(`${API}/api/protected`, {
      headers: { Authorization: authHeader },
    });
    setProtectedResponse(res.ok ? JSON.stringify(await res.json()) : "unauthorized");
  };

  return (
    <main>
      <h1>Full-Stack Test Drive</h1>

      <section>
        <h2>Status</h2>
        <p>Frontend: ok</p>
        <p>Backend: {backendStatus}</p>
      </section>

      <section>
        <h2>CRUD Items</h2>
        <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="item name" />
        <button onClick={addItem}>Add</button>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} <button onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Authentication</h2>
        <p>Status: {authStatus}</p>
        {!authHeader ? (
          <>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
            <button onClick={login}>Login</button>
          </>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </section>

      <section>
        <h2>Protected API Response</h2>
        <button onClick={callProtected} disabled={!authHeader}>
          Call /api/protected
        </button>
        <p>{protectedResponse}</p>
      </section>
    </main>
  );
}
