const Todos = require('../models/todoModel');

module.exports = {
    //key:value pairs consisting of request handlers
    setup(req, res) {
        //seed database
        let starterTodos = [
            {
                username: 'test',
                todo: 'Learn NodeJS',
                isDone: false,
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

    },
    greeting(req, res) {
        res.send({ hi: 'there' });
    },
    create(req, res) {
        if (req.body.id) {
            Todos.findByIdAndUpdate(req.body.id,
                {
                    todo: req.body.todo,
                    isDone: req.body.isDone,
                    hasAttachment: req.body.hasAttachment
                },
                function(err, todo) {
                    if (err) throw (err);
                    res.send('Success');
                }
            );
        }
        else {
            var newTodo = Todos({
                username: 'test',
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });
            newTodo.save(function (err) {
                if (err) throw err;
                res.send('Success')
            });
        }
    },
    update(req, res) {
        if (req.body.id) {
            Todos.findByIdAndUpdate(req.body.id,
                {
                    todo: req.body.todo,
                    isDone: req.body.isDone,
                    hasAttachment: req.body.hasAttachment
                },
                function(err, todo) {
                    if (err) throw (err);
                    res.send('Success');
                }
            );
        }
        else {
            var newTodo = Todos({
                username: 'test',
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });
            newTodo.save(function (err) {
                if (err) throw err;
                res.send('Success')
            });
        }
    },
    delete(req, res) {
        Todos.findByIdAndRemove(req.body.id, function (err) {
            if (err) throw err;
            res.send('Success');
        });
    }
};
