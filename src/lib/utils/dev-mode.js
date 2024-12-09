export const consoleLog = (...data) => {
  if (import.meta.env.MODE === "development") {
    console.log(...data);
  }
}