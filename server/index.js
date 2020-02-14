const path = require('path')
const express = require('express')
const publicPath = path.join(__dirname, '..', 'public')
const PORT = process.env.PORT || 8081
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const app = express()
const server = require('http').createServer(app)
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const isDev = process.env.NODE_ENV !== 'production'

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  server.listen(PORT, () => {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  })
}

module.exports = app;
