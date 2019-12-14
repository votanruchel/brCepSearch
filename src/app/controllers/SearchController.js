import Correio from '../../services/Correio';
import mongoose from 'mongoose';
import '../models/Cep';
const Cep = mongoose.model('Cep');

class SearchController {
  async show(req, res) {
  
    const address = await Correio(req.params);

    if (address.length === 0) {
      return res.status(400).json({ error: 'Cep não localizado!' });
    }
    if(address.hasOwnProperty('error')){
      return res.status(400).json(address)
    }

      const dbCepSave = new Cep(address);
      dbCepSave.save().catch((err)=>{});

    return res.json(address);
  }
}

export default new SearchController();
