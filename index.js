const axios = require('axios');
const fs = require('fs');
const { initDB, upsertUser } = require('./db');

// Função para buscar usuários
async function fetchUsers() {
  const response = await axios.get('https://randomuser.me/api/?results=150');
  return response.data.results;
}

// Função para gerar relatório
async function generateReport({ processed, added, updated, ignored }) {
  const now = new Date();
  const report = `
Resultado de Processamento
--------------------------
Processado: ${processed}
Adicionados: ${added}
Atualizados: ${updated}
Ignorados (Menores de 18 anos): ${ignored}
Data: ${now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
`;
   // Salva o relatório em um arquivo
  fs.writeFileSync('./report.txt', report);

   // Mostra no console
  console.log(report);
}

// Fluxo principal
(async () => {
  try {
    const db = await initDB();
    const users = await fetchUsers();

    let added = 0, updated = 0, ignored = 0;
    
    for (const user of users) {
      const age = user.dob.age; // usa direto o campo da API
      if (age < 18) {
        ignored++;
        continue;
      }

      const result = await upsertUser(db, user);
      if (result === 'added') added++;
      else if (result === 'updated') updated++;
    }

    await generateReport({ processed: users.length, added, updated, ignored });
    console.log('Processamento concluído!');
  } catch (err) {
    console.error('API processada com erro', err);
  }
})();

