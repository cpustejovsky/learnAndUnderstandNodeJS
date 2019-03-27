const Todos = require('../models/todoModel');

module.exports = function (app) {

    app.get('/api/setupTodos', function(req, res) {

        //seed database
        var starterTodos = [
            {
                username: 'test',
                todo: 'Learn NodeJS',
                isDone: true,
                hasAttachment: false
            },
            {
                username: 'test',
                todo: 'Learn React',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'test',
                todo: 'Build the shit out of this todo app',
                isDone: false,
                hasAttachment: false
            }
        ];
        Todos.create(starterTodos, function (err, results) {
            res.send(results);
        })

    });

}
