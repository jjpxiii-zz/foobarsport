const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/players/:playerId?', async (req, res) => {
  try {
    const apiHost =
      'https://e' +
      'u' +
      'r' +
      'os' +
      'port' +
      'dig' +
      'ita' +
      'l.git' +
      'hub' +
      '.io/' +
      'eu' +
      'ro' +
      'sp' +
      'ort-no' +
      'de-de' +
      'vel' +
      'oper-re' +
      'cru' +
      'itm' +
      'ent/he' +
      'adt' +
      'ohe' +
      'ad.json';
    const apiResult = await fetch(apiHost);
    const jsonResponse = await apiResult.json();
    const jsonPlayers = jsonResponse.players;
    if (!jsonPlayers) {
      res.sendStatus(404);
    }
    if (jsonPlayers && Array.isArray(jsonPlayers) && req.params.playerId) {
      const player = jsonPlayers.find(el => el.id == req.params.playerId.toString());
      if (player) {
        res.json(player);
      } else {
        res.sendStatus(404);
      }
    } else res.json(jsonResponse.players.sort((a, b) => a.id - b.id));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = app;
