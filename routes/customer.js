const express = require('express');
const {createCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer} = require('../controllers/customer');
const router = express();

router.post('/', createCustomer)
router.get('/', getCustomers)
router.get('/:id', getCustomer)
router.put('/:id', updateCustomer)
router.delete('/:id', deleteCustomer);

module.exports = router;