const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const graph = input.slice(1).map((item) => item.split(' ').map(Number));

const [dx, dy] = [
  [1, -1, 0, 0],
  [0, 0, 1, -1],
];

const visited = Array.from({ length: n }, () => Array(m).fill(0));

let cnt = 0; // 그림의 개수 카운팅
let maxArea = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (graph[i][j] === 1 && !visited[i][j]) {
      const area = dfs(i, j);
      cnt += 1;
      maxArea = Math.max(maxArea, area);
    }
  }
}

function dfs(x, y) {
  visited[x][y] = 1;
  let area = 1; // 그림의 너비

  for (let dir = 0; dir < 4; dir++) {
    const mx = x + dx[dir];
    const my = y + dy[dir];

    if (mx < 0 || my < 0 || mx >= n || my >= m) continue;
    if (visited[mx][my] || !graph[mx][my]) continue;

    area += dfs(mx, my);
  }

  return area;
}

console.log(visited);
console.log(cnt + '\n' + maxArea);
