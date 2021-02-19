const chalk = require('chalk');
const { startServer } = require('./api');

const startApplication = async () => {
  console.log(chalk.cyanBright('Application started'));
  await startServer();
  console.log(chalk.greenBright('App started Successfully'));
};

startApplication();
