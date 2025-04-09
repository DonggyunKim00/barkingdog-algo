const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const T = input.shift();

function solution() {
  for (let i = 0; i < T; i++) {
    const [n, nums] = input.slice(i * 2, i * 2 + 2);
    const total = Number(n);
    const students = [-1, ...nums.split(' ').map(Number)];

    console.log(bfs(total, students));
  }
}

function bfs(total, graph) {
  const visited = Array(total + 1).fill(false);
  let count = 0;

  for (let i = 1; i <= total; i++) {
    if (visited[i]) continue;

    let current = i;
    const path = [];

    while (!visited[current]) {
      visited[current] = true;
      path.push(current);
      current = graph[current];
    }

    const idx = path.indexOf(current);
    if (idx !== -1) {
      count += path.length - idx;
    }
  }

  return total - count;
}

solution();
