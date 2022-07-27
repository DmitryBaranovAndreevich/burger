import styles from './modalOrdersList.module.css';
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { OrdersList } from './ordersList';
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { wsConnectionStart } from '../services/actions/wsActions';

export const ModalOrdersList =()=> {
  const dispatch = useDispatch();
  const { isLoadingOn, isLoadingRequest } = useSelector((store) => store.user);
  const {wsConnected,ordersList} = useSelector(store => store.ordersList)

  useEffect(() => {
    dispatch(wsConnectionStart())
  },[isLoadingOn])

  useEffect(() => {console.log(ordersList)},[ordersList])
  

  // useEffect(() => {
  // wsConnected&&dispatch()
  // })

  return (
    <div>
      <Switch>
        <Route path="/feed" exact={true}>
          <OrdersList/>
        </Route>
      </Switch>
    </div>
  )
}