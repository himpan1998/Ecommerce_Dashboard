import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setprice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const[error,setError]=useState(false);
    const navigate=useNavigate();

    const AddProduct = async () => {

           if(!name || !price || !category || !company){

             setError(true);
              return false;
           } 
        //    console.log(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, price: price, category: category, company: company, userId: userId })
        };

        let result = await fetch('http://localhost:5000/add/product', requestOptions);
        result = await result.json();
        console.log("result:", result);
        if(result){
            navigate('/')
        }

    }

    return (
        <div className="add-product">
            <h3>Add Product</h3>
            <label>Product Name</label>
            <input type="text" className="input-box" placeholder="enter product name" value={name} onChange={(e) => setName(e.target.value)} />
            { error && !name && <span className="invalid-input">Enter valid product name</span>}
            <label>Price</label>
            <input type="text" className="input-box" placeholder="enter product price" value={price} onChange={(e) => setprice(e.target.value)} />
            {error && !price && <span className="invalid-input">Enter valid product price </span>}
            <label>Category</label>
            <input type="text" className="input-box" placeholder="enter product category" value={category} onChange={(e) => setCategory(e.target.value)} />
            {error && !category && <span className="invalid-input">Enter valid product category </span>}
            <label>Company Name</label>
            <input type="text" className="input-box" placeholder="enter company name" value={company} onChange={(e) => setCompany(e.target.value)} />
            {error && !company && <span className="invalid-input">Enter valid company name</span>}
            <button type="button" className="button" onClick={AddProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;