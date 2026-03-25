export interface PropertyEntry {
  name: string;
  address: string;
  gender: string;
  genderType: 'female' | 'male';
  price: string;
  images: string[];
  order?: number;
}

const TEST_PATTERN = /\btest(?:e|ing)?\b/i;
const REPEATED_CHAR_PATTERN = /(.)\1{4,}/i;

function hasSuspiciousText(value: string) {
  const normalized = value.trim();

  if (!normalized) {
    return true;
  }

  return TEST_PATTERN.test(normalized) || REPEATED_CHAR_PATTERN.test(normalized);
}

function hasGenderMismatch(gender: string, genderType: PropertyEntry['genderType']) {
  const normalized = gender.toLowerCase();
  const mentionsFemale = /girl|female|women/.test(normalized);
  const mentionsMale = /boy|male|men/.test(normalized);

  if (genderType === 'female') {
    return mentionsMale && !mentionsFemale;
  }

  return mentionsFemale && !mentionsMale;
}

function hasValidPrice(price: string) {
  const normalized = price.trim();

  return normalized.length > 0 && /\d/.test(normalized) && !normalized.includes('$');
}

function hasImages(images: string[]) {
  return images.some((image) => image.trim().length > 0);
}

export function isPublishedProperty(entry: PropertyEntry) {
  return (
    !hasSuspiciousText(entry.name) &&
    !hasSuspiciousText(entry.address) &&
    !hasSuspiciousText(entry.gender) &&
    !hasGenderMismatch(entry.gender, entry.genderType) &&
    hasValidPrice(entry.price) &&
    hasImages(entry.images)
  );
}
