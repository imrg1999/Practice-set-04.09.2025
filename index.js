import express from 'express';

const app = express();
const port = 3000;



app.get('/', (req,res) => {
    res.status(200).json({
        message: "Homepage"
    })
});

app.listen(port, () => {
    console.log(`The Server is listening on port no. ${port}`);
})