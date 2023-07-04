const mongoose = require("mongoose");


const foodSchema = new mongoose.Schema({

    name: {
        type: 'string',
        required: true,

    },
    category: {
        type: 'string',
        required: true,

    },

    restaurant_name: {
        type: 'string',
        required: true,
    },
    photo: {
        type: 'string',
        required: true,

    },
    cost: {
        type: 'string',
        required: true,

    },
},
    {
        timestamps: true,

    })











const Food = mongoose.model("Food", foodSchema);
module.exports = Food;