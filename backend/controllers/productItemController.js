
const ProductItem = require('../models/ProductItem');
// import ProductItem from '../models/ProductItem'

// Express Controller Function
const addItem = async (req, res) => {
    const { productname, productq, prodlocation } = req.body;
    console.log('enter product request--!!!',)
  
    if (!productname || !productq || !prodlocation) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const newItem = new ProductItem({
        productname,
        productq,
        prodlocation,
      });
  
      await newItem.save();
      res.status(201).json({ message: 'Product added successfully', newItem });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };



module.exports = { addItem };
