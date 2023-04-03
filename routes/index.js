const router = require('express').Router();

const api = require('./api');


router.use('/api', api);


router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;