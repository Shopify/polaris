export default function processCode(code: string) {
  const codeLines = code.trim().split('\n\n');
  const jsx = codeLines.pop() || '';
  return `{
      (() => {
        ${codeLines.join('\n\n')}
        ${
          jsx.trim()?.startsWith('return')
            ? jsx
            : `return (
            <>
              ${jsx}
            </>
          )`
        }
      })()
  }`;
}
