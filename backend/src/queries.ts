export const SalesDetailsQuery = `SELECT cm.model_name, cm.model_type,vs.sales, vs.year , ca.name, vs.inventory, vs.serviced_vechiles
FROM public.vehicle_sales vs 
JOIN public.car_model_details cm on cm.id = vs.model_id 
JOIN public.customers ca on ca.id = cm.car_id
ORDER BY vs.year desc`

export const SalesFilterQuery = `SELECT cm.model_name, cm.model_type,vs.sales, vs.year , ca.name, vs.inventory, vs.serviced_vechiles
FROM public.vehicle_sales vs 
JOIN public.car_model_details cm on cm.id = vs.model_id 
JOIN public.customers ca on ca.id = cm.car_id
WHERE ca.name = 'Suzuki'
ORDER BY vs.year desc`

export const TotalSalesQuery = `SELECT SUM(sales), year 
FROM vehicle_sales
GROUP BY year
ORDER BY year`

export const TotalInventoryQuery = `SELECT SUM(inventory), year 
FROM vehicle_sales
GROUP BY year
ORDER BY year`

export const TotalServiceQuery = `SELECT SUM(serviced_vechiles), year 
FROM vehicle_sales
GROUP BY year
ORDER BY year`

export const GetOEMQuery = `SELECT distinct id, name 
FROM customers
ORDER BY id`

export const GetVechileTypeQuery = `SELECT distinct model_type 
FROM car_model_details`
