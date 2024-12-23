import { CDN_URL } from "../utils/constants"; //This is the way to import named imports.


const RestaurantCard = ({resData})=>{
    const{
      name,
     cuisines, avgRating,costForTwo,
     sla:{deliveryTime} }=resData;

     const cloudinaryImageId=resData?.cloudinaryImageId;

    return(
      <div className='m-4 p-4 w-[260px] relative rounded-lg h-[457px] bg-gray-100 hover:bg-gray-200 z-0'>
        <img 
        className='rounded-lg h-3/6 w-full'
        alt='res-logo' 
        src={CDN_URL+cloudinaryImageId}
        />
         <h3 className="font-bold py-3 text-lg">{name}</h3>
         <div className="flex flex-wrap whitespace-normal text-wrap truncate">
         <h4>{cuisines.join(',')}</h4>
         </div>
         <h4>{avgRating} stars</h4>
         <h4>₹{costForTwo/100}</h4>
         <h4>{deliveryTime} minutes</h4>
      </div>
    )
};

//Higher Order Component
//Input -RestaurantCard =>RestaurantCard Promoted (output)

 export const  withPromotedLabel = (RestaurantCard)=>{
  return (props)=>{
     return (
      <div>
        <label className="absolute bg-zinc-600 text-white z-10 rounded-lg m-2 p-2">Promoted</label>
        <RestaurantCard {...props}/>
      </div>
     );
  };
};

export default RestaurantCard;