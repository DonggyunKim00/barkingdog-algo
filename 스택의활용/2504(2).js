const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('');

const X = '()';
const Y = '[]';

const solution = (input) => {
  let pos = -1;
  const stack = [];
  const nums = [];

  input.forEach((s, idx) => {
    stack.push({
      symbol: s,
      idx,
    });

    pos += 1;

    if (pos <= 0) return;

    const fullSymbol = stack[pos - 1].symbol + stack[pos].symbol;

    if (fullSymbol === X) {
      nums.push({
        value: 2,
        range: [stack[pos - 1].idx, stack[pos].idx],
      });
      stack.pop();
      stack.pop();
      return (pos -= 2);
    }

    if (fullSymbol === Y) {
      nums.push({
        value: 3,
        range: [stack[pos - 1].idx, stack[pos].idx],
      });
      stack.pop();
      stack.pop();
      return (pos -= 2);
    }
  });

  if (stack.length > 0) return 0;

  const answerStack = [];
  nums.forEach((v) => {
    if (v.range[1] - v.range[0] === 1) answerStack.push(v);
    else {
      answerStack.forEach((item) => {
        if (item.range[0] > v.range[0] && item.range[1] < v.range[1])
          item.value *= v.value;
      });
    }
  });
  return answerStack.reduce((acc, cur) => acc + cur.value, 0);
};

console.log(solution(input));
