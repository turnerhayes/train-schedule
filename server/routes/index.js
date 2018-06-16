const Router = require('express').Router;
const apiRouter = require('./api');

const router = Router();

router.use('/api/', apiRouter);

module.exports = router;
