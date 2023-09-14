import { useEffect } from "react";
import {useDispatch} from 'react-redux'
import { fetchUserOptions } from "../redux/options/operations";
const Statistics = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserOptions())
  })
  return <h2>Statistics</h2>;
};

export default Statistics;
