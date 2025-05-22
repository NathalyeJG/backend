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
app.get("/idoso/listar_pos_cadastro",(req,res)=>{
    //usar o comando select para listar todos os clientes
        dbConfig.query("Select * from idoso order by id_idoso desc limit 0,10",(error,result)=>{
            if(error){
                res.status(500)
                .send({erro:`Erro ao tentar listar os idoso ${error}`})
            }
            res.status(200).send({msg:result});
        })
     
    });




//     // \\\\\\\\\\\\\\\\\\\\\\\\\\     teste server msg   \\\\\\\\\\\\\\\\\\\\\\


// Importa os pacotes necessários
//const express = require('express');               // Framework web para rotas REST
//const mysql = require('mysql2/promise');          // Biblioteca para conectar ao MySQL com async/await
const http = require('http');                     // Módulo nativo do Node para criar o servidor
const socketio = require('socket.io');            // Biblioteca para WebSockets (tempo real)



// Cria o servidor HTTP baseado no Express
const servidorHttp = http.createServer(app);

// Cria o servidor Socket.IO em cima do HTTP
const io = socketio(servidorHttp, {
  cors: {
    origin: "*", // Permite qualquer origem (em produção deve restringir)
  }
});



// Conexão global com o banco
let conexaoDB;

// Função para conectar ao banco
async function conectarDB() {
  conexaoDB = await mysql.createConnection(dbConfig);
  console.log('✅ Conectado ao banco MySQL');
}
conectarDB(); // Executa a conexão assim que o servidor iniciar

// Objeto para mapear usuários online (chave: nome de usuário, valor: socket.id)
const usuariosOnline = {};

// Evento de conexão do WebSocket
io.on('connection', (socket) => {
  console.log('🔌 Novo usuário conectado:', socket.id);

  // Evento para registrar o nome do usuário ao conectar
  socket.on('registrar_usuario', (nomeUsuario) => {
    usuariosOnline[nomeUsuario] = socket.id;
    console.log(`👤 Usuário registrado: ${nomeUsuario}`);
  });

  // Evento para envio de mensagem privada
  socket.on('mensagem_privada', async (dados) => {
    const { remetente, destinatario, mensagem } = dados;

    try {
      // Insere a mensagem na tabela de mensagens, buscando os IDs dos usuários pelo nome
      const query = `
        INSERT INTO mensagens (remetente_id, destinatario_id, conteudo)
        SELECT r.id_usuario, d.id_usuario, ? 
        FROM usuario r, usuario d 
        WHERE r.nome_usuario = ? AND d.nome_usuario = ?
      `;
      await conexaoDB.execute(query, [mensagem, remetente, destinatario]);

      // Envia a mensagem ao destinatário se ele estiver online
      const socketDestinatario = usuariosOnline[destinatario];
      if (socketDestinatario) {
        io.to(socketDestinatario).emit('mensagem_recebida', {
          remetente,
          mensagem,
        });
      }
    } catch (erro) {
      console.error('❌ Erro ao salvar ou enviar a mensagem:', erro);
    }
  });

  // Evento de desconexão do socket
  socket.on('disconnect', () => {
    for (const nome in usuariosOnline) {
      if (usuariosOnline[nome] === socket.id) {
        delete usuariosOnline[nome];
        console.log(`❎ Usuário desconectado: ${nome}`);
        break;
      }
    }
  });
});

// Rota para buscar o histórico de mensagens entre dois usuários
app.get('/historico/:usuario1/:usuario2', async (req, res) => {
  const { usuario1, usuario2 } = req.params;

  try {
    const query = `
      SELECT 
        u1.nome_usuario AS remetente, 
        u2.nome_usuario AS destinatario, 
        m.conteudo, 
        m.data_envio
      FROM mensagens m
      JOIN usuario u1 ON m.remetente_id = u1.id_usuario
      JOIN usuario u2 ON m.destinatario_id = u2.id_usuario
      WHERE (u1.nome_usuario = ? AND u2.nome_usuario = ?) 
         OR (u1.nome_usuario = ? AND u2.nome_usuario = ?)
      ORDER BY m.data_envio ASC
    `;

    const [mensagens] = await conexaoDB.execute(query, [usuario1, usuario2, usuario2, usuario1]);
    res.json(mensagens);
  } catch (erro) {
    console.error('❌ Erro ao buscar histórico:', erro);
    res.status(500).send('Erro ao buscar histórico');
  }
});

// Define a porta do servidor
const PORTA = 3000;
servidorHttp.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});











app.listen(3000,
    ()=>console.log("Servidor online http://127.0.0.1:3000"))
