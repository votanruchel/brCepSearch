import Correio from '../../services/Correio';
import mongoose from 'mongoose';
import '../models/Cep';
const Cep = mongoose.model('Cep');

class SearchController {
  async show(req, res) {
    
    const address = await Correio(req.params);
    if(address.hasOwnProperty('error')){
      return res.status(400).json(address)
    }
    if (address.length === 0) {
      return res.status(404).json({ error: 'Cep não localizado!' });
    }
    
    address.map(function(index){
      const dbCepSave = new Cep();
      dbCepSave.cep = index.cep.replace(/\.|\-/g, '');
      dbCepSave.rua = index.rua;
      dbCepSave.bairro = index.bairro;
      dbCepSave.cidade = index.cidade;
      dbCepSave.save().catch((err)=>{});
    })
    return res.json(address);
  }
}

export default new SearchController();
