const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const fs = require('fs');

app.use('/', express.static(path.join(__dirname, './public')));

app.get('/swatches/', (req, res) => {
  fetchSwatches('all', res.json.bind(res));
});

app.get('/swatches/:family', (req, res) => {
  if (req.params.family === 'reds' || req.params.family === 'red') {
    fetchSwatches('red', res.json.bind(res));
  } 
  
  else if (req.params.family === 'greens' || req.params.family === 'green') {
    fetchSwatches('green', res.json.bind(res));
  } 
  
  else {
    fs.readFile('./data.json', (err, data) => {
      fetchSwatches('all', res.json.bind(res));
    })
  }
});

app.listen(port, () => { console.log(`App running on port ${port}!`) });


const fetchSwatches = (color, responder) => {
  fs.readFile('./data.json',
    (err, data) => {
      if (err) { throw err };

      const parsedData = JSON.parse(data);

      if (color === 'all') {
        responder(parsedData);
      } 
      
      else {
        const filteredData = parsedData.colors.filter(swatch => swatch.family === color);
        responder(filteredData);
      }
    }
  )
}