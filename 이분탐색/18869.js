const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map(Number));

const [M, N] = input.shift();

function binarySearch(value, arr) {
  let left = 0;
  let right = N - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === value) return mid;
    if (arr[mid] < value) left = mid + 1;
    if (arr[mid] > value) right = mid - 1;
  }
}

const map = new Map(); // 각 행성 유형별 개수를 저장할 Map

for (let i = 0; i < M; i++) {
  const origin = input[i].slice();
  const sorted = input[i].slice().sort((a, b) => a - b);

  const newArr = [];
  for (let j = 0; j < N; j++) {
    const rank = binarySearch(origin[j], sorted);
    newArr.push(rank);
  }

  const key = newArr.join(',');
  map.set(key, (map.get(key) || 0) + 1);
}

console.log(map);

let result = 0;
for (const count of map.values()) {
  if (count > 1) {
    result += (count * (count - 1)) / 2;
  }
}

console.log(result);
