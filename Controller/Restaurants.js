const RestaurantSchema = require('../Models/Restaurants');
exports.filterRestaurants = (req,res) => {
    let {mealtype, cuisine, locality, lcost, hcost, page, sort } = req.body;

    page = page ? page :1;
    sort = sort ? sort :1;

    let payload = {};
    const itemsPerPage = 2;
    
    let startIndex = itemsPerPage * page - itemsPerPage;
    let endIndex = itemsPerPage * page;


    if (mealtype) {
        payload['type.mealtype'] = mealtype;
    
    }
    if (mealtype && cuisine) {
        payload['type.mealtype'] = mealtype;
        payload['Cuisine.cuisine'] = { $in :cuisine};
    }
    if (mealtype && lcost && hcost){
        payload['type.mealtype'] = mealtype;
        payload["cost"] = {$lte : hcost , $gte : lcost};

    }
    if( mealtype && cuisine && lcost && hcost){
        payload['type.mealtype'] = mealtype;
        payload['Cuisine.cuisine'] = { $in : cuisine};
        payload["cost"] = {$lte : hcost , $gte : lcost};
    }
    if(mealtype && locality){
        payload['type.mealtype'] = mealtype;
        payload['locality'] = location;
    }

    RestaurantSchema.find(payload).sort({cost : sort})
        .then(response => {
            const filteredResponse = response.slice(startIndex,endIndex);
            res.status(200).json({
                message :  "Restaurants fetched successfully",
                restaurants : filteredResponse
               
            })
            console.log(filteredResponse)
        }).catch(err => {
            res.status(400).json({error : err});
            
        })
        
}