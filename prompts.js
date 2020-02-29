module.exports.generateListPrompt = function (message, name, dbchoices) {
    var question = {
        type: 'list',
        message: message,
        name: name,
        choices: dbchoices
    };
    return question;
}