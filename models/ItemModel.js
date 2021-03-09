const mongoose = require('mongoose');
const axios = require('axios');

const itemSchema = mongoose.Schema({
    item: {
        type: {},
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
}, {collection: 'items'})

itemSchema.index({'$**': 'text'});

const itemModel = mongoose.model(
    'ItemModel',
    itemSchema
)

const findItemsByType = (type) => {
    return itemModel.find({type: type});
}

const findAvailableFish = (hemisphere, month, time) => {
    if (hemisphere === "northern") {
        console.log('NORTHERN');
        return itemModel.find({'item.availability.month-array-northern': parseInt(month), 'item.availability.time-array': parseInt(time)});
    } else if (hemisphere === "southern") {
        console.log('SOUTHERN');
        return itemModel.find({'item.availability.month-array-southern': parseInt(month), 'item.availability.time-array': parseInt(time)})
        .then((fish) => {
            console.log(fish);
            return fish;
        });
    }
}

const findItemById = (id) => {
    return itemModel.findById(id);
}

const findItemsBySearchString = (searchString) => {
    return itemModel.find({$text: {$search: searchString}});
}

// for: fish, sea, bugs, fossils, villagers
const postIndividualItems = (param, type) => {
    axios.get(`http://acnhapi.com/v1/${param}/`)
    .then(response => {
        let list = [];
        Object.values(response.data).forEach(value => {
            list.push({item: value, type: type});
        });

        itemModel.insertMany(list)
        .then((response) => response);
    });
}

// for: houseware, wallmounted, misc
const postGroupedItems = (param, type) => {
    axios.get(`http://acnhapi.com/v1/${param}/`)
    .then(response => {
        let list = [];
        Object.values(response.data).forEach(value => {
            value.forEach(item => {
                list.push({item: item, type: type});
            });
        });

        itemModel.insertMany(list)
        .then((response) => response);
    })
}

// populate mongo db from acnh-api
// allows faster queries for search bar
const postAllItems = () => {
    postIndividualItems('fish', 'fish');
    postIndividualItems('sea', 'sea');
    postIndividualItems('bugs', 'bug');
    postIndividualItems('fossils', 'fossil');
    postIndividualItems('villagers', 'villager');
    postGroupedItems('houseware', 'houseware');
    postGroupedItems('wallmounted', 'wallmounted');
    postGroupedItems('misc', 'misc');
}

module.exports = {
    findItemsByType: findItemsByType,
    findAvailableFish: findAvailableFish,
    findItemById: findItemById,
    findItemsBySearchString: findItemsBySearchString,

    postAllItems: postAllItems,
};
