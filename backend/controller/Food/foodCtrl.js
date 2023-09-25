const Food = require("../../model/food/food");




const createFoodCtrl = async (req, res, next) => {

    const { name, category, cost, restaurant_name } = req.body;



    const foodCreated = await Food.create({
        name,
        category,
        cost,
        restaurant_name,
        photo: req && req.file && req.file.path,


    });
    console.log(foodCreated);
    res.status(201).json({
        status: "success",
        data: {
            data: foodCreated
        },
    });


}


const getFoodctrl = async (req, res) => {

    const foodData = await Food.find({});
    // console.log(foodData);
    let FoodData = [];

    foodData.map((obj) => {
        FoodData.push({
            id: obj.id,
            name: obj.name,
            cost: obj.cost,
            category: obj.category,
            restaurant_name: obj.restaurant_name,
            photo: obj.photo
        })
    })

    res.status(201).json({
        status: "success",
        data: FoodData
    });

}


const getSingleFoodctrl = async (req, res) => {

    const id = req.params.id;
 
    const singlefood = await Food.findById(id);

    res.status(201).json({
        status: "success",
        data: singlefood
    });

}



module.exports = { createFoodCtrl, getFoodctrl, getSingleFoodctrl };