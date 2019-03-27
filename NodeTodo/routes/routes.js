const ApiController = require('../controllers/apiController');

module.exports = (app) => {
    app.post('/api/drivers', ApiController.create);
    app.get('/api', ApiController.greeting);
    app.put('/api/todos/:id', ApiController.update);
    app.delete('/api/todos/:id', ApiController.delete);
    app.get('/api/todos/setuptodos', ApiController.setup);
};
