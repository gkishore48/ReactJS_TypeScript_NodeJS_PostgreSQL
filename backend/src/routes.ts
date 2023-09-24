import { Router } from 'express';
import {getCars, getCarsFiltered, getTotalSales, getTotalSalesFiltered} from './controller';
const router = Router();

router.get('/', getCars);
router.get('/filter', getCarsFiltered);
router.get('/sales', getTotalSales);
router.get('/sales/filter', getTotalSalesFiltered);

export default router;

