import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";



const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setprice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate=useNavigate();


    useEffect(() => {
        getProductDetails();
    },[])


    const getProductDetails = async()=> {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setprice(result.price);
        setCategory(result.category);
        setCompany(result.company)
    }

     const editProduct = async() => {
        const requestOptions = {
            method: 'Put',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({name:name,price:price,category:category,company:company})
        };
        let result = await fetch(`http://localhost:5000/product/${params.id}`,requestOptions)
        result = await result.json();
      
        if(result){
            navigate('/')
        }           
    }

    return (
        <div className="add-product">
            <h3>Update Product</h3>
            <label>Product Name</label>
            <input type="text" className="input-box" placeholder="enter product name" value={name} onChange={(e) => setName(e.target.value)} />

            <label>Price</label>
            <input type="text" className="input-box" placeholder="enter product price" value={price} onChange={(e) => setprice(e.target.value)} />

            <label>Category</label>
            <input type="text" className="input-box" placeholder="enter product category" value={category} onChange={(e) => setCategory(e.target.value)} />

            <label>Company Name</label>
            <input type="text" className="input-box" placeholder="enter company name" value={company} onChange={(e) => setCompany(e.target.value)} />

            <button type="button" className="button" onClick={editProduct}>Update Product</button>
        </div>
    )
}
export default UpdateProduct;