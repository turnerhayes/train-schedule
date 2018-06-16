const Router = require('express').Router;
const request = require('request');

const router = Router();

router.route('/')
  .get(
    (req, res) => req.pipe(request('http://developer.mbta.com/lib/gtrtfs/Departures.csv')).pipe(res)
  );

module.exports = router;
