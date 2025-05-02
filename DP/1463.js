const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim();

const N = Number(input);
let store = Array(N + 1).fill(0);

for (let i = 2; i < store.length; i++) {
  const values = [];

  values.push(store[i - 1] + 1);
  if (i % 3 === 0) values.push(store[i / 3] + 1);
  if (i % 2 === 0) values.push(store[i / 2] + 1);

  store[i] = Math.min(...values);
}

console.log(store[N]);

// D[1] = 0
// D[2] = D[1] + 1 = 1
// D[3] = D[1] + 1 = 1
// D[4] = D[3] + 1 = 2
// D[5] = D[4] + 1 = 3
// D[6] = D[2] + 1 = 2
// D[7] = D[6] + 1 = 3
// D[8] = D[4] + 1 = 3
// D[9] = D[3] + 1 = 2
// D[10] = Math.min(D[5] + 1 || D[9] + 1)

// ...

// D[i] = ?
