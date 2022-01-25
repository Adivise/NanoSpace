const chalk = require('chalk');
const delay = require('delay');
const mongoose = require('mongoose');
const { MONGO_URI } = require('../settings/config.js');

module.exports = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await delay(4000);
        console.log(chalk.greenBright('[INFORMATION] Database Connected Successfully'));
    } catch (error) {
        console.log(error);
    }
} 