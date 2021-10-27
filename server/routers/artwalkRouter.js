module.exports = data => {
  const express = require('express');
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json(data);
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.json(data.find(k => k.id === Number(id)));
  });

  router.post('/', (req, res) => {
    const reducer = (acc, curr) => Math.max(acc, curr);
    const nextId = data.map(el => el.id).reduce(reducer) + 1;
    const artwalk = {
      id: nextId,
      name: req.body.name,
      bilds: [] // Empty bild array
    };
    data.push(artwalk);
    res.json(artwalk);
  });

  router.post('/:id/bilds', (req, res) => {
    const artwalk = data.find(k => k.id === Number(id));
    artwalk.bilds.push(req.body.bild);
    res.json(artwalk);
  });

  return router;
};