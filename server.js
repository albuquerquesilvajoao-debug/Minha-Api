const express = require('express');
const fs = require('fs');
const app = express();
const ARQUIVO = 'dados.json';

app.use(express.json());

// Lê os itens do arquivo e retorna um array
function lerDados() {
 return JSON.parse(fs.readFileSync(ARQUIVO, 'utf-8'));
}

// Salva o array de volta no arquivo
function salvarDados(itens) {
 fs.writeFileSync(ARQUIVO, JSON.stringify(itens, null, 2));
}

// GET /itens -> lista todos
app.get('/itens', (req, res) => {
 res.json(lerDados());
});

app.get('/itens/:id', (req, res) => {
 const id = Number(req.params.id);
 const itens = lerDados();
 const item = itens.find(i => i.id === id);
 if (!item) {
 return res.status(404).json({ erro: 'Item não encontrado' });
 }
 res.json(item);
});

// POST /itens -> cria um novo item
app.post('/itens', (req, res) => {
 const itens = lerDados();
 const novo = { id: Date.now(), ...req.body };
 itens.push(novo);
 salvarDados(itens);
 res.status(201).json(novo);
});

app.put('/itens/:id', (req, res) => {
 const { id } = req.params;
 const { nome, price} = req.body;
 const item = items.find(i => i.id === parseInt(id));
 if (!item) {
 return res.status(404).json({ message: "Item não encontrado" });
 }
 item.nome = nome ?? item.nome;
 item.price = price ?? item.price;
 return res.status(200).json({ message: "Item updated successfully", item });
});

app.delete('/itens/:id', (req, res) => {
 const { id } = req.params;
 const itemIndex = items.findIndex(i => i.id === parseInt(id));
 if (itemIndex === -1) {
 return res.status(404).json({ message: "Item não encontrado" });
 }
 items.splice(itemIndex, 1);
 return res.status(204).send();
});

app.listen(3000, () => {
 console.log('Servidor rodando em http://localhost:3000');
});