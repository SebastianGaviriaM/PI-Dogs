const {Temperaments} = require('../db');

const Temp = {};

Temp.crearTemp = async(name)=>{
    const newTemp = await Temperaments.create({name});
    return newTemp;
}    

module.exports = Temp;