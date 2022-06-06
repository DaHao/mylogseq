const { exec } = require("child_process");

function executeCmd(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) return reject(error);
      return resolve({ stdout, stderr });
    });
  });
}

executeCmd("git diff origin/master..HEAD");

exec(, (error, stdout, stderr) => {
  if (error) {
    console.log('Error:', error);
    return;
  }

  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout: ${stdout === ''}`);
});
