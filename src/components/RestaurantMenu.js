
import { useState } from "react";
import Shimmer from "./Shimmer";
//import { MENU_API } from "../utils/constants";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu=()=>{

  
  const {resId}=useParams();
  const resInfo= useRestaurantMenu(resId);  //Using custom hook- after learning 
  const [showIndex, setShowIndex]=useState(null);


  // const [resInfo,setResInfo]=useState(null);

  // useEffect(()=>{
  //   fetchMenu();
  // },[]);

  // const fetchMenu= async () =>{
  //   const data= await fetch(MENU_API+resId);
  //   const json= await data.json();
  //   console.log(json);
  //   setResInfo(json.data);
  // };

  if (resInfo===null){
     return <Shimmer/>;
  }

  
  
  const{
    name,
   cuisines,costForTwoMessage
  }=resInfo?.cards[2]?.card?.card?.info;

 // const {itemCards}=resInfo?.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card;
  const categories = 
  resInfo?.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter((c)=>
    c.card?.card?.["@type"]===
  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
);

console.log(categories);

  console.log(resInfo?.cards[4].groupedCard.cardGroupMap.REGULAR.cards);

  //console.log(itemCards);

      return (
        <div className="text-center">
            <h1 className="font-bold my-8 text-2xl">{name}</h1>
            <p className="font-bold text-lg">
            {cuisines.join(',')}-{costForTwoMessage}
            </p>    
            {categories.map((category,index)=> ( 
              //Controlled component
            <RestaurantCategory 
            key={category?.card?.card.title}
             data={category?.card?.card}
             showItems={showIndex === index} // Pass showItems based on index
              setShowIndex={setShowIndex}
              index={index}
             />
           ))}
        </div>
      )
};


export default RestaurantMenu;