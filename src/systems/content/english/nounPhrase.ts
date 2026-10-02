const postModifierPattern = /^(with|on|under|in|beside|near|that|who)\b/i;

export function buildExpandedNounPhrase(base: string, modifiers: readonly string[]): string {
  const beforeNoun = modifiers.filter(modifier => !postModifierPattern.test(modifier));
  const afterNoun = modifiers.filter(modifier => postModifierPattern.test(modifier));
  const head = base.replace('___', beforeNoun.join(' ')).replace(/\s+/g, ' ').trim();
  return [head, ...afterNoun].join(' ');
}
