const app = require('./app/index');

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`***********Server Running on Port ${port}***********`)
);
