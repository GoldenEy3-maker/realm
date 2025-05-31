export function saveThemeToLS(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
    // Unsupported
  } catch (e) {}
}
