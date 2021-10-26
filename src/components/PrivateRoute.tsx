import { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import * as appSec from "../redux/crypto";

type Props = {
  component?: any;
  exact: boolean;
  path: string;
};

const PrivateRoute: FC<Props> = ({
  component: Component,
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        appSec.decryptAndReturn() ? (
          children ?? <Component {...props} />
        ) : (
          // children
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
