import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAlltypes, filterCreated, orderName, filterType, filterStr } from "../../actions";
import SearchBar from "../SearchBar/SearchBar";
import styles from './Filters.module.css'

const Filters =  ({setCurrentPage, setOrder}) => {
  
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.types);
  
  useEffect(() => {
    dispatch(getAlltypes())
  }, [dispatch]);

  const handleFilterCreated = (event) => { //Filtra a los pokemon creados en la DB
    dispatch(filterCreated(event.target.value));
  };

  const handleOrderName = (event) => { //Filtra por nombre
    event.preventDefault();
    dispatch(orderName(event.target.value));
    setCurrentPage(1);
    setOrder(event.target.value);
  };

  const handleFilterType = (event) => { //Filtra por tipo
    event.preventDefault();
    dispatch(filterType(event.target.value)); 
    setCurrentPage(1);
  };

  const handleFilterStr = (event) => { //Filtra por ataque
    event.preventDefault();
    dispatch(filterStr(event.target.value));
    setCurrentPage(1);
    setOrder(event.target.value);
  };


  return ( 
    <div className={styles.div}>
      <div>
      <SearchBar />
      </div>
      <div >
        <h4 className={styles.h4}>Filters</h4>
        <label className={styles.label}>Created / Api</label>
        <select className={styles.select} onChange={event => {handleFilterCreated(event)}}>
          <option value='All'>All</option>
          <option value='Api'>Api</option>
          <option value='Created'>Created</option>
        </select>


        <label className={styles.label}>Types</label> 
        <select className={styles.select} onChange={event => {handleFilterType(event)}}>
            <option value='All'>All</option>
            {
              allTypes?.map(element => {
                return (
                  <option key={element.id} value={element.name}>{element.name.toUpperCase()}</option>
                )
              })
            }
        </select>
      </div>

      <div>
        <h4 className={styles.h4}>Order</h4>
        <select className={styles.select} onChange={event => {handleFilterStr(event)}}>
            <option className={styles.order}>Attack</option>
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
        </select>
        <select className={styles.select} onChange={event => {handleOrderName(event)}}>
            <option className={styles.order}>Alphabetically</option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
        </select>
      </div>
    </div>
   );
}
 
export default Filters;