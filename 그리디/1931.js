const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const N = Number(input.shift());

// 1. 가장 먼저 끝나는 것으로 정렬
// 2. 끝나는 시간이 같다면 시작시간이 작은 것으로 정렬
const arr = input
  .map((item) => item.split(' ').map(Number))
  .sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1];
  });

// 3. 시간이 되는 것 중에서 가장 빨리 시작하는 것 선택
let time = 0;
const select = [];

for (let i = 0; i < arr.length; i++) {
  if (time > arr[i][0]) continue;
  select.push(arr[i]);
  time = arr[i][1];
}

console.log(select.length);
