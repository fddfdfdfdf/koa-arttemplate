const winston =  require('winston');
const path = require('path')
require('winston-daily-rotate-file');


const LOG_PATH = path.resolve(__dirname, '../logs')

const transport =new (winston.transports.DailyRotateFile)({
    filename:path.join(LOG_PATH, '%DATE%.log'),
    datePattern:'YYYY-MM-DD-HH',
    zippedArchive:true,
    maxSize:'100m',
    maxFiles:'2d'
});
transport.on('rotate', function(oldFilename, newFilename) {
    // do something fun
});


module.exports.logger = new (winston.Logger)({
    transports: [
        transport
    ]
});



