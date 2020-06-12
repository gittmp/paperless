const express = require('express');
const request = require('request');
const app = express();

app.listen(8080, () => console.log('News sever running on PORT:8080'));

app.use(express.static('client'));
/* 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/twitterTrends', (req, res) => {
  request({ 
      url: 'https://api.twitter.com/1.1/trends/place.json?id=' + req.query.placeID 
    }, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ 
            type: 'error', 
            // message: error.message 
        });
      }

      let result = res.json(JSON.parse(body));
      console.log(result);
    }
  )
});
 */