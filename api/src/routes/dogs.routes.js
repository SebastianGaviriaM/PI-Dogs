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
            id: element.id,
            name: element.name,
            image: element.image,
            height: height,
            weight: weight,
            years: years
        })
    });

const APIDogs = APIResult.map(element =>{

        return({
            id: element.id,
            name: element.name,
            image: element.image.url,
            height: element.height.metric,
            weight: element.weight.metric,
            years: element.life_span
        })  
    });
    res.json([...DBDogs, ...APIDogs]);
});

routerDog.post('/', async(req, res) =>{
    const {image, name, minHeight, maxHeight, minWeight, maxWeight, minYears, maxYears} = req.body;
    const result = await dog.createDog(image, name, minHeight, maxHeight, minWeight, maxWeight, minYears, maxYears);
    res.json({
        status:200,
        respuesta: `Se ha creado el usuario ${name}`
    });
});


routerDog.get('/name', async (req, res) => {
    const name = req.query.name; 
    let APIDogs = [];
    let DBDogs = [];
    const APIResult = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
    .then(response =>response.json());
    if(APIResult.length==0){

    }
    else{
        APIDogs = APIResult.map(element =>{
            return({
                name: element.name,
                height: element.height.metric,
                weight: element.weight.metric,
                years: element.life_span
            })  
        });

    }
    res.json([...DBDogs, ...APIDogs]);
});

routerDog.get('/:id', async (req, res) => {
    const idRaza = req.params.id;
    let DBDogs=[];
    let APIDogs=[];

    const APIResult = await fetch('https://api.thedogapi.com/v1/breeds')
    .then(response=>response.json());
    const selectedRaza = APIResult.filter(raza=>raza.id==idRaza);
    if(selectedRaza.length==0){
        const DBResult = await dog.getID(idRaza);
        DBDogs = DBResult.map(element=>{
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
        });
    }
    else{

        selectedRaza
        APIDogs = selectedRaza.map(element =>{

            return({
                name: element.name,
                image: element.image.url,
                height: element.height.metric,
                weight: element.weight.metric,
                years: element.life_span
            })  
        });
    }
    

    res.json([...DBDogs, ...APIDogs]);
});







module.exports = routerDog;