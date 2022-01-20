import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    if (localStorage.getItem("user") === null){
        return false;
    }
    else{
        return true;
    }
};

const Protectedroutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet></Outlet> : <Navigate to='/' />
}

export default Protectedroutes;

// import { Route, Redirect } from "react-router-dom";
// import 

// export const Protectedroutes = ({
//   component: Component,
//   ...rest
// }) => {
//   return (
//     <Route
//       {...rest}
//       render={props => {
//         if (localStorage.getItem("user") === null) {
//             return (
//                 <Redirect
//                     to={{
//                     pathname: "/",
//                     state: {
//                         from: props.location
//                     }
//                     }}
//                 />
//                 );
//         } else {
//             return <Component {...props} />;
//         }
//       }}
//     />
//   );
// };
