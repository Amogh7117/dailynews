export async function translateText(text, target) {
  if (!text) return "";

  const key = `t_${target}_${text}`;
  const cached = localStorage.getItem(key);
  if (cached) return cached;

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text
  )}&langpair=en|${target}`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    const translated = json.responseData.translatedText;

    localStorage.setItem(key, translated);
    return translated;
  } catch {
    return text;
  }
}
