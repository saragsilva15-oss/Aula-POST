const express = require("express");
const app = express(); 

const PORT = 8081;
const fs=require("fs");

app.use(express.json());
const CAMINHO_ARQUIVO ="./livros.json";

if(!fs.existsSync(CAMINHO_ARQUIVO)){
    fs.writeFileSync(CAMINHO_ARQUIVO,'[]');

}

app.post("/livros", (req, res) => {
    try {
        const { nome, autor, ano, quantidade } = req.body;
        if(nome=="" || nome== undefined || autor==undefined|| autor==""||ano==undefined|| isNaN(ano)|| isNaN(quantidade)){

        return res.status(400).json({message: "campos obrigatorios não definidos"});
        }
      
        const data =fs.readFileSync(CAMINHO_ARQUIVO, "utf-8");
        let livros =JSON.parse(data);
          const novoLivro = {
            id: livros.length + 1,
            nome,
            autor,
            ano,
            quantidade
          }
          livros.push(novoLivro);
          fs.writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(livros, null, 4));
        

        res.status(201).json({
             message: `Livro cadastrado com sucesso!`,
            livro: novoLivro
         });
    } catch (error) {
        console.log(`Error ao cadastrar Livro ${error}`);
        res.status(500).json({ message: `Error interno no servidor` });
    }
}   
);
app.get("/livros", (req, res)=>{
    try {
        const data = fs.readFileSync(CAMINHO_ARQUIVO, "utf-8");
        let livros =JSON.parse(data);

        const{nome}=req.query;
        if(nome){
            livros=livros.filter(livros=>
                livros.nome.toLowerCase().includes(nome.toLowerCase())
            )
        }  
        res.status(200).json(livros);
        
    } catch (error) {
        console.log(`Erro ao cadastrar livro ${erro}`);
        res.status(500).json({message: `Erro interno no servidor`});
    }
})
app.listen(PORT, () => {
    console.log(`Servidor rodando em ${PORT}`);
}); 