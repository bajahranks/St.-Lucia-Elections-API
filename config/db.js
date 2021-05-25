const mongoose = require('mongoose');

// Define database connection url
const URL = process.env.URL || 'mongodb+srv://Ravi:Ivar0212@main.q1ewq.mongodb.net/st-lucia-elections';

mongoose.set('useCreateIndex', true);

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

//Connection establishment
mongoose.connect(URL,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log('Successfully Established Connection with MongoDB')
    }
    else {
      console.log('Failed to Establish Connection with MongoDB with Error: ' + err)
    }
  });

module.exports = mongoose;