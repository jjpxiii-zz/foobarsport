const app = require('./app');

// Start your app.
app.listen(3000, 'localhost', err => {
  if (err) {
    return console.error(err.message);
  }
});
