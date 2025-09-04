import express from 'express';
import userRoutes from './Routes/userRoutes.js'

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api',userRoutes);

app.get('/', (req,res) => {
    res.status(200).json({
        message: "Homepage"
    })
});

app.listen(port, () => {
    console.log(`The Server is listening on port no. ${port}`);
})