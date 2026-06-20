import { apiFetch } from "./api";

export async function getAudio(serial) {
  return await apiFetch(`/audio/${serial}`);
}