const Logger = require('./logger');
const logger = new Logger();

// Register a listener and listen for an event
logger.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});

logger.log({id:1, url:'https://'});

