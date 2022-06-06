const { exec } = require("child_process");

// git log --stat origin/master..HEAD
// git diff origin/master..HEAD
function executeCmd(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) return reject(error);
      return resolve({ stdout, stderr });
    });
  });
}

executeCmd("git log --stat origin/master..HEAD")
  .then(({ stdout, stderr }) => {
    console.log('stderr: ', stderr);
    console.log('stdout', stdout);
    if (stderr) { console.log('stderr:', stderr); return; }

    if (stdout !== '') {
    }
  })
  .catch(err => { console.log('Error:', error); });
