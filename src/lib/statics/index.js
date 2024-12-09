import { page } from "$app/stores";
import { get } from "svelte/store";

export const IN_DEV = import.meta.env?.MODE == "development";
export const isEwcMode = () => {
  const url = get(page).url;
  const token = url?.searchParams?.get('token') || null;
  return !!token;
}