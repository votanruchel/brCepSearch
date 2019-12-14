import mongoose from 'mongoose'
import '../app/models/Cep';
const Cep = mongoose.model('Cep');

export default async (req,res,next) =>{
    const c_ep = req.params.cep.replace(/\.|\-/g, '');
    const exist = await Cep.findOne({cep: c_ep}).select("-_id -__v");
    if(exist != null){
        res.status(200).json(exist);
        return;
    }else{
    next();
    }
}