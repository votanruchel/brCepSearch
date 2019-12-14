import mongoose from 'mongoose';

const cep = new mongoose.Schema(
    {
        cep: {
            type: String,
            unique: true
        },
        rua: String,
        bairro: String,
        cidade: String
    }
    );
module.exports = mongoose.model('Cep',cep);