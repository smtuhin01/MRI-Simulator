const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;
mongoose.connect(process.env.MONGO_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
