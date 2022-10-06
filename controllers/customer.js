const Customer = require('../model/customer-model');
const ValidateCustomerInput = require('../services/validate-customer-input');

async function createCustomer(req, res){
  const { isGold, name, phone } = req.body
  const {error} = ValidateCustomerInput(req.body);
  if(error){
    return res.status(400).send(error.details?.[0].message)
  }
  const customer = new Customer({
    isGold,
    name,
    phone
  });

  try{
    const result = await customer.save();
    return res.send(result)
  }catch(err){
    console.log('----', err);
    return res.send(err.message)
  }

}

async function getCustomers(req, res){
  const pageNumber = req.query.pageNumber ?? 1;
  const pageSize = req.query.pageSize ?? 10;
  const customers = await Customer.find()
  .sort('name')
  .skip((pageNumber - 1) * pageSize)
  .limit(pageSize);

  return res.send(customers)
}

async function getCustomer(req, res){
  const customerId = req.params.id;
  if(!customerId) return res.status(400).send('customer ID is required')
  const customer = await Customer.findById(customerId)
  if(!customer) return res.status(404).send('customer with id not found')

  return res.send(customer)
}


async function updateCustomer(req, res){
  const customerId = req.params.id;
  if(!customerId) return res.status(400).send('customer ID is required');

  const { isGold, name, phone } = req.body
  const {error} = ValidateCustomerInput(req.body);
  if(error){
    return res.status(400).send(error.details?.[0].message)
  }
  

  const customer = await Customer.findByIdAndUpdate(customerId, {
    isGold, 
    name, 
    phone 
  }, {
    new: true
  });

  // todo use upsert if not user create
  if(!customer) return res.status(404).send('customer with id not found')

  return res.send(customer)
}


async function deleteCustomer(req, res){
  const customerId = req.params.id;
  if(!customerId) return res.status(400).send('customer ID is required')
  const customer = await Customer.findByIdAndRemove(customerId)
  if(!customer) return res.status(404).send('customer with id not found')

  return res.send(customer)
}




module.exports = {createCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer}