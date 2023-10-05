import { Router } from 'express';
import { getCars, getCarsFiltered, getTotalSales, getTotalInventory, getTotalServicedVechiles, getTotalServicedVechilesFiltered, getTotalSalesFiltered, getTotalInventoryFiltered, getOEM, getVechileType } from './controller';
const router = Router();

router.get('/', getCars);
router.get('/filter', getCarsFiltered);
router.get('/sales', getTotalSales);
router.get('/inventory', getTotalInventory);
router.get('/serviced_vechiles', getTotalServicedVechiles);
router.get('/sales/filter', getTotalSalesFiltered);
router.get('/inventory/filter', getTotalInventoryFiltered);
router.get('/serviced_vechiles/filter', getTotalServicedVechilesFiltered);
router.get('/oem', getOEM);
router.get('/vechile_type', getVechileType);

export default router;