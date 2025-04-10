const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const N = input.shift();
const arr = input.sort((a, b) => b - a);
const selectionArr = [];

for (let i = 0; i < N; i++) {
  selectionArr.push(arr[i] * (i + 1));
}

console.log(Math.max(...selectionArr));
