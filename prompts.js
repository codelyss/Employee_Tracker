module.exports.generateListPrompt = function (message, name, dbchoices) {
    var question = {
        type: 'list',
        message: message,
        name: name,
        choices: dbchoices
    };
    return question;
}

module.exports.generateInputPrompt = function (message, name, validateFunction) {
    var question = {
        type: 'input',
        message: message,
        name: name,
        ...(validateFunction != null) && { validate: validateFunction }
    };
    return question;
}

module.exports.generateNumberPrompt = function (message, name, validateFunction) {
    var question = {
        type: 'number',
        message: message,
        name: name,
        ...(validateFunction != null) && { validate: validateFunction }
    };
    return question;
}

module.exports.generateConfirmPrompt = function (message, name) {
    var question = {
        type: 'confirm',
        message: message,
        name: name
    };
    return question;
}
