//importar a biblioteca do node modules chamada Express para
//criar nosso servidor de backend
const express = require("express");
 
//require importa a bibliotecqa
//importar a biblioiteca mysql
const mysql = require("mysql2");

const cors = require("cors")
 
 
//fazer conexao com o banco mysql
const con = mysql.createConnection({
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
    con.query("Select * from idoso",(error,result)=>{
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
    con.query("insert into endereco(logradouro,logradouro_nome,numero,complemento,cidade,estado,bairro,cep,pais)values(?,?,?,?,?,?,?,?,?)",
        [req.body.logradouro,req.body.logradouro_nome,req.body.numero,req.body.complemento,req.body.cidade,req.body.estado,req.body.bairro,req.body.cep,req.body.pais],(error,result)=>{
     
        if(error){
            return res.status(500).send({erro:`erro ao tentar cadastrar endereco ${error}`})
        }
        id_endereco = result.insertId;

  
     con.query("insert into idoso(id_usuario,id_endereco,foto_idoso,assinante_idoso,cpf,data_nascimento,comorbidade,tipo_comorbidade,descricao,telefone_idoso,genero) values(?,?,?,?,?,?,?,?,?,?,?)",
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
   
    con.query("update idoso set ? where id=?",[req.body, req.params.id],(error,result)=>{
 
        if(error){
            return res.status(500).send({erro:`erro ao tentar atualizar ${error}`})
        }
   
   
    res.status(200).send({msg:`Dados atualizados`,payload:result});
    })
});
 
// Quarta rota para receber um id e apagar um dados
app.delete("/idoso/apagar/:id",(req,res)=>{
 
 
    con.query("delete from idoso  where id=?",req.params.id,(error,result)=>{
 
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
 
    con.query("Select * from agendamento",(error,result)=>{
        if(error){
            res.status(500)
            .send({erro:`Erro ao tentar listar os agendamento${error}`})
        }
        res.status(200).send({msg:result});
    })
 
});
//Segunda rota para receber os dados enviados pelo usuario
app.post("/agendamento/cadastrar",(req,res)=>{
 
    con.query("insert into agendamento set ?",req.body,(error,result)=>{
 
        if(error){
            return res.status(500).send({erro:`erro ao tentar cadastrar idoso ${error}`})
        }
    res.status(201).send({msg:`agendamento cadastrado`,payload:result});
    })
 
});
 
//Terceira rota para receber os dados e atualizar
app.put("/agendamento/atualizar/:id",(req,res)=>{
   
    con.query("update agendamento set ? where id=?",[req.body, req.params.id],(error,result)=>{
 
        if(error){
            return res.status(500).send({erro:`erro ao tentar atualizar ${error}`})
        }
   
   
    res.status(200).send({msg:`Dados atualizados`,payload:result});
    })
});
 
// Quarta rota para receber um id e apagar um dados
app.delete("/agendamento/apagar/:id",(req,res)=>{
 
 
    con.query("delete from agendamento  where id=?",req.params.id,(error,result)=>{
 
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
     
        con.query("Select * from avaliacao",(error,result)=>{
            if(error){
                res.status(500)
                .send({erro:`Erro ao tentar listar os avaliacao ${error}`})
            }
            res.status(200).send({msg:result});
        })
     
    });
    //Segunda rota para receber os dados enviados pelo usuario
    app.post("/cadastrar/avaliacao",(req,res)=>{
     
        con.query("insert into avaliacao set ?",req.body,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar cadastrar avalicao ${error}`})
            }
        res.status(201).send({msg:`avaliacao cadastrado`,payload:result});
        })
     
    });
     
    //Terceira rota para receber os dados e atualizar
    app.put("/avaliacao/atualizar/:id",(req,res)=>{
       
        con.query("update avaliacao set ? where id=?",[req.body, req.params.id],(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar atualizar ${error}`})
            }
       
       
        res.status(200).send({msg:`Dados atualizados`,payload:result});
        })
    });
     
    // Quarta rota para receber um id e apagar um dados
    app.delete("/avaliacao/apagar/:id",(req,res)=>{
     
     
        con.query("/avaliacao/delete from avaliacao where id=?",req.params.id,(error,result)=>{
     
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
     
        con.query("Select * from endereco",(error,result)=>{
            if(error){
                res.status(500)
                .send({erro:`Erro ao tentar listar os endereco ${error}`})
            }
            res.status(200).send({msg:result});
        })
     
    });
    //Segunda rota para receber os dados enviados pelo usuario
    app.post("/endereco/cadastrar",(req,res)=>{
     
        con.query("insert into endereco set ?",req.body,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar cadastrar endereco ${error}`})
            }
        res.status(201).send({msg:`endereco cadastrado`,payload:result});
        })
     
    });
     
    //Terceira rota para receber os dados e atualizar
    app.put("/endereco/atualizar/:id",(req,res)=>{
       
        con.query("update endereco set ? where id=?",[req.body, req.params.id],(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar atualizar ${error}`})
            }
       
       
        res.status(200).send({msg:`Dados atualizados`,payload:result});
        })
    });
     
    // Quarta rota para receber um id e apagar um dados
    app.delete("endereco/apagar/:id",(req,res)=>{
     
     
        con.query("delete from endereco where id=?",req.params.id,(error,result)=>{
     
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
     
        con.query("Select * from jovem",(error,result)=>{
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
    con.query("insert into endereco(logradouro,logradouro_nome,numero,complemento,cidade,estado,bairro,cep,pais)values(?,?,?,?,?,?,?,?,?)",
        [req.body.logradouro,req.body.logradouro_nome,req.body.numero,req.body.complemento,req.body.cidade,req.body.estado,req.body.bairro,req.body.cep,req.body.pais],(error,result)=>{
     
        if(error){
            return res.status(500).send({erro:`erro ao tentar cadastrar endereco ${error}`})
        }
        id_endereco = result.insertId;

  
     con.query("insert into idoso(id_usuario,id_endereco,cpf_jovem,valor_jovem,foto_jovem,assinante_jovem,data_nascimento_jovem,experiencia_jovem,descricao_jovem,telefone_jovem,genero_jovem) values(?,?,?,?,?,?,?,?,?,?,?)",
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
       
        con.query("update jovem set ? where id=?",[req.body, req.params.id],(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar atualizar ${error}`})
            }
       
       
        res.status(200).send({msg:`Dados atualizados`,payload:result});
        })
    });
     
    // Quarta rota para receber um id e apagar um dados
    app.delete("/jovem/apagar/:id",(req,res)=>{
     
     
        con.query("delete from idoso  where id=?",req.params.id,(error,result)=>{
     
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
        con.query(verificarDuplicidade, [email, nome_usuario], (erro, resultado) => {
            if (erro) {
                return res.status(500).send({ erro: `Erro ao verificar duplicidade: ${erro}` });
            }
   
            if (resultado.length > 0) {
                return res.status(400).send({ erro: "Email ou usuario já cadastrado!" });
            }
   
            // Se não houver duplicidade, prossegue com o cadastro
            con.query("INSERT INTO usuario SET ?", req.body, (erro, resultado) => {
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
        
        con.query(sql, [email, nome_usuario, senha], (erro, resultado) => {
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
        con.query("Select * from usuario",(error,result)=>{
            if(error){
                res.status(500)
                .send({erro:`Erro ao tentar listar os usuarios ${error}`})
            }
            res.status(200).send({msg:result});
        })
     
    });

     
    //Terceira rota para receber os dados e atualizar
    app.put("/usuario/atualizar/:id",(req,res)=>{
       
        con.query("update usuario set ? where id=?",[req.body, req.params.id],(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar atualizar ${error}`})
            }
       
       
        res.status(200).send({msg:`Dados atualizados`,payload:result});
        })
    });
     
    // Quarta rota para receber um id e apagar um dados
    app.delete("/usuario/apagar/:id",(req,res)=>{
     
     
        con.query("delete from usuario  where id=?",req.params.id,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar deletar ${error}`})
            }
            res.status(204).send({msg:`Dados atualizados`,payload:result});
        })
    });


app.listen(3000,
    ()=>console.log("Servidor online http://127.0.0.1:3000"))



    // \\\\\\\\\\\\\\\\\\\\\\\\\\     teste server msg   \\\\\\\\\\\\\\\\\\\\\\
   const WebSocket = require("ws");

const PORT = 8080;

// Criar o servidor WebSocket
const wss = new WebSocket.Server({ port: PORT });

console.log(`Servidor WebSocket rodando na porta ${PORT}`);

// Objeto para guardar conexões ativas:
// chave = userId; valor = { socket, userType }
const clients = {};

wss.on("connection", (ws) => {
  console.log("Cliente conectado");

  // Quando o cliente envia uma mensagem
  ws.on("message", (data) => {
    try {
      const msg = JSON.parse(data);

      // Registro inicial do usuário
      if (msg.type === "register") {
        // Salva a conexão com userId e userType
        clients[msg.userId] = {
          socket: ws,
          userType: msg.userType
        };
        // Também guardamos no ws para identificar depois
        ws.userId = msg.userId;
        ws.userType = msg.userType;

        console.log(`Usuário ${msg.userId} registrado como tipo ${msg.userType}`);

        return;
      }

      // Envio de mensagem privada
      if (msg.type === "private_message") {
        const sender = clients[msg.from];
        const receiver = clients[msg.to];

        // Verificar se ambos estão conectados
        if (!sender || !receiver) {
          ws.send(JSON.stringify({ type: "error", message: "Usuário não conectado." }));
          return;
        }

        // Bloquear conversas entre usuários do mesmo tipo
        if (sender.userType === receiver.userType) {
          ws.send(JSON.stringify({ type: "error", message: "Você só pode conversar com um usuário do outro tipo." }));
          return;
        }

        // Enviar a mensagem para o destinatário
        receiver.socket.send(JSON.stringify({
          type: "private_message",
          from: msg.from,
          message: msg.message,
        }));

        // Opcional: pode enviar a confirmação para quem enviou
        ws.send(JSON.stringify({ type: "message_sent" }));
      }

    } catch (error) {
      console.error("Erro ao processar mensagem:", error);
      ws.send(JSON.stringify({ type: "error", message: "Formato de mensagem inválido." }));
    }
  });

  ws.on("close", () => {
    console.log(`Cliente ${ws.userId} desconectou`);
    // Remover da lista clients
    if (ws.userId) {
      delete clients[ws.userId];
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});



    /////////////////////////////////////////////TESTE-BANCO///////////////////////////////////////////////////////

   //   "tipo_usuario": 1,
  
 //     "nome_usuario": "dominc",
  
 //     "senha": 12534531,
  
  //    "foto_usuario": link da foto
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



   // "id_usuario": ,
    //"id_endereco": ,
    //"id_contato": ,
   // "nome": ,
   // "cpf": ,
   // "data_nascimento": ,
   // "experiencia": ,
    //"chave_pix": ,
    //"descricao": ,
    //"genero": ,
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
  