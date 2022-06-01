const { Op } = require('sequelize');
const User = require('../models/User');
const Address = require('../models/Address');

module.exports = {
  async show(req, res){
    // Encontrar todos os usuários que tem email que termina com @usemobile.com.br
    // Desses usuáio buscar todos os que moram na rua "Aurora Ce"
    // Desses usuários buscar as tecnologias que começam com React

    const users = await User.findAll({
      attributes: ['name', ['email']],
      where: {
        email:  {
          [Op.iLike]: '%@rocketseat.com.br' // Busca somente emails que tem '@rocketseat.com.br' no final
        }
      },
      include: [
        { association: 'addresses', where: { street: 'Aurora Ce' } }, // Busca somente quem é desse endereço
        { association: 'techs', 
        where: {
          name: {
            [Op.iLike]: 'React%'// Busca somente que tem 'React' no início
          }
        }},

      ]
    })

      return res.json(users)
  }
};