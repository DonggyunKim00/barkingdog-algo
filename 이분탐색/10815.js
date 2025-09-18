const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const [n, narr, m, marr] = input;

const N = Number(n);
const M = Number(m);
const CARDS = narr
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);
const INTS = marr.split(' ').map(Number);

const solution = (value) => {
  let start = 0;
  let end = N - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (CARDS[mid] === value) return 1;

    if (CARDS[mid] < value) start = mid + 1;
    if (CARDS[mid] > value) end = mid - 1;
  }

  return 0;
};

const answer = INTS.map((v) => solution(v)).join(' ');
console.log(answer);
