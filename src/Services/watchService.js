import { apiFetch } from "./api";


// GET WATCH DATA
export async function getWatchData(
  serialNumber
) {

  return await apiFetch(
    `/watch-data/${serialNumber}`
  );
}


// LINK WATCH
export async function linkWatch(
  serialNumber
) {

  return await apiFetch(
    "/link-watch",
    {
      method: "POST",

      body: JSON.stringify({
        serialNumber,
      }),
    }
  );
}

// UNLINK WATCH 
export async function unlinkWatch(serialNumber) {
  return await apiFetch("/unlink-watch", {
    method: "POST", 
    body: JSON.stringify({ serialNumber }),
  });
}