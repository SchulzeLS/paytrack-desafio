const axios = require('axios');

// Função que chama a API
async function fetchUsers() {
  const response = await axios.get('https://randomuser.me/api/?results=150');
  return response.data.results; // retorna apenas o array de usuários
}

// Exporta a função para ser usada em outros arquivos
module.exports = { fetchUsers };

