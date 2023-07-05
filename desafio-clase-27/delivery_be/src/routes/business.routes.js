import { Router } from 'express';
import { getBusinesses, getBusinessById, createBusiness, addProduct } from '../controllers/business.controller.js';

export const businessRoutes = () => {
    const router = Router();

    router.get('/', getBusinesses);
    router.post('/', createBusiness);
    router.get('/:bid', getBusinessById);
    router.post('/:bid/product', addProduct);

    return router;
}