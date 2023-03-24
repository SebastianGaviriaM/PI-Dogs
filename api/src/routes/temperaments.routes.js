const express = require('express');
const { EagerLoadingError } = require('sequelize');
const routerTemp = express.Router();
const temp = require('../Controllers/temp');
require('dotenv').config()


routerTemp.get('/', async(req, res)=>{
    const APIResult = await fetch('https://api.thedogapi.com/v1/breeds')
    .then(response=>response.json());

    const temperamentsList = APIResult.map(element=>{
        if('temperament' in element){
            const tempList = element.temperament.split(', ');
            return(tempList);
        }       
    })
    const listaDepurada = temperamentsList.reduce((acumulador, lista) => acumulador.concat(lista), [])
    .filter((elemento, indice, lista) => lista.indexOf(elemento) === indice);
    

    listaDepurada.forEach(element => {
        if(element!==null && element!==undefined){
            temp.crearTemp(element);
        }
    });

    res.json({
        status:200,
        respuesta: `Se han insertado los temperamentos exitosamente`
    });
});

module.exports = routerTemp;

