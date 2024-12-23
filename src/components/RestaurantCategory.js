
import ItemList from "./ItemList";

const RestaurantCategory= ({data,showItems,setShowIndex,index})=>{


   const handleClick = () =>
 {
        if (showItems) { // If already open, close it
            setShowIndex(null); // Setting to null or -1 to indicate no category open
        } else { // If closed, open it
            setShowIndex(index); 
        }
    };

    return <div>
        <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4 ">
            <div className="flex justify-between cursor-pointer" onClick={handleClick}> 
            <span className="font-bold text-md">
                {data.title} ({data.itemCards.length})
                </span>
                <span>{showItems ? '⬆️' : '⬇️'}</span>
            </div>
            {showItems && <ItemList items={data.itemCards} />} 
        </div>
    </div>;
};

export default RestaurantCategory;