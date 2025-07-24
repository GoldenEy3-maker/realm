export function getKeyLength(algorithm: string): number {
  if (algorithm.startsWith("aes-") || algorithm.startsWith("camellia-")) {
    if (algorithm.includes("256")) return 32;
    if (algorithm.includes("192")) return 24;
    return 16;
  }

  if (algorithm === "chacha20-poly1305") return 32;

  if (algorithm === "des-cbc") return 8;
  if (algorithm === "des-ede3-cbc") return 24;

  if (algorithm === "bf-cbc" || algorithm === "cast5-cbc") return 16;

  return 16;
}
