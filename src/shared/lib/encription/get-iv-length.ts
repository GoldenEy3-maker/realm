export function getIvLength(algorithm: string): number {
  if (algorithm === "chacha20-poly1305") return 12;

  if (
    algorithm.startsWith("des-") ||
    algorithm === "bf-cbc" ||
    algorithm === "cast5-cbc"
  ) {
    return 8;
  }

  // AES, Camellia, and most other algorithms use 16-byte IV
  return 16;
}
