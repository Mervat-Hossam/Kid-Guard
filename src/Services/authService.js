import { apiFetch } from "./api";

// LOGIN
export async function login(
  email,
  password
) {

  const data = await apiFetch(
    "/auth/login",
    {
      method: "POST",

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  localStorage.setItem(
    "token",
    data.token
  );

  localStorage.setItem(
    "refreshToken",
    data.refreshToken
  );

  return data;
}


//  REGISTER
export async function register(
  name,
  email,
  password
) {

  return await apiFetch(
    "/auth/register",
    {
      method: "POST",

      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );
}


//  LOGOUT
export async function logout() {

  try {

    await apiFetch(
      "/auth/logout",
      {
        method: "POST",
      }
    );

  } catch (err) {
    console.log(err);
  }

  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");

  
}