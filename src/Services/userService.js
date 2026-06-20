import { apiFetch } from "./api";


// GET USER
export async function getCurrentUser() {

  const data = await apiFetch(
    "/user/me"
  );

  return data.user;
}


// UPDATE USER
export async function updateUser(
  name,
  photoUrl
) {

  return await apiFetch(
    "/user/me",
    {
      method: "PUT",

      body: JSON.stringify({
        name,
        photoUrl,
      }),
    }
  );
}


// DELETE ACCOUNT
export async function deleteAccount() {

  return await apiFetch(
    "/user/me",
    {
      method: "DELETE",
    }
  );
}