const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map(Number);
const T = input.shift();

const dp = (max, value) => {
  const store = Array(max + 1).fill(0);

  for (let i = 4; i < store.length; i++) {
    store[1] = 1;
    store[2] = 2;
    store[3] = 4;

    store[i] = store[i - 1] + store[i - 2] + store[i - 3];
  }

  return store[value];
};

const answer = [];

for (let i = 0; i < T; i++) {
  const ansValue = dp(Math.max(...input), input[i]);
  answer.push(ansValue);
}

console.log(answer.join('\n'));
