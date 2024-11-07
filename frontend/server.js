//server.js
import { exec } from 'child_process';

exec('npx vite --host classwork.engr.oregonstate.edu --port 4571', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});