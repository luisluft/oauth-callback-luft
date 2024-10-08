const axios = require('axios');

module.exports = async (req, res) => {
  const code = req.query.code;
  const state = req.query.state;

  if (code) {
    try {
      // Troca o código de autorização por um token de acesso
      const response = await axios.post('https://www.bling.com.br/Api/v3/oauth/token', null, {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: 'https://oauth-callback-luft.vercel.app/'
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const accessToken = response.data.access_token;

      if (accessToken) {
        // Exiba o token de acesso e armazene-o
        console.log('Token de acesso recebido: ', accessToken);
        res.send(`Token de acesso recebido: ${accessToken}`);
      } else {
        res.send("Erro: Token de acesso não recebido.");
      }
    } catch (error) {
      res.send(`Erro ao trocar o código de autorização por token: ${error.message}`);
    }
  } else {
    res.send("Erro: Nenhum código de autorização recebido.");
  }
};
