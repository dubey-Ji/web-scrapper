const express = require('express');
const router = require('./routes/router');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routing middleware
app.use('/app', router);



// Initializing Port 
const PORT = process.env.PORT || 3000;


app.listen(PORT, (err) => {
  if (err) {
    process.exit(1);
    console.log(err);
  }
  console.log(`Server is running at: ${PORT}`);
});


const APP_DIR = __dirname;
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down gracefully.');
  // Perform cleanup actions here
  process.exit(0);
});


module.exports = {APP_DIR};
