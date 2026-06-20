import { apiFetch } from "./api";

export async function getZones(
  serialNumber
) {

  return await apiFetch(
    `/allowed-zone/${serialNumber}`
  );
}