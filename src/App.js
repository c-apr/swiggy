import React, { useEffect, useState } from 'react';
import { lazy , Suspense} from 'react';
//import ReactDOM from 'react-dom/client';
import Header from "./components/Header";
import Body from "./components/Body";
// import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router";

import { createRoot } from "react-dom/client";
import Contact from './components/Contact';
import RestaurantMenu from './components/RestaurantMenu';
import Shimmer from './components/Shimmer';
import Cart from './components/Cart';
import UserContext from './utils/UserContext';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

//React Element
//React Element is not a HTML element 
//React Element is an object
//When we render this to dom then it becomes HTML


//Using lazy loading to import About
const About = lazy(()=> import('./components/About'));

const AppLayout =()=>{
  
  const [userName,setUserName]=useState();

  //Authentication with dummy data- Don't have any backend or API from where we will get the data.

  useEffect(()=>{
    const data={
      name: "Ayush Priyadarshi",
    };
    setUserName(data.name);
  },[]);

    return (
     <Provider store={appStore}> 
      <UserContext.Provider value={{loggedInUser:userName}}> 
        <div className='app'>
          <Header/>
          <Outlet/>
        </div>
      </UserContext.Provider>
    </Provider>
    )
}

const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<Body/>
      },
      {
        path:"/about",
        element: <Suspense fallback={<Shimmer></Shimmer>}> 
           <About/>  
           </Suspense>,
      },
      {
        path:"/contact",
        element:<Contact/>,
      },
      {
        //Dynamic Routing
        path:"/restaurants/:resId",
        element:<RestaurantMenu/>,
      }  ,
      {
        path:"/cart",
        element:<Cart/>,
      },
    ],
    errorElement:<Error/>
  },
  
]);
 

//Earlier
//const root=ReactDOM.createRoot(document.getElementById("root"));
//root.render(<AppLayout/>);

//After react router dom
//root.render(<RouterProvider router={appRouter}/>);

//Newer with react router dom 7
createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);