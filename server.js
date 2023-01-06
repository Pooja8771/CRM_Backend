const express = require('express');
const mongoose = require('mongoose');
const app = express();

// import port
const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.config');
const routes = require('./routes/auth.routes');
const middlewares = require('./middlewares/auth.middleware');

// connecting to database
  mongoose.set('strictQuery', false);
  mongoose.connect(dbConfig.DB_URL).then(function(){
          console.log("Connected to Mongo DB");
      },function(err){
          console.log("Error while connecting to DB");
      });


//(MIDDLEWARE)
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));
app.use(middlewares.isTokenValid);

 routes(app);
 
  //Starting the server
  app.listen(serverConfig.PORT, ()=>{
      console.log("Application started on the port : "+serverConfig.PORT);
  });