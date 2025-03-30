import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import './addprod.css';

function Addproduct() {
  const [product, setproduct] = useState('');
  const [quantity, setquantity] = useState('');
  const [location, setlocation] = useState('');
  const [product1, setproduct1] = useState('');
  const [quantity1, setquantity1] = useState('');
  const [location1, setlocation1] = useState('');
  const [formdata, setformdata] = useState([]);
  const [edit, setedit] = useState('');
  const [search, setsearch] = useState('');

  const addProduct = async (formData) => {
    try {
      const response = await axiosInstance.post('/api/tasks/add', formData);
      console.log('response----->', response);
      alert('Product item added successfully');
    } catch (error) {
      alert('Product add failed. Please try again.');
    }
  };
  

  const handlesubmit = async (a) => {
    a.preventDefault();
    const newProduct = { productname: product, productq: quantity, prodlocation: location };
    try {
      await addProduct(newProduct);
      setformdata([...formdata, newProduct]);
      setproduct('');
      setquantity('');
      setlocation('');
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  function del(i) {
    const newlist = [...formdata];
    newlist.splice(i, 1);
    setformdata(newlist);
  }

  function ed(i) {
    setedit(i);
    setproduct1(formdata[i].productname);
    setquantity1(formdata[i].productq);
    setlocation1(formdata[i].prodlocation);
  }

  function savedata(i) {
    const newdata = [...formdata];
    newdata[i] = { productname: product1, productq: quantity1, prodlocation: location1 };
    setformdata(newdata);
    setedit('');
    setproduct1('');
    setquantity1('');
    setlocation1('');
  }

  const filteredData = formdata.filter((data) =>
    data.productname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type='text'
        onChange={(e) => setsearch(e.target.value)}
        placeholder='Search products...'
        value={search}
      />

      <form onSubmit={handlesubmit}>
        <input
          type='text'
          value={product}
          placeholder='Product Name'
          onChange={(e) => setproduct(e.target.value)}
          required
        />
        <input
          type='text'
          value={quantity}
          placeholder='Quantity'
          onChange={(e) => setquantity(e.target.value)}
          required
        />
        <input
          type='text'
          value={location}
          placeholder='Ship To'
          onChange={(e) => setlocation(e.target.value)}
          required
        />
        <input type='submit' value='Add' />
      </form>

      <div className='m-container'>
        {filteredData.map((data, i) => {
          if (edit === i) {
            return (
              <div key={i} className='edit-form-container'>
                <input
                  type='text'
                  className='edit-input'
                  value={product1}
                  placeholder='Product Name'
                  onChange={(e) => setproduct1(e.target.value)}
                />
                <input
                  type='text'
                  className='edit-input'
                  value={quantity1}
                  placeholder='Quantity'
                  onChange={(e) => setquantity1(e.target.value)}
                />
                <input
                  type='text'
                  className='edit-input'
                  value={location1}
                  placeholder='Ship To'
                  onChange={(e) => setlocation1(e.target.value)}
                />
                <div className='edit-buttons'>
                  <button className='save-button' onClick={() => savedata(i)}>Save</button>
                  <button className='cancel-button' onClick={() => setedit('')}>Cancel</button>
                </div>
              </div>
            );
          }
          return (
            <div key={i} className='prod'>
              <h1>Product: {data.productname}</h1>
              <h1>Quantity: {data.productq}</h1>
              <h1>Ship To: {data.prodlocation}</h1>
              <button onClick={() => del(i)}>Delete</button>
              <button onClick={() => ed(i)}>Edit</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Addproduct;
