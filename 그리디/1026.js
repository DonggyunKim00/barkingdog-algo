const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const N = Number(input.shift());
const [A, B] = input.map((item) => item.split(' ').map(Number));

const ASort = A.sort((a, b) => a - b);
const BSort = B.sort((a, b) => b - a);

let answer = 0;
for (let i = 0; i < N; i++) {
  answer += ASort[i] * BSort[i];
}

console.log(answer);
