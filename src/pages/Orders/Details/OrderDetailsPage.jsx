import React from 'react';
import { useParams } from 'react-router-dom';

const OrderDetailsPage = ({ ...rest }) => {
  let { id } = useParams();
  return <div>Order {id}</div>;
};
export default OrderDetailsPage;
