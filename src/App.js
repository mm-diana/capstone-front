import React from "react";
import {Routes, Route, BrowserRouter, useLocation, Link} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from 'axios';

import ProductList from './components/ProductList.js';
import ProductForm from './components/ProductForm.js';
import './App.css';
import Home from "./components/Home";
import ProductListByCategory from "./components/ProdcuttListByCategory";

const App = () => {
    const [products, setProducts] = useState([]);
    const [url, setUrl] = useState('http://localhost:8080/products')
    // const url = 'http://localhost:8080/products';

    useEffect(() => {
        getProductsFromAPI();
    }, []);

    const getProductsFromAPI = () => {
        axios.get(url)
            .then((response) => {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log("Couldn't get products!");
            });
    };

    const deleteProducts = (id) => {
        axios.delete(`http://localhost:8080/products/${id}`)
            .then((response) => {
                const updatedProducts = products.filter((product) => product.id !== id);
                setProducts(updatedProducts);
            })
            .catch((error) => {
                console.log(`Unable to delete product with id ${id}!`);
            });
    };

    const createNewProduct = (data) => {
        console.log(data);
        axios.post(url, data)
            .then((response) => {
                getProductsFromAPI();
            })
            .catch((error) => {
                console.log("Could not add product!");
            });
    };

    const getMakeup = event => {
        setUrl('http://localhost:8080/products/makeup');
    };

    const getSkincare = event => {
        setUrl('http://localhost:8080/products/skincare');
    };

    const getSubscriptions = event => {
        setUrl('http://localhost:8080/products/subscriptions');
    };


    return (
        <div className="container">
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="products" element={
                    <ProductList products={products} deleteProductsCallback={deleteProducts}/>}
                />
                <Route path=":category" element={<ProductListByCategory products={products} deleteProductsCallback={deleteProducts}/>} />
                <Route path="new" element={
                    <ProductForm createNewProductCallback={createNewProduct}/>}
                />
            </Routes>
            </BrowserRouter>
        </div>
        );
    }


export default App;
