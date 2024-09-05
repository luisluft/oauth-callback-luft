const axios = require('axios');

module.exports = async (req, res) => {
  const code = req.query.code;
  const state = req.query.state;

  if (code) {
    try {
      // Troca o código de autorização por um token de acesso
      const response = await axios.post('https://www.bling.com.br/Api/v3/oauth/token', {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'https://oauth-callback-luft.vercel.app/'
      });

      const accessToken = response.data.access_token;

      // Exibe o token de acesso no navegador ou registra-o de alguma forma
      res.send(`Token de acesso recebido: ${accessToken}`);
    } catch (error) {
      res.send(`Erro ao trocar o código de autorização por token: ${error.message}`);
    }
  } else {
    res.send("Erro: nenhum código de autorização recebido.");
  }
};
