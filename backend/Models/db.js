const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;
mongoose.connect(process.env.MONGO_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
// mongoose.connect(mongo_url)
//     .then(() => {
//         console.log('MongoDB Connected...');
//     }).catch((err) => {
//         console.log('MongoDB Connection Error: ', err);
//     })