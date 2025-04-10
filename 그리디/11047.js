const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const [N, K] = input.shift().split(' ').map(Number);
const COINS = input.map(Number);

let amount = K;
let count = 0;

for (let i = N - 1; i >= 0; i--) {
  count += Math.floor(amount / COINS[i]);
  amount %= COINS[i];
}

console.log(count);
