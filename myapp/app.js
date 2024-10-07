const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

 
let items = [
    { id: 1, name: "Engenharia de Software"},
    { id: 2, name: "Sistemas de Informação"},
];


app.get('/item', (req, res) => {
    res.status(200).json(items);
});

// get com id especifico
app.get('/item/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    const find = data.find(d => d.id === id)
    if (find) {
        res.status(200).json(items);
    } else {
        res.status(400).json({message: 'Item nao encontrado!'})
    }
});

app.post('/item', (req, res) => {
    const {name} = req.body;
    // Checa se o nome é menor que 3 caracteres
    if (!name || typeof name !== 'string' || name.length <= 3) {  
        res.status(400).json({ error: 'Nome deve ter no minimo 3 caracteres' });
    }
    // Se o item estiver certo realiza um push
    else{
        const newItem = { id: items.length + 1, ...req.body };
        items.push(newItem);
        res.status(201).json(newItem)};
});


app.delete('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if(index !== -1) {
        items.splice(index, 1);
        res.status(200).json({mensage: "Item removido!"});
    } else {
        res.status(404).json({mensage: "Item não encontrado"});
    }
});

app.put('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items[index] = {id, ...req.body}
        res.status(200).json(items[index]);
    } else {
        res.status(404).json({ message: "Item não encontrado!"});
    }

});

app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
})