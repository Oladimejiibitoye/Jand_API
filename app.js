const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();

app.use(bodyParser.json()) // for parsing json data

// require routes
// const authRoutes = require('./routes/authRoutes');



const uri = process.env.ATLAS_URI
const port = process.env.PORT || 4000

// base route
// app.use('/api/v1/register', productRoutes);


app.get('/', (req, res) => {
  console.log('l reached here')
  res.status(200).send({
      status: "success",
      data: {
          message: "API working fine"
      }
  });
});



mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open', ()=>{
  console.log('MongoDB Database connection established successfully');
  app.listen(port, () => {
    console.log(`listening at ${port}`)
  })
})
