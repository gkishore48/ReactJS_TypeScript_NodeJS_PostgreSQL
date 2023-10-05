import pool from '../connection';
import {SalesDetailsQuery, TotalSalesQuery, TotalInventoryQuery, TotalServiceQuery,GetOEMQuery, GetVechileTypeQuery} from './queries';
import { Request, Response } from 'express';

export const getCars = (req:Request, res:Response) => {
    pool.query(SalesDetailsQuery, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

export const getTotalSales = (req:Request, res:Response) => {
    pool.query(TotalSalesQuery, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

export const getTotalInventory = (req:Request, res:Response) => {
    pool.query(TotalInventoryQuery, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

export const getTotalServicedVechiles = (req:Request, res:Response) => {
    pool.query(TotalServiceQuery, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

export const getVechileType = (req:Request, res:Response) => {
    pool.query(GetVechileTypeQuery, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

export const getOEM = (req:Request, res:Response) => {
    pool.query(GetOEMQuery, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

export const getTotalSalesFiltered = (req:Request, res:Response) => {
    const { oem, vechileType } = req.query
    console.log(oem);
    console.log(vechileType);
    if (oem != 'All' && vechileType == 'All') {
        pool.query(`SELECT SUM(vs.sales), year FROM public.vehicle_sales vs
        JOIN public.car_model_details cm on cm.id = vs.model_id 
        JOIN public.customers ca on ca.id = cm.car_id
        WHERE ca.name = $1
        GROUP BY year
        ORDER BY year`,[oem],(error, results) =>{
            if (error) throw error;
            if (results.rowCount > 0) {
                res.status(200).json(results.rows);
             } else {
                res.status(200).send({ message: "No products found" });
             }
        })   
    }
    else if (oem == 'All' && vechileType != 'All') {
        pool.query(`SELECT SUM(vs.sales), year FROM public.vehicle_sales vs
        JOIN public.car_model_details cm on cm.id = vs.model_id 
        JOIN public.customers ca on ca.id = cm.car_id
        WHERE cm.model_type = $1
        GROUP BY year
        ORDER BY year`,[vechileType],(error, results) =>{
            if (error) throw error;
            if (results.rowCount > 0) {
                res.status(200).json(results.rows);
             } else {
                res.status(200).send({ message: "No products found" });
             }
        })   
    }
    else if (oem == 'All' && vechileType == 'All') {
        pool.query(`SELECT SUM(vs.sales), year FROM public.vehicle_sales vs
        JOIN public.car_model_details cm on cm.id = vs.model_id 
        JOIN public.customers ca on ca.id = cm.car_id
        GROUP BY year
        ORDER BY year`,(error, results) =>{
            if (error) throw error;
            if (results.rowCount > 0) {
                res.status(200).json(results.rows);
             } else {
                res.status(200).send({ message: "No products found" });
             }
        })   
    }
    else {
        pool.query(`SELECT SUM(vs.sales), year FROM public.vehicle_sales vs
        JOIN public.car_model_details cm on cm.id = vs.model_id 
        JOIN public.customers ca on ca.id = cm.car_id
        WHERE ca.name = $1 and cm.model_type = $2
        GROUP BY year
        ORDER BY year`,[oem, vechileType],(error, results) =>{
            if (error) throw error;
            if (results.rowCount > 0) {
                res.status(200).json(results.rows);
             } else {
                res.status(200).send({ message: "No products found" });
             }
        })
    }
}

export const getTotalInventoryFiltered = (req:Request, res:Response) => {
    const { oem, vechileType } = req.query
    if (oem != 'All' && vechileType == 'All') {
        pool.query(`SELECT SUM(vs.inventory), year FROM public.vehicle_sales vs
        JOIN public.car_model_details cm on cm.id = vs.model_id 
        JOIN public.customers ca on ca.id = cm.car_id
        WHERE ca.name = $1
        GROUP BY year
        ORDER BY year`,[oem],(error, results) =>{
            if (error) throw error;
            if (results.rowCount > 0) {
                res.status(200).json(results.rows);
             } else {
                res.status(200).send({ message: "No products found" });
             }
        })   
    }
    else if (oem == 'All' && vechileType != 'All') {
        pool.query(`SELECT SUM(vs.inventory), year FROM public.vehicle_sales vs
        JOIN public.car_model_details cm on cm.id = vs.model_id 
        JOIN public.customers ca on ca.id = cm.car_id
        WHERE cm.model_type = $1
        GROUP BY year
        ORDER BY year`,[vechileType],(error, results) =>{
            if (error) throw error;
            if (results.rowCount > 0) {
                res.status(200).json(results.rows);
             } else {
                res.status(200).send({ message: "No products found" });
             }
        })   
    }
    else if (oem == 'All' && vechileType == 'All') {
        pool.query(TotalInventoryQuery,(error, results) =>{
            if (error) throw error;
            if (results.rowCount > 0) {
                res.status(200).json(results.rows);
             } else {
                res.status(200).send({ message: "No products found" });
             }
        })   
    }
    else {
        pool.query(`SELECT SUM(vs.inventory), year FROM public.vehicle_sales vs
        JOIN public.car_model_details cm on cm.id = vs.model_id 
        JOIN public.customers ca on ca.id = cm.car_id
        WHERE ca.name = $1 and cm.model_type = $2
        GROUP BY year
        ORDER BY year`,[oem, vechileType],(error, results) =>{
            if (error) throw error;
            if (results.rowCount > 0) {
                res.status(200).json(results.rows);
             } else {
                res.status(200).send({ message: "No products found" });
             }
        })
    }
}

export const getTotalServicedVechilesFiltered = (req:Request, res:Response) => {
    const { oem, vechileType } = req.query
    if (oem != 'All' && vechileType == 'All') {
        pool.query(`SELECT SUM(vs.serviced_vechiles), year FROM public.vehicle_sales vs
        JOIN public.car_model_details cm on cm.id = vs.model_id 
        JOIN public.customers ca on ca.id = cm.car_id
        WHERE ca.name = $1
        GROUP BY year
        ORDER BY year`,[oem],(error, results) =>{
            if (error) throw error;
            if (results.rowCount > 0) {
                res.status(200).json(results.rows);
             } else {
                res.status(200).send({ message: "No products found" });
             }
        })   
    }
    else if (oem == 'All' && vechileType != 'All') {
        pool.query(`SELECT SUM(vs.serviced_vechiles), year FROM public.vehicle_sales vs
        JOIN public.car_model_details cm on cm.id = vs.model_id 
        JOIN public.customers ca on ca.id = cm.car_id
        WHERE cm.model_type = $1
        GROUP BY year
        ORDER BY year`,[vechileType],(error, results) =>{
            if (error) throw error;
            if (results.rowCount > 0) {
                res.status(200).json(results.rows);
             } else {
                res.status(200).send({ message: "No products found" });
             }
        })   
    }
    else if (oem == 'All' && vechileType == 'All') {
        pool.query(TotalServiceQuery,(error, results) =>{
            if (error) throw error;
            if (results.rowCount > 0) {
                res.status(200).json(results.rows);
             } else {
                res.status(200).send({ message: "No products found" });
             }
        })   
    }
    else {
        pool.query(`SELECT SUM(vs.serviced_vechiles), year FROM public.vehicle_sales vs
        JOIN public.car_model_details cm on cm.id = vs.model_id 
        JOIN public.customers ca on ca.id = cm.car_id
        WHERE ca.name = $1 and cm.model_type = $2
        GROUP BY year
        ORDER BY year`,[oem, vechileType],(error, results) =>{
            if (error) throw error;
            if (results.rowCount > 0) {
                res.status(200).json(results.rows);
             } else {
                res.status(200).send({ message: "No products found" });
             }
        })
    }
}

export const getCarsFiltered = (req:Request, res:Response) => {
    const { oem, vechileType } = req.query
    if (oem != 'All' && vechileType == 'All') {
        pool.query(`SELECT cm.model_name, cm.model_type,vs.sales, vs.year , ca.name, vs.inventory, vs.serviced_vechiles
        FROM public.vehicle_sales vs 
        JOIN public.car_model_details cm on cm.id = vs.model_id 
        JOIN public.customers ca on ca.id = cm.car_id
        WHERE ca.name = $1
        ORDER BY vs.year desc`,[oem],(error, results) =>{
            if (error) throw error;
            if (results.rowCount > 0) {
                res.status(200).json(results.rows);
             } else {
                res.status(200).send({ message: "No products found" });
             }
        })   
    }
    else if (oem == 'All' && vechileType != 'All') {
        pool.query(`SELECT cm.model_name, cm.model_type,vs.sales, vs.year , ca.name, vs.inventory, vs.serviced_vechiles
        FROM public.vehicle_sales vs 
        JOIN public.car_model_details cm on cm.id = vs.model_id 
        JOIN public.customers ca on ca.id = cm.car_id
        WHERE cm.model_type = $1
        ORDER BY vs.year desc`,[vechileType],(error, results) =>{
            if (error) throw error;
            if (results.rowCount > 0) {
                res.status(200).json(results.rows);
             } else {
                res.status(200).send({ message: "No products found" });
             }
        })   
    }
    else if (oem == 'All' && vechileType == 'All') {
        pool.query(`SELECT cm.model_name, cm.model_type,vs.sales, vs.year , ca.name, vs.inventory, vs.serviced_vechiles
        FROM public.vehicle_sales vs 
        JOIN public.car_model_details cm on cm.id = vs.model_id 
        JOIN public.customers ca on ca.id = cm.car_id
        ORDER BY vs.year desc`,(error, results) =>{
            if (error) throw error;
            if (results.rowCount > 0) {
                res.status(200).json(results.rows);
             } else {
                res.status(200).send({ message: "No products found" });
             }
        })   
    }
    else {
        pool.query(`SELECT cm.model_name, cm.model_type,vs.sales, vs.year , ca.name, vs.inventory, vs.serviced_vechiles
        FROM public.vehicle_sales vs 
        JOIN public.car_model_details cm on cm.id = vs.model_id 
        JOIN public.customers ca on ca.id = cm.car_id
        WHERE ca.name = $1 and cm.model_type = $2
        ORDER BY vs.year desc`,[oem,vechileType],(error, results) =>{
            if (error) throw error;
            if (results.rowCount > 0) {
                res.status(200).json(results.rows);
             } else {
                res.status(200).send({ message: "No products found" });
             }
        })   
    }
}
