//js general

const express = require('express');
const views = require('./views/index.js');
const apis = require('./apis/index.js');

const port = 9999;
const app = express();

app.set('view engine','ejs');

app.use("/", views);
app.use("/api/v1", apis);

//error handling middleware
app.get("*", (req, res) => {
    res.status(404).json({
        status: "Not Found",
    });
});

app.listen(port, () => {
    console.log(`server challenge ch 6 nyala di port ${port}`);
});