const express = require('express');
const routerDog = express.Router();
const dog = require('../Controllers/dog');
require('dotenv').config()

routerDog.get('/', async(req, res)=>{
    const DBResult = await dog.getAll();
    const APIResult = await fetch('https://api.thedogapi.com/v1/breeds')
    .then(response=>response.json());

    const DBDogs = DBResult.map(element=>{
        let height = element.minHeight + ' - ' + element.maxHeight;
        let weight = element.minWeight + ' - ' + element.maxWeight;
        let years = element.minYears + ' - ' + element.maxYears;
        return({
            name: element.name,
            image: element.image,
            height: height,
            weight: weight,
            years: years
        })
    }) 

    const APIDogs = APIResult.map(element =>{

        return({
            name: element.name,
            image: element.image.url,
            height: element.height.metric,
            weight: element.weight.metric,
            years: element.life_span
        })  
    });
    res.json([...DBDogs, ...APIDogs]);
});

module.exports = routerDog;