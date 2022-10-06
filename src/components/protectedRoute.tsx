import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useSelector } from '../hooks/types';

export type TProtectedRouteProps = RouteProps&{
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<TProtectedRouteProps> = ({ children, ...rest }) => {
  const { isLoadingOn } = useSelector((store) => store.user);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isLoadingOn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
