const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const Register = require('./models/register')
require('dotenv').config();


const app = express();

app.use(bodyParser.json()) // for parsing json data
app.use(bodyParser.urlencoded({ extended: false }));




const uri = process.env.ATLAS_URI
const port = process.env.PORT || 4000


app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html')) 
});

app.post('/register', async (req, res) => {
  const {
    name, 
    school, 
    classname,
    house, 
    complexion, eye_color, age, guardian_name, guardian_phonenumber } = req.body;

  const register = await new Register({
    name: name,
    school: school,
    classname: classname,
    house: house,
    complexion: complexion,
    eye_color: eye_color,
    age: age,
    guardian_name: guardian_name,
    guardian_phonenumber:guardian_phonenumber
  });
  await register.save()
  return res.send('registration completed')
});

app.get('/allregisteredstudent', async (req, res) => {
  const allstudent = await Register.find()
  if(!allstudent){
    return res.status(404).json({
      message: 'No Registered Student'
    })
  }
  return res.status(201).json({
    students: allstudent
  })
})

app.get('/studentinfo', async (req, res) => {
  const name = req.query.name;

 const registeredStudent = await Register.find({name: name});
 if(!registeredStudent){
   return res.status(404).json({
     message: 'Student Not Found'
   })
 }
 return res.status(201).json({
   'student': registeredStudent
 })
});
 


app.get('/', (req, res) => {
  res.status(200).send({
      status: "success",
      data: {
          message: "API working fine"
      }
  });
});

app.use((req, res) => {
  res.status(404).send('<h1>Page not found</h1>')
})



mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open', ()=>{
  console.log('MongoDB Database connection established successfully');
  app.listen(port, () => {
    console.log(`listening at ${port}`)
  })
})
