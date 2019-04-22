const EventEmmiter = require('events');
var url = 'http://logger.io/log';

class Logger extends EventEmmiter {

    log(message){
        // Send an http request
        console.log('Logger going to emit');

        //Raise an event
        this.emit('messageLogged', message)   
    }

}

module.exports = Logger;