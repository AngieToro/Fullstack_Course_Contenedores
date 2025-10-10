const express = require('express');
const redis = require('../redis')
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const addedTodos = await redis.getAsync('added_todos'); //'added_todos' es el key y con esto luego se toma el value y lee el valor actual
  const newCount = Number(addedTodos || 0) + 1; //se incrementa el contador
  await redis.setAsync('added_todos',newCount); //lo guarda de nuevo

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
  next()
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  //res.sendStatus(405); // Implement this
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  //res.sendStatus(405); // Implement this
  const { text, done} = req.todo;

  if ( typeof text === 'string' ) req.todo.text = text;
  if ( typeof done === 'boolean' ) req.todo.done = done;

  const update = await req.todo.save();
  res.json(update);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
