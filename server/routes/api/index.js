const Router = require('express').Router;
const scheduleRouter = require('./schedule');

const router = Router();

router.use('/schedule/', scheduleRouter);

module.exports = router;
