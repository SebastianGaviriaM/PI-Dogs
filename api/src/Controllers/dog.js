const {Dog} = require('../db');

const Dg = {}


Dg.createDog = async(image, name, minHeight, maxHeight, minWeight, maxWeight, minYears, maxYears)=>{
    const newDog = await Dog.create({
        image, 
        name, 
        minHeight, 
        maxHeight, 
        minWeight, 
        maxWeight, 
        minYears, 
        maxYears
    });
    return newDog
}
Dg.getAll = async()=>{
    const result = await Dog.findAll();
    return result;
}

Dg.getID = async(id)=>{
    DBresult = await Dog.findByPk(id);

    return DBresult;  
}


module.exports = Dg;