const { Pizza } = require('../models/Pizza');

const pizzaController = {
  // get all pizzas || GET /api/pizzas
  // uses Mongoose's 'find' method
  getAllPizza(req, res) {
    Pizza.find({})
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  // get one pizza by id || GET api/pizzas/:id
  // deconstructed params out of req
  getPizzaById({ params }, res) {
    Pizza.findOne({_id: params.id })
      .then(dbPizzaData => {
        // if no pizza is found, send 404
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' })
          return;
        }
        res.json(dbPizzaData);
      })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        })
  },

  // createPizza
  createPizza({ body }, res) {
    Pizza.create(body)
      .then(dbPizzaData => res.json(dbPizzaData))
      // 400 error if something goes wrong
      .catch(err => res.status(400).json(err));
  },

  // updated pizza by id || PUT /api/pizzas/:id
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbPizzaData => {
        if(!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
        .catch(err=> res.status(400).json(err));
  },

  // delete pizza
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
        .catch(err => res.status(400).json(err));
  }

};

module.exports = pizzaController;