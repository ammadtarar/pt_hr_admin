const createError = require('http-errors')
const path = require('path')
const express = require('express')
const publicPath = path.join(__dirname, '..', 'public')
const PORT = process.env.PORT || 8081
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const firebase = require('./firebase/firebase')
const CircularJSON = require('circular-json')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const socketSyncBanque = require('./socket-sync-banque')(io)
const dotenv = require('dotenv').config()
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const isDev = process.env.NODE_ENV !== 'production';

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
  app.use(cors());
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(publicPath));

  server.listen(PORT, () => {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });

  app.use(require('./routes/devis'))
  app.use(require('./routes/factures'))
  app.use(require('./routes/configuration'))
  app.use(require('./routes/factures'))
  app.use(require('./routes/impayees'))
  app.use(require('./routes/livre-recettes'))
  app.use(require('./routes/tresorerie'))
  app.use(require('./routes/comptes'))
  app.use(require('./routes/compte-infos'))
  app.use(require('./routes/carte-bancaire'))

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}

module.exports = app;
