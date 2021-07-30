import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectedProduct, removeSelectedProduct } from '../redux/actions/productActions';

const ProductDetail = () => {
  const product = useSelector((state) => state.product);
  const { title, image, price, category, description } = product
  const {productId} = useParams();
  const dispatch = useDispatch();

  const fetchProductDetail = async () => {
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`).catch(err => {
      console.log('Err',err);
    });
    
    dispatch(selectedProduct(response.data));
  }

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail();
    return () => {
      dispatch(removeSelectedProduct());
    }
  }, [productId])

  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
      <div className="ui placeholder segment">
        <img src={image} alt="" />
        <h1>{title}</h1>
        <h2>$ {price}</h2>
        <h3>{description}</h3>
      </div>

      )}
    </div>
  )
}



export default ProductDetail;