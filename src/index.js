module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const matchingBrackets = new Map();
  const sameBrackets = new Set();

  for (const [open, close] of bracketsConfig) {
    matchingBrackets.set(close, open);
    if (open === close) {
      sameBrackets.add(open);
    }
  }

  for (const bracket of str) {
    if (sameBrackets.has(bracket)) {
      if (stack.length === 0 || stack[stack.length - 1] !== bracket) {
        stack.push(bracket);
      } else {
        stack.pop();
      }
    } else if (matchingBrackets.has(bracket)) {
      const openBracket = matchingBrackets.get(bracket);
      if (stack.length === 0 || stack.pop() !== openBracket) {
        return false;
      }
    } else {
      stack.push(bracket);
    }
  }

  return stack.length === 0;
};
