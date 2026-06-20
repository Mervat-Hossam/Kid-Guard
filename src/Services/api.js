export async function apiFetch(endpoint, options = {}) {

  const token = localStorage.getItem("token");

  // const res = await fetch(`https://kidsguard.duckdns.org/api${endpoint}`, {
  const res = await fetch(`https://kidsguard-production.up.railway.app/api${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error("API Error: " + res.status);
  }

  return res.json();
}