const createError = require('http-errors')
const path = require('path')
const express = require('express')
const publicPath = path.join(__dirname, '..', 'public')
const PORT = process.env.PORT || 5081
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
  app.use(cors());
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  server.listen(PORT, () => {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });

  // Socket IO real-time
  io.on('connection', (client) => {
    client.on('send email', (data) => {

      let transport = nodemailer.createTransport({
        host: 'ssl0.ovh.net',
        port: 587,
        secure: false,
        auth: {
          user: 'donotreply@luxus-private.com',
          pass: '173pTdRBMWc'
        },
        tls:{
          ciphers:'SSLv3'
        }
      });

      const message = {
        from: data.email,
        to: data.mainContactEmail ? data.mainContactEmail : 'pierre.barbe@luxus-private.com, stan.roquette@luxus-private.com',
        cc: data.mainContactEmail ? 'pierre.barbe@luxus-private.com, stan.roquette@luxus-private.com' : '',
        subject: `Luxus dashboard - ${data.subject}`,
        text: data.message
      };

      transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
      })

    })
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

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
