const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const [dx, dy] = [
  [1, -1, 0, 0],
  [0, 0, 1, -1],
];
const [N, M] = input[0].split(' ').map(Number);
const miro = input.slice(1).map((item) => item.split('').map(Number));

const visited = Array.from({ length: N }, () => Array(M).fill(0));
const queue = [[0, 0]];
visited[0][0] = 1;

while (queue.length) {
  const [prev_x, prev_y] = queue.shift();

  for (let dir = 0; dir < 4; dir++) {
    const mx = prev_x + dx[dir];
    const my = prev_y + dy[dir];

    if (mx < 0 || my < 0 || mx >= N || my >= M) continue;
    if (miro[mx][my] === 0 || visited[mx][my]) continue;

    queue.push([mx, my]);
    visited[mx][my] = visited[prev_x][prev_y] + 1;
  }
}

console.log(visited[N - 1][M - 1]);
