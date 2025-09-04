import express from 'express';
import userRoutes from './Routes/userRoutes.js'
import { connSetup } from './Config/mongooseConnect.js';
import authRoutes from './Routes/authRoutes.js'

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api',userRoutes);
app.use('/auth',authRoutes);

connSetup();

app.get('/', (req,res) => {
    res.status(200).json({
        message: "Homepage"
    })
});

app.listen(port, () => {
    console.log(`The Server is listening on port no. ${port}`);
})