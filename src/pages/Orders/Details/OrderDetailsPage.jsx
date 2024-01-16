import React from 'react';
import { useParams } from 'react-router-dom';

const OrderDetailsPage = ({ ...rest }) => {
  let { id } = useParams();


  console.log('order Id', id, rest);
  return <div>Order {id}</div>;
};
export default OrderDetailsPage;
