const path = require('path');
const chalk = require('chalk');
const express = require('express');
const app = require('./server');

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../public');
const DIST_PATH = path.join(__dirname, '../dist');

app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const startServer = () => new Promise((res) => {
  app.listen(PORT, () => {
    console.log(chalk.green(`server listening on port ${PORT}`));
    res();
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, './index.html'));
});

module.exports = {
  startServer,
  app,
};
