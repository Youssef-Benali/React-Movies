import React from 'react';
import auth from "../services/authService"
import { Route, Redirect } from 'react-router-dom';

// ! React will show up error if the component get via props is on lowercase c, that why you must rename it accordingly
const ProtectedRoute = ({component: Component, render, ...rest}) => {
    return ( <Route
        {...rest}
        render={(props) => {
          if (!auth.getCurrentUser()) return <Redirect to="/login" />;
          return Component ? <Component {...props} /> : render(props)
        }}
      /> );
}
 
export default ProtectedRoute;