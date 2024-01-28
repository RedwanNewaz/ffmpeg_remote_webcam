const fs = require('fs');
const cp = require('child_process');
const express = require('express');
const app = express();

app.get('/start', (req, res) => {

// Start the child process in detached mode
const childProcess = cp.spawn('./stream.sh', [], {
    detached: true,
    stdio: 'ignore'
  }); 
  // Detach the child process
  childProcess.unref();
  
  // Write the child process ID to a text file
  fs.writeFile('child_pid.txt', childProcess.pid, (err) => {
      if (err) {
        console.error('Error writing PID to file:', err);
      } else {
        console.log('Child process PID written to file:', childProcess.pid);
      }
    });

    res.send('Webcam started successfully!!');
});

// Endpoint to kill the child process
app.get('/stop', (req, res) => {
    // Kill the child process
    fs.readFile('child_pid.txt', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading PID file:', err);
          return;
        }
        const pid = parseInt(data, 10) + 1;
        console.log('PID read from file:', pid);
        cp.execFile("pkill", ["ffmpeg"], {cwd:"."}, (error, out, err) => {
            if (error) {
                throw error;
            }
            else{
                console.log(out);
            }
        });
    });

    res.send('Webcam stopped');

  });


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  