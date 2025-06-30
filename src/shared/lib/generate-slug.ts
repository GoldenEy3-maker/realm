const cyrillicToLatin: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

function transliterate(text: string): string {
  return text
    .toLowerCase()
    .split("")
    .map((char) => cyrillicToLatin[char] ?? char)
    .join("");
}

/**
 * Generates a slug from a value with transliteration cyrillic to latin.
 * @param value - The value to generate a slug from
 * @returns The slug
 */
export function generateSlug(value: string) {
  return transliterate(value).replace(/ /g, "-");
}
