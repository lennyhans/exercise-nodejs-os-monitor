const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sqlite3 = require('sqlite3').verbose();

const MemoryController = require('./controllers/memory');
const HostRepository = require('../repositories/repositoryHost');
const HostRepositorySQLite = require('../repositories/repositoryHostSQLite');

const hostRepositorySQLite = new HostRepositorySQLite('../database.db', sqlite3 );
const hostRepository = new HostRepository(hostRepositorySQLite);
const memoryController = new MemoryController(hostRepository);
const indexRouter = require('./routes/index');
const memoryRouter = require('./routes/memory')(memoryController);

hostRepository.open();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/get/resource/memory', memoryRouter);

process.on('SIGTERM', () => {
    debug('SIGTERM signal received: closing HTTP server')
    hostRepository.close();
    server.close(() => {
      debug('HTTP server closed')
    })
  })
  
module.exports = app;
