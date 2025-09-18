const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const N = input.shift();

input.sort((a, b) => a - b);

const two_sum_set = new Set();
for (let i = 0; i < N; i++) {
  for (let j = i; j < N; j++) {
    two_sum_set.add(input[i] + input[j]);
  }
}
const two_sum = [...two_sum_set].sort((a, b) => a - b);

let answer = 0;

for (let i = N - 1; i >= 0; i--) {
  // d
  for (let j = 0; j < N; j++) {
    // c
    const findValue = input[i] - input[j]; // d-c
    let left = 0;
    let right = two_sum.length - 1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (two_sum[mid] === findValue) {
        answer = input[i];
        found = true;
        break;
      }
      if (two_sum[mid] < findValue) left = mid + 1;
      else right = mid - 1;
    }

    if (answer) return console.log(answer);
  }
}
