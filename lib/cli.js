'use strict';

var fs         = require('fs'),
    webdavSync = require('webdav-sync'),
    util       = require('util'),
    colors     = require('colors'),
    path       = require('path'),

    constants  = require('./constants');

function _generateOptionsForWebdav(config) {
    return {
        'local_base'  : config.projectFolder,
        'remote_base' : config.protocol +
                     '://' +
                     [config.username, config.password].join(':') +
                     '@' +
                     config.remotePath,
        'verbose'     : config.verbose
    };
}
exports.connect = function(instance) {
    var messageString    = 'Please make sure that you have a key named: [%s] in [%s]\n',
        formattedMessage = util.format(messageString, instance.red, path.join(__dirname, '.dwsyncrc').green),
        options          = null;

    if (!fs.existsSync('./.dwsyncrc')) {
        process.stdout.write('No configuration file found: .dwsyncrc\n'.red);
        process.exit(constants.ERROR_EXIT);
    }

    options = JSON.parse(fs.readFileSync('./.dwsyncrc'));


    if (options && options[instance]) {
        webdavSync(_generateOptionsForWebdav(options[instance])).start();
    } else {
        process.stdout.write(formattedMessage);
        process.exit(constants.ERROR_EXIT);
    }
};
