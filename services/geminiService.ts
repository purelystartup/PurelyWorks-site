const CACHE_PREFIX = 'pw_gemini_v1';
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const memoryCache = new Map<string, { image: string; savedAt: number }>();

const getStorage = () => {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const hashString = (value: string) => {
  let hash = 5381;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 33) ^ value.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
};

const getCachedImage = (cacheKey: string) => {
  const inMemory = memoryCache.get(cacheKey);
  if (inMemory && Date.now() - inMemory.savedAt < CACHE_TTL_MS) {
    return inMemory.image;
  }

  const storage = getStorage();
  if (!storage) return null;

  const raw = storage.getItem(cacheKey);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as { image?: string; savedAt?: number };
    if (parsed.image && parsed.savedAt && Date.now() - parsed.savedAt < CACHE_TTL_MS) {
      memoryCache.set(cacheKey, { image: parsed.image, savedAt: parsed.savedAt });
      return parsed.image;
    }
  } catch {
    // Ignore malformed cache entries.
  }

  storage.removeItem(cacheKey);
  return null;
};

const setCachedImage = (cacheKey: string, image: string) => {
  const payload = { image, savedAt: Date.now() };
  memoryCache.set(cacheKey, payload);

  const storage = getStorage();
  if (!storage) return;
  try {
    storage.setItem(cacheKey, JSON.stringify(payload));
  } catch {
    // Ignore storage quota errors.
  }
};

export const generateNanoImage = async (prompt: string): Promise<string | null> => {
  try {
    if (process.env.NEXT_PUBLIC_GEMINI_ENABLED !== 'true') return null;

    const aspectRatio = '16:9';
    const cacheKey = `${CACHE_PREFIX}:${hashString(`${aspectRatio}|${prompt}`)}`;
    const cached = getCachedImage(cacheKey);
    if (cached) return cached;

    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, aspectRatio }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const detail =
        typeof result.error === 'string' && result.error ? ` ${result.error}` : '';
      console.error(`Gemini image request failed: ${response.status}.${detail}`);
      return null;
    }

    if (typeof result.image === 'string') {
      setCachedImage(cacheKey, result.image);
      return result.image;
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};
