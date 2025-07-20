const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user12:user123@cluster0.gbtrhem.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});
