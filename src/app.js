const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");

app.use(express.json());
app.use('/img', express.static('img'));

app.use('/api/v1', apiRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error('ERROR OCCURED!!!', err.message, err.stack);
    res.status(statusCode).json({ message: err.message });

    return;
});

module.exports = app;
