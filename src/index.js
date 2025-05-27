//importar a biblioteca do node modules chamada Express para
//criar nosso servidor de backend
const express = require("express");
 
//require importa a bibliotecqa
//importar a biblioiteca mysql
const mysql = require("mysql2");

const cors = require("cors")
 
 
//fazer conexao com o banco mysql
const dbConfig = mysql.createConnection({
    host:"127.0.0.1",
    port:3306,
    user:"root",
    password:"",
    database:"sidedb"
});
 
 
//carregar e instânciar o express para utilizar as rotas:
// GET -> Para obter dados do banco de dados-> R
// POST -> Para enviar dados ao servidor e gravar dados no banco -> C
// PUT -> Para atualizar os dados no banco -> U
// DELETE -> Para apagar dados em banco -> D
 
const app = express();
 
// Carregar a função que manipula dados em formato JSON, ou seja, permite
// ler, gravar,atualizar,deletar, enviar e receber dados em formato JSON
app.use(express.json());
 
app.use(cors())

// primeira rota para listar os dados do banco
app.get("/idoso/listar",(req,res)=>{
//usar o comando select para listar todos os clientes
    dbConfig.query("Select * from idoso",(error,result)=>{
        if(error){
            res.status(500)
            .send({erro:`Erro ao tentar listar os idosos ${error}`})
        }
        res.status(200).send({msg:result});
    })
 
});
//Segunda rota para receber os dados enviados pelo usuario.
app.post("/idoso/cadastrar",(req,res)=>{
 
    let id_endereco = 0
    dbConfig.query("insert into endereco(logradouro,logradouro_nome,numero,complemento,cidade,estado,bairro,cep,pais)values(?,?,?,?,?,?,?,?,?)",
        [req.body.logradouro,req.body.logradouro_nome,req.body.numero,req.body.complemento,req.body.cidade,req.body.estado,req.body.bairro,req.body.cep,req.body.pais],(error,result)=>{
     
        if(error){
            return res.status(500).send({erro:`erro ao tentar cadastrar endereco ${error}`})
        }
        id_endereco = result.insertId;

  
     dbConfig.query("insert into idoso(id_usuario,id_endereco,foto_idoso,assinante_idoso,cpf,data_nascimento,comorbidade,tipo_comorbidade,descricao,telefone_idoso,genero) values(?,?,?,?,?,?,?,?,?,?,?)",
        [req.body.id_usuario,id_endereco,req.body.foto_idoso,req.body.assinante_idoso,req.body.cpf,req.body.data_nascimento,req.body.comorbidade,req.body.tipo_comorbidade,req.body.descricao,req.body.telefone_idoso,req.body.genero],(er,rs)=>{
 
        if(er){
            return res.status(500).send({erro:`erro ao tentar cadastrar idoso ${er}`})
        }
    res.status(201).send({msg:`idoso cadastrado`,payload:rs});
    })
})
});
 
//Terceira rota para receber os dados e atualizar
app.put("/idoso/atualizar/:id",(req,res)=>{
   
    dbConfig.query("update idoso set ? where id=?",[req.body, req.params.id],(error,result)=>{
 
        if(error){
            return res.status(500).send({erro:`erro ao tentar atualizar ${error}`})
        }
   
   
    res.status(200).send({msg:`Dados atualizados`,payload:result});
    })
});
 
// Quarta rota para receber um id e apagar um dados
app.delete("/idoso/apagar/:id",(req,res)=>{
 
 
    dbConfig.query("delete from idoso  where id=?",req.params.id,(error,result)=>{
 
        if(error){
            return res.status(500).send({erro:`erro ao tentar deletar ${error}`})
        }
        res.status(204).send({msg:`Dados atualizados`,payload:result});
    })
});
///////////////////////////////////////////////TABELA-AGENDAMENTO///////////////////////////////////////////////////////////////////////////////////

 // primeira rota para listar os dados do banco
app.get("/agendamento/listar",(req,res)=>{
//usar o comando select para listar todos os clientes
 
    dbConfig.query("Select * from agendamento",(error,result)=>{
        if(error){
            res.status(500)
            .send({erro:`Erro ao tentar listar os agendamento${error}`})
        }
        res.status(200).send({msg:result});
    })
 
});
//Segunda rota para receber os dados enviados pelo usuario
app.post("/agendamento/cadastrar",(req,res)=>{
 
    dbConfig.query("insert into agendamento set ?",req.body,(error,result)=>{
 
        if(error){
            return res.status(500).send({erro:`erro ao tentar cadastrar idoso ${error}`})
        }
    res.status(201).send({msg:`agendamento cadastrado`,payload:result});
    })
 
});
 
//Terceira rota para receber os dados e atualizar
app.put("/agendamento/atualizar/:id",(req,res)=>{
   
    dbConfig.query("update agendamento set ? where id=?",[req.body, req.params.id],(error,result)=>{
 
        if(error){
            return res.status(500).send({erro:`erro ao tentar atualizar ${error}`})
        }
   
   
    res.status(200).send({msg:`Dados atualizados`,payload:result});
    })
});
 
// Quarta rota para receber um id e apagar um dados
app.delete("/agendamento/apagar/:id",(req,res)=>{
 
 
    dbConfig.query("delete from agendamento  where id=?",req.params.id,(error,result)=>{
 
        if(error){
            return res.status(500).send({erro:`erro ao tentar deletar ${error}`})
        }
        res.status(204).send({msg:`Dados atualizados`,payload:result});
    })
});
/////////////////////////////////////////////TABELA-AVALIAÇÃO/////////////////////////////////////////////////////////////////////////////////

// primeira rota para listar os dados do banco
app.get("/listar/avaliacao",(req,res)=>{
    //usar o comando select para listar todos os clientes
     
        dbConfig.query("Select * from avaliacao",(error,result)=>{
            if(error){
                res.status(500)
                .send({erro:`Erro ao tentar listar os avaliacao ${error}`})
            }
            res.status(200).send({msg:result});
        })
     
    });
    //Segunda rota para receber os dados enviados pelo usuario
    app.post("/cadastrar/avaliacao",(req,res)=>{
     
        dbConfig.query("insert into avaliacao set ?",req.body,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar cadastrar avalicao ${error}`})
            }
        res.status(201).send({msg:`avaliacao cadastrado`,payload:result});
        })
     
    });
     
    //Terceira rota para receber os dados e atualizar
    app.put("/avaliacao/atualizar/:id",(req,res)=>{
       
        dbConfig.query("update avaliacao set ? where id=?",[req.body, req.params.id],(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar atualizar ${error}`})
            }
       
       
        res.status(200).send({msg:`Dados atualizados`,payload:result});
        })
    });
     
    // Quarta rota para receber um id e apagar um dados
    app.delete("/avaliacao/apagar/:id",(req,res)=>{
     
     
        dbConfig.query("/avaliacao/delete from avaliacao where id=?",req.params.id,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar deletar ${error}`})
            }
            res.status(204).send({msg:`Dados atualizados`,payload:result});
        })
    });
    
    ///////////////////////////////////////////////////////TABELA-ENDEREÇO/////////////////////////////////////////////////////////////////

    // primeira rota para listar os dados do banco
app.get("/endereco/listar",(req,res)=>{
    //usar o comando select para listar todos os clientes
     
        dbConfig.query("Select * from endereco",(error,result)=>{
            if(error){
                res.status(500)
                .send({erro:`Erro ao tentar listar os endereco ${error}`})
            }
            res.status(200).send({msg:result});
        })
     
    });
    //Segunda rota para receber os dados enviados pelo usuario
    app.post("/endereco/cadastrar",(req,res)=>{
     
        dbConfig.query("insert into endereco set ?",req.body,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar cadastrar endereco ${error}`})
            }
        res.status(201).send({msg:`endereco cadastrado`,payload:result});
        })
     
    });
     
    //Terceira rota para receber os dados e atualizar
    app.put("/endereco/atualizar/:id",(req,res)=>{
       
        dbConfig.query("update endereco set ? where id=?",[req.body, req.params.id],(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar atualizar ${error}`})
            }
       
       
        res.status(200).send({msg:`Dados atualizados`,payload:result});
        })
    });
     
    // Quarta rota para receber um id e apagar um dados
    app.delete("endereco/apagar/:id",(req,res)=>{
     
     
        dbConfig.query("delete from endereco where id=?",req.params.id,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar deletar ${error}`})
            }
            res.status(204).send({msg:`Dados atualizados`,payload:result});
        })
    });
///////////////////////////////////////////////////TABELA-JOVEM/////////////////////////////////////////////////////////////////////////////////////////////

    // primeira rota para listar os dados do banco
    app.get("/jovem/listar",(req,res)=>{
    //usar o comando select para listar todos os clientes
     
        dbConfig.query("Select * from jovem",(error,result)=>{
            if(error){
                res.status(500)
                .send({erro:`Erro ao tentar listar os jovem ${error}`})
            }
            res.status(200).send({msg:result});
        })
     
    });
    //Segunda rota para receber os dados enviados pelo usuario
   app.post("/jovem/cadastrar",(req,res)=>{
 
    let id_endereco = 0
    dbConfig.query("insert into endereco(logradouro,logradouro_nome,numero,complemento,cidade,estado,bairro,cep,pais)values(?,?,?,?,?,?,?,?,?)",
        [req.body.logradouro,req.body.logradouro_nome,req.body.numero,req.body.complemento,req.body.cidade,req.body.estado,req.body.bairro,req.body.cep,req.body.pais],(error,result)=>{
     
        if(error){
            return res.status(500).send({erro:`erro ao tentar cadastrar endereco ${error}`})
        }
        id_endereco = result.insertId;

  
     dbConfig.query("insert into jovem(id_usuario,id_endereco,cpf_jovem,valor_jovem,foto_jovem,assinante_jovem,data_nascimento_jovem,experiencia_jovem,descricao_jovem,telefone_jovem,genero_jovem) values(?,?,?,?,?,?,?,?,?,?,?)",
        [req.body.id_usuario,id_endereco,req.body.cpf_jovem,req.body.valor_jovem,req.body.foto_jovem,req.body.assinante_jovem,req.body.data_nascimento_jovem,req.body.experiencia_jovem,req.body.descricao_jovem,req.body.telefone_jovem,req.body.genero_jovem],(er,rs)=>{
 
        if(er){
            return res.status(500).send({erro:`erro ao tentar cadastrar jovem ${er}`})
        }
    res.status(201).send({msg:`jovem cadastrado`,payload:rs});
    })
})
});
 
     
    //Terceira rota para receber os dados e atualizar
    app.put("/jovem/atualizar/:id",(req,res)=>{
       
        dbConfig.query("update jovem set ? where id=?",[req.body, req.params.id],(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar atualizar ${error}`})
            }
       
       
        res.status(200).send({msg:`Dados atualizados`,payload:result});
        })
    });
     
    // Quarta rota para receber um id e apagar um dados
    app.delete("/jovem/apagar/:id",(req,res)=>{
     
     
        dbConfig.query("delete from idoso  where id=?",req.params.id,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar deletar ${error}`})
            }
            res.status(204).send({msg:`Dados atualizados`,payload:result});
        })
    });

    ///////////////////////////////////////////TABELA-USUARIO////////////////////////////////////////////////////////////////////////
    // primeira rota para listar os dados do banco
    app.post("/usuario/cadastrar", (req, res) => {
        const { email, nome_usuario } = req.body;
   
        // Primeiro, verifica se já existe um usuário com o mesmo email ou nome de usuário
        const verificarDuplicidade = "SELECT * FROM usuario WHERE email = ? OR nome_usuario = ?";
        dbConfig.query(verificarDuplicidade, [email, nome_usuario], (erro, resultado) => {
            if (erro) {
                return res.status(500).send({ erro: `Erro ao verificar duplicidade: ${erro}` });
            }
   
            if (resultado.length > 0) {
                return res.status(400).send({ erro: "Email ou usuario já cadastrado!" });
            }
   
            // Se não houver duplicidade, prossegue com o cadastro
            dbConfig.query("INSERT INTO usuario SET ?", req.body, (erro, resultado) => {
                if (erro) {
                    return res.status(500).send({ erro: `Erro ao cadastrar usuário: ${erro}` });
                }
   
                res.status(201).send({ msg: "Usuário cadastrado com sucesso", payload: resultado });
            });
        });
    });



    app.post("/usuario/logar", (req, res) => {
        const { email, nome_usuario, senha } = req.body;
    
        const sql = "SELECT * FROM usuario WHERE (email = ? OR nome_usuario = ?) AND senha = ?";
        
        dbConfig.query(sql, [email, nome_usuario, senha], (erro, resultado) => {
            if (erro) {
                return res.status(500).send({ erro: `Erro ao fazer login: ${erro}` });
            }
    
            if (resultado.length === 0) {
                return res.status(401).send({ erro: "Email, usuário ou senha incorretos." });
            }
    
            // Aqui deu certo o login
            res.status(200).send({ msg: "Login realizado com sucesso", usuario: resultado[0] });
        });
    });

// primeira rota para listar os dados do banco
app.get("/usuario/listar",(req,res)=>{
    //usar o comando select para listar todos os clientes
        dbConfig.query("Select * from usuario",(error,result)=>{
            if(error){
                res.status(500)
                .send({erro:`Erro ao tentar listar os usuarios ${error}`})
            }
            res.status(200).send({msg:result});
        })
     
    });

     
    //Terceira rota para receber os dados e atualizar
    app.put("/usuario/atualizar/:id",(req,res)=>{
       
        dbConfig.query("update usuario set ? where id=?",[req.body, req.params.id],(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar atualizar ${error}`})
            }
       
       
        res.status(200).send({msg:`Dados atualizados`,payload:result});
        })
    });
     
    // Quarta rota para receber um id e apagar um dados
    app.delete("/usuario/apagar/:id",(req,res)=>{
     
     
        dbConfig.query("delete from usuario  where id=?",req.params.id,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar deletar ${error}`})
            }
            res.status(204).send({msg:`Dados atualizados`,payload:result});
        })
    });


// primeira rota para listar os dados do banco
// Rota atualizada
app.get("/idoso/listar_pos_cadastro", (req, res) => {
  const sql = `
    SELECT 
      idoso.*, 
      usuario.nome_completo 
    FROM idoso 
    INNER JOIN usuario ON idoso.id_usuario = usuario.id_usuario 
    ORDER BY idoso.id_idoso DESC 
    LIMIT 10
  `;
  
  dbConfig.query(sql, (error, result) => {
    if (error) {
      res.status(500).send({ erro: `Erro ao listar os idosos: ${error}` });
    } else {
      res.status(200).send({ msg: result });
    }
  });
});

app.get("/idoso/perfil_idoso/:id", (req, res) => {
  const sql = `
    SELECT 
      idoso.*, 
      usuario.nome_completo 
    FROM idoso 
    INNER JOIN usuario ON idoso.id_usuario = usuario.id_usuario 
    where idoso.id_idoso=?
    ORDER BY idoso.id_idoso DESC 
    LIMIT 10
  `;
  
  dbConfig.query(sql, req.params.id, (error, result) => {
    if (error) {
      res.status(500).send({ erro: `Erro ao listar os idosos: ${error}` });
    } else {
      res.status(200).send({ msg: result });
    }
  });
});


    // Lista os 10 jovens mais recentes para exibir na tela inicial do idoso
app.get("/jovem/listar_para_idoso", (req, res) => {
  const sql = `
    SELECT jovem.*, usuario.nome_completo, usuario.nome_usuario, usuario.email
    FROM jovem
    INNER JOIN usuario ON jovem.id_usuario = usuario.id_usuario
    ORDER BY jovem.id_jovem DESC
    LIMIT 10
  `;

  dbConfig.query(sql, (error, result) => {
    if (error) {
      res.status(500).send({ erro: "Erro ao listar os jovens: " + error });
    } else {
      res.status(200).send({ msg: result });
    }
  });
});


app.get("/jovem/perfil_jovem/:id", (req, res) => {
    const sql = `
      SELECT 
        jovem.*, 
        usuario.nome_completo 
      FROM jovem 
      INNER JOIN usuario ON jovem.id_usuario = usuario.id_usuario 
      where jovem.id_jovem=?
      ORDER BY jovem.id_jovem DESC 
      LIMIT 10
    `;
    
    dbConfig.query(sql, req.params.id, (error, result) => {
      if (error) {
        res.status(500).send({ erro: `Erro ao listar os jovem: ${error}` });
      } else {
        res.status(200).send({ msg: result });
      }
    });
  });
  


// GET /idoso/:id
app.get("/idoso/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM idoso WHERE id_idoso = ?";
  db.query(sql, [id], (erro, resultados) => {
    if (erro) {
      return res.status(500).json({ erro: "Erro no banco de dados" });
    }
    if (resultados.length === 0) {
      return res.status(404).json({ erro: "Idoso não encontrado" });
    }
    res.json(resultados[0]);
  });
});



//     // \\\\\\\\\\\\\\\\\\\\\\\\\\     teste server msg   \\\\\\\\\\\\\\\\\\\\\\


    // \\\\\\\\\\\\\\\\\\\\\\\\\\     teste server msg   \\\\\\\\\\\\\\\\\\\\\\
    const { WebSocketServer } = require("ws")
    const dotenv = require("dotenv")
    
    dotenv.config()

// Cria um novo servidor WebSocket na porta definida no .env ou 8080
const wss = new WebSocketServer({ port: process.env.PORT || 8080 });

// Cria um mapa para armazenar conexões ativas por ID de usuário
const conexoes = new Map();

// Evento: quando um cliente se conecta
wss.on("connection", (ws) => {
  // Exibe erro no console caso ocorra
  ws.on("error", console.error);

  // Evento: quando o cliente envia uma mensagem
  ws.on("message", (data) => {
    const msg = JSON.parse(data); // converte a mensagem recebida de string para objeto

    // Se o tipo da mensagem for "login", salva o ID na conexão e armazena no mapa
    if (msg.tipo === "login") {
      ws.id_usuario = msg.id;
      conexoes.set(msg.id, ws);
      console.log(`Usuário ${msg.id} conectado`);
      return;
    }

    // Se for uma mensagem de chat
    if (msg.tipo === "mensagem") {
      const { de, para, texto } = msg;

      // Salva a mensagem no banco de dados
      const sql = "INSERT INTO mensagem (id_de, id_para, texto) VALUES (?, ?, ?)";
      dbConfig.query(sql, [de, para, texto], (err, results) => {
        if (err) return console.error("Erro ao salvar mensagem:", err);
        console.log("Mensagem salva no banco");
      });

      // Se o destinatário estiver conectado, envia a mensagem para ele
      const wsDestino = conexoes.get(para);
      if (wsDestino) {
        wsDestino.send(JSON.stringify({
          de,
          texto
        }));
      }
    }
  });

  // Evento: quando a conexão é encerrada, remove do mapa
  ws.on("close", () => {
    if (ws.id_usuario) {
      conexoes.delete(ws.id_usuario);
      console.log(`Usuário ${ws.id_usuario} desconectado`);
    }
  });

  console.log("Cliente conectado");
});
app.listen(3000,
    ()=>console.log("Servidor online http://127.0.0.1:3000"))
