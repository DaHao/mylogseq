const { exec } = require("child_process");

exec("git diff origin/master..HEAD", (error, stdout, stderr) => {
  if (error) {
    console.log('Error:', error);
    return;
  }

  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout: ${typeof stdout}`);
});
