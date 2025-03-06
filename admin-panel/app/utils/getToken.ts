/** @format */

export default function getToken() {
  // Retrieve and parse the `persist:root` item from localStorage
  const persistedState = localStorage.getItem("persist:root");

  if (persistedState) {
    try {
      const parsedState = JSON.parse(persistedState);
      const authState = parsedState.auth ? JSON.parse(parsedState.auth) : null;
      return authState ? authState.token : null;
    } catch (error) {
      console.error("Error parsing token:", error);
      return null;
    }
  }

  return null;
}
