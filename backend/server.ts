import express, {Express} from 'express';
import dashboardRoutes from './src/routes';

const app: Express = express()
const port = 5000

app.use(express.json());
app.use('/api/cars', dashboardRoutes);

app.listen(port,() => console.log(`server listening on port ${port}`))