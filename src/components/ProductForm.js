import "./ProductForm.css";
import PropTypes from "prop-types";

import React from 'react';
import {useState} from 'react';
import {Link, useOutlet} from "react-router-dom";
import axios from "axios";


const ProductForm = (props) => {
    const defaultProduct = {name:"", brand: "", category: "", price:"", purchaseDate:"", expirationDate:""};

    const [productData, setProductData] = useState(defaultProduct);
    const [products, setProducts] = useState([]);

    const getProductsFromAPI = (category_id) => {
        axios.get(`http://localhost:8080/api/category/${category_id}/products`)
            .then((response) => {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log("Couldn't get products!");
            });
    };

    const makeNewProduct = ({data, category_id}) => {
        console.log("in post");
        axios.post(`http://localhost:8080/api/category/${category_id}/products`, data)
            .then((response) => {
                getProductsFromAPI();
            })
            .catch((error) => {
                console.log("Could not add product!");
            });
    };

    const handleFormInput = (event) => {
        const inputElement = event.target;
        const name = inputElement.name;
        const value = inputElement.value;

        const newProductData = {...productData};
        newProductData[name] = value;
        newProductData["category_id"] = props.category_id;
        setProductData(newProductData);
    };

    const handleFormSubmission = (event) => {
        event.preventDefault();
        makeNewProduct(productData);
        setProductData(defaultProduct);
    };

    return (
        <div className="new-item-page">
            <h2>ADD NEW ITEM</h2>
        {/*<>*/}
        <form onSubmit={handleFormSubmission} >
            <section className="form-block">
            <label htmlFor="Name">Name</label>
            <input id="Name" name="name" type="text" value={productData.name} onChange={handleFormInput}/>

            <label htmlFor="Brand">Brand</label>
            <input
                id="Brand" name="brand" type="text" value={productData.brand} onChange={handleFormInput}/>

            <label htmlFor="Price">Price</label>
            <input
                id="Price" name="price" type="text" value={productData.price} onChange={handleFormInput}/>

            <label htmlFor="Purchase Date">Purchase Date (ex.yyyy-mm-dd)</label>
            <input
                id="Purchase Date" name="purchaseDate" type="text" value={productData.purchaseDate} onChange={handleFormInput}/>

            <label htmlFor="Expiration Date">Expiration Date (ex.yyyy-mm-dd)</label>
            <input
                id="Expiration Date" name="expirationDate" type="text" value={productData.expirationDate} onChange={handleFormInput}/>
            </section>

            <input className="submit-button" type="submit" value="Add Item"/>


        </form>

        <Link to="/" className="home-link">
            {/*<br />*/}
            Return to Dashboard
        </Link>
        {/*</>*/}
        </div>
    );

};
ProductForm.protoTypes = {
    makeNewProductCallback: PropTypes.func.isRequired,

}

export default ProductForm;