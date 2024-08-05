const { CronJob } = require('cron');
const { Data } = require('../services/database.js')

module.exports = new CronJob(
	'0 0 * * 0', 
	function () {
        Data.count().then(e=>console.log('[PING TO MONGODB]'))
	},  
);
 