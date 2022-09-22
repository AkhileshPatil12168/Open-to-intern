const express = require('express');
const bodyParser = require('body-parser');
const route = require('../src/route/route');
const mongoose  = require('mongoose');
const app = express();

app.use(bodyParser.json());



mongoose.connect("mongodb+srv://halfblood12168:48586566@project-2-open-to-inter.aiixatn.mongodb.net/Open-to-interns?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});