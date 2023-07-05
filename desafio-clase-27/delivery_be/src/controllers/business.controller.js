import Business from '../services/business.dao.js';

const businessService = new Business();

export const getBusinesses = async (req, res) => {
    const result = await businessService.getBusinesses();
    if (!result) return res.status(500).send({ status: 'ERR', error: 'No se pudo recuperar la lista' });
    res.status(200).send({ status: 'OK', result: result });
}

export const getBusinessById = async (req, res) => {
    const { bid } = req.params;
    const result = await businessService.getBusinessById(bid);
    if (!result) return res.status(500).send({ status: 'ERR', error: 'No se pudo recuperar el registro' });
    res.status(200).send({ status: 'OK', result: result });
}

export const createBusiness = async (req, res) => {
    const business = req.body;
    const result = await businessService.saveBusiness(business);
    if (!result) return res.status(500).send({ status: 'ERR', error: 'No se pudo guardar el registro' });
    res.status(200).send({ status: 'OK', result: result });
}

export const addProduct = async (req, res) => {
    const { bid } = req.params;
    const product = req.body;
    const business = await businessService.getBusinessById(bid);
    business.products.push(product);
    await businessService.updateBusiness(business._id, business);
    res.status(200).send({ status: 'OK', result: 'Updated' });
}