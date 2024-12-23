
//import RestaurantCard, {withPromotedLabel} from "./ RestaurantCard";
import RestaurantCard,{withPromotedLabel} from './RestaurantCard';
//import resList from "../utils/mockData";
import Shimmer from "./Shimmer";
import { useState,useEffect } from "react";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";


const Body=()=>{

  const [listOfRestaurants,setListOfRestaurant]= useState([]);
  const [filteredRestaurant,setFilteredRestaurant]=useState([]);
  const [searchText,setSearchText]=useState("");

  const RestaurantCardPromoted= withPromotedLabel(RestaurantCard);

  console.log("Body Rendered",listOfRestaurants);

  const onlineStatus=useOnlineStatus();
   
  useEffect(()=>{
     fetchData();
   },[]);
  

   const fetchData = async () =>{
   const data= await fetch("https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.842446573558883&lng=80.15457578731436&str=Chicken%20Roll&trackingId=undefined&submitAction=ENTER&queryUniqueId=85f212c5-2034-5752-763a-f50b69621e4d&selectedPLTab=RESTAURANT");
   const json = await data.json();


     const listOfRestaurants = json?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards.map(item => item?.card?.card?.info);
     
     setListOfRestaurant(listOfRestaurants);
     setFilteredRestaurant(listOfRestaurants);
   }

  //Conditional Rendering
  if(listOfRestaurants.length===0){
    return <h1><Shimmer/></h1>
  }

 

  if(onlineStatus===false) 
    return (
      <h1>Looks like you are  offline!! Please check your internet connection</h1>
  ) ;

    return(
        <div className='body'>
            <div className='filter flex'>
              <div className="m-4 p-4">
                <input type="text" className="border border-solid border-black rounded" value={searchText} 
                onChange={(e)=>{
                  setSearchText(e.target.value);
                }}/>
                <button className="px-4 py-1 bg-green-100 rounded-md m-4"
                 onClick={()=>{
                  const filteredRestaurant= 
                  listOfRestaurants.filter((res)=>res.name.toLowerCase().includes(searchText.toLowerCase()));
                  setFilteredRestaurant(filteredRestaurant);
                }}>Search</button>
              </div>
              <div className="m-4 p-4 flex items-center">
                <button 
                className="px-4 py-2 bg-gray-100 rounded" 
                onClick={()=>{
                  const filteredList=filteredRestaurant.filter(
                    (res)=>res.avgRating >4.2
                  );
                  setFilteredRestaurant(filteredList);
                }}>Top Rated Restaurants</button>
              </div>
             
            </div>
            <div className='flex flex-wrap'>
              {filteredRestaurant.map((restaurant)=>(
               <Link key={restaurant.id} to={"/restaurants/"+restaurant.id}>
                 { restaurant.promoted?(
                  <RestaurantCardPromoted resData={restaurant}/>
                 ):(
                  <RestaurantCard resData={restaurant}/>
                 )}  
                </Link>
              ))}
            </div>
        </div>
    )
}

export default Body;