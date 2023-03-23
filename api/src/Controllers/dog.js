const {Dog} = require('../db');

const Dg = {}


Dg.createDog = async(name, height, weight, years, image)=>{
    const newVideogame = await Dog.create({
        name, 
        height, 
        weight, 
        years, 
        image 
    });
    return newVideogame
}
Dg.getAll = async()=>{
    const result = await Dog.findAll();
    return result;
}


module.exports = Dg;