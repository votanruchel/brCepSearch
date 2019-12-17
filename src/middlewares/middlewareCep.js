import mongoose from 'mongoose'
import '../app/models/Cep';
const Cep = mongoose.model('Cep');

export default async (req,res,next) =>{
    //const c_ep = req.params.cep.replace(/\.|\-/g, '');
    const valid_cep = req.params.cep.replace('/[^0-9]/g','');

    if(valid_cep.length < 8 || valid_cep == '' || valid_cep === null || valid_cep === undefined){
      return res.status(400).json({ error: 'Formato invalido!' });
    }

    const exist = await Cep.findOne({cep: valid_cep}).select("-_id -__v -add_at");
    
    if(exist != null){
        res.status(200).json(exist);
        return;
    }
    next();
}