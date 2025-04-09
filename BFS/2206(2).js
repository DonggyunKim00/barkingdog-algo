const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const [dx, dy] = [
  [0, 0, 1, -1],
  [1, -1, 0, 0],
];

const bfs = (N, M, graph) => {
  const queue = [[0, 0, 0]]; // x, y, isBreak
  let visited = Array.from(
    { length: N },
    () => Array.from({ length: M }, () => [0, 0]) // 벽을 안부순 거리, 벽을 부순 거리
  );
  visited[0][0][0] = 1;

  let head = 0;
  while (queue.length > head) {
    const [px, py, isBreak] = queue[head++];

    for (let dir = 0; dir < 4; dir++) {
      const mx = px + dx[dir];
      const my = py + dy[dir];

      if (mx < 0 || my < 0 || mx >= N || my >= M) continue;

      // 벽이 아니고 방문 안했을때
      if (graph[mx][my] === 0 && visited[mx][my][isBreak] === 0) {
        visited[mx][my][isBreak] = visited[px][py][isBreak] + 1;
        queue.push([mx, my, isBreak]);
      }

      // 벽이면서 벽을 안부쉈고 방문 안했을때
      if (graph[mx][my] === 1 && !isBreak && visited[mx][my][1] === 0) {
        visited[mx][my][1] = visited[px][py][0] + 1;
        queue.push([mx, my, 1]);
      }
    }
  }

  const answer = visited[N - 1][M - 1].filter((v) => v !== 0);
  return answer.length ? Math.min(...answer) : -1;
};

const [N, M] = input.shift().split(' ').map(Number);
const graph = input.map((item) => item.split('').map(Number));
console.log(bfs(N, M, graph));
