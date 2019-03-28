const app = require('./app/index');
const express = require('express');
const path = require('path');

//server static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 3001;

app.listen(port, () =>
    console.log(`***********Server Running on Port ${port}***********`)
);
