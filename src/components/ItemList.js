import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

const ItemList=({items})=>{

   const dispatch=useDispatch();

   const  handleAddItem=(item)=>{
      //Dispatch An Action
      dispatch(addItem(item));
   }
     return <div>
        
            {items.map((item) => (
            <div key={item.card.info.id}
            className="p-2 m-2  border-gray-200 border-b-2 text-left flex justify-between">
                
                <div className="w-9/12">
                   <div className="py-2"> 
                        <span>{item.card.info.name}</span>  
                        <span> - ₹{item.card.info.price 
                        ? item.card.info.price/100 
                        : item.card.info.defaultPrice/100}
                        </span>
                   </div>
                <p className="text-xs">
                    {item.card.info.description}
                </p>
                </div>
                <div className="w-3/12 p-4 relative"> 
               <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 z-10"> 
                  <button className=" p-2 rounded-lg bg-white shadow-md font-bold text-green-600  hover:bg-gray-200"
                  onClick={()=>handleAddItem(item)}>ADD</button>
                </div>
                  <img src={CDN_URL + item.card.info.imageId} className="w-full h-auto rounded-lg" />
               </div>
            </div>
            ))}
     </div>
};

export default ItemList;