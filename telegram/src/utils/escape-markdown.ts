export const escapeMarkdown = (text: string): string => {
  const escapeChars = [
    '_',
    '*',
    '[',
    ']',
    '(',
    ')',
    '~',
    '`',
    '>',
    '#',
    '+',
    '-',
    '=',
    '|',
    '{',
    '}',
    '.',
    '!'
  ]
  let escapedText = text
  escapeChars.forEach((char) => {
    escapedText = escapedText.split(char).join('\\' + char)
  })
  return escapedText
}
