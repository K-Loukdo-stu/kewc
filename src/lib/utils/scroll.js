import { tick } from "svelte";

let T;
export const scrollToEle = ({ id }) => {
  clearTimeout(T);
  T = setTimeout(() => {
    tick().then(() => {
      const ele = document.getElementById(id);
      ele?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, 200);
};