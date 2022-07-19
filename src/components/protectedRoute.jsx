import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({children,...rest}) {
  const {isLoadingOn,user} = useSelector(store => store.user);

    return( 
    <Route
      {...rest}
      render={({ location }) => {
       return isLoadingOn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )}
      }
    />
    );
}