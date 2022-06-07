const { exec } = require("child_process");

function executeCmd(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) return reject(error);
      return resolve({ stdout, stderr });
    });
  });
}

executeCmd("git diff origin/master..HEAD")
  .then(({ stdout, stderr }) => {
    console.log('stderr: ', stderr);
    console.log('stdout', stdout);
  })
  .catch(err => { console.log('Error:', error); });
