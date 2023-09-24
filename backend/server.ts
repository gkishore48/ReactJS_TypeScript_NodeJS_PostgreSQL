import express, {Express} from 'express';
import vehicleRoutes from './src/routes';

const app: Express = express()
const port = 5000

app.use(express.json());
app.use('/api/cars', vehicleRoutes);
app.use('/api/cars/filter', vehicleRoutes);
app.use('/api/cars/sales', vehicleRoutes);
app.use('/api/cars/sales/filter', vehicleRoutes);

app.listen(port,() => console.log(`server listening on port ${port}`))