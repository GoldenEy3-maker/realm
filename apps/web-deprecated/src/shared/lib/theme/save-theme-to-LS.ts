export function saveThemeToLS(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
    // Unsupported
  }
}
