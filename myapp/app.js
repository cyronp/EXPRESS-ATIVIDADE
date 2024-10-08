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

app.get('/item/count', (req,res) =>{
    // conta quantos items tem
    res.status(200).json(items.length)
})

// get com id especifico
app.get('/item/:id', (req, res) => {
    const id = parseInt(req.params.id)
    // procura o id
    const item = items.find(i => i.id === id)
    if (item) {
        res.status(200).json(item);
    } else {
        res.status(404).json({message: 'Item nao encontrado!'})
    }
});

app.post('/item', (req, res) => {
    const {name} = req.body;
    // checa se o nome é menor que 3 caracteres
    if (!name || typeof name !== 'string' || name.length <= 3) {  
        res.status(400).json({ error: 'Nome deve ter no minimo 3 caracteres' });
    }
    // se o item estiver certo realiza um push
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
// Remover todos os itens transformando o tamanho total para 0
app.delete('/removeall', (req,res) => {
    items.length = 0
    res.status(200).json({mensage: "Todos os itens foram removidos com sucesso!"})
})

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

app.patch('/item/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);
    if (item){
        // procura o item com o id fornecido, e modifica seu nome
        (req.body.name); item.name = req.body.name;
        res.status(200).json({mensage: "Item modificado com sucesso!" });
    }else{
        res.status(404).json({mensage: "Item nao foi encontrado"});
    }
});

app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
})