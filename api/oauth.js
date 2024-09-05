const axios = require('axios');

module.exports = async (req, res) => {
  const code = req.query.code;
  const state = req.query.state;

  // Verifique se o código de autorização foi recebido
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

      // Verifique se o token de acesso foi recebido
      if (accessToken) {
        // Armazena o token para uso futuro
        // Exiba o token ou salve-o para uso posterior
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
