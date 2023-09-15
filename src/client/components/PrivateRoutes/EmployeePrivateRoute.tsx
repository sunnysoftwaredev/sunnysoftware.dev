import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

interface IProps {
  children: React.JSX.Element;
}

const EmployeePrivateRoute = ({ children }: IProps): React.JSX.Element => {
  const { role, load } = useContext(AuthContext) ?? { role: '', load: false };
  console.log('load in private route: ', load);

  if (!load) {
    return <div>LOADING...</div>;
  }
  if (role === 'employee') {
    return children;
  }
  return <Navigate to="/login" />;
};

export default EmployeePrivateRoute;

// Alternate implementation:

// import { Navigate, Outlet } from 'react-router-dom'
// const PrivateRoutes = () => {
//   let auth = {'token':true}return (
//     auth.token ? <Outlet/> : <Navigate to='/login'/>
//   )
// }

// import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// ...
// function App() {
//   return (
//     <Router>
//         <Routes>
//           <Route element={<PrivateRoutes/>}>
//               <Route path='/' element={<Users/>} />
//               <Route path='/products' element={<Products/>} />
//           </Route>
//           <Route path='/login' element={<Login/>}/>
//         </Routes>
//     </Router>
//   );
// }
