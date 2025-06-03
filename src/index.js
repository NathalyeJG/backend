//importar a biblioteca do node modules chamada Express para
//criar nosso servidor de backend
const express = require("express");
 
//require importa a bibliotecqa
//importar a biblioiteca mysql
const mysql = require("mysql2");
const multer = require('multer');
const cors = require("cors");
const path = require('path'); // Para trabalhar com caminhos de arquivo


 
 
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
   // --- Configuração do Multer para Upload de Imagens ---

// Define onde as imagens serão salvas e como serão nomeadas
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 'uploads/' é o diretório onde as imagens serão armazenadas
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Define o nome do arquivo: campo original + timestamp + extensão original
        // Ex: foto_jovem-1678888888888.jpg
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Filtro para aceitar apenas tipos de imagem
const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true); // Aceita o arquivo
    } else {
        // Rejeita o arquivo e retorna um erro
        cb(new Error('Formato de arquivo inválido. Apenas JPG, PNG e GIF são permitidos.'), false);
    }
};

// Configura o Multer com as opções de armazenamento e filtro
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limite de 5MB por arquivo
    }
});

// --- Servir arquivos estáticos (Imagens Uploaded) ---
// Isso permite que as imagens na pasta 'uploads' sejam acessíveis via URL
// Ex: http://localhost:3000/uploads/nome_da_minha_foto.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Rota de Upload e Cadastro de Jovem ---

// Use `upload.single('foto_jovem')` para indicar que você espera um único arquivo
// com o nome de campo 'foto_jovem' no formulário multipart.
app.post('/jovem/cadastrar', upload.single('foto_jovem'), (req, res) => {
    // Verifica se um arquivo foi enviado
    if (!req.file) {
        return res.status(400).send({ erro: 'Nenhuma foto foi enviada.' });
    }

    // `req.file` contém informações sobre o arquivo enviado pelo Multer
    const foto_jovem_path = `/uploads/${req.file.filename}`; // Caminho relativo para salvar no DB

    // `req.body` agora contém os outros campos de texto do formulário multipart
    // (ex: id_usuario, cpf_jovem, etc.)
    const { 
        id_usuario, 
        logradouro, logradouro_nome, numero, complemento, cidade, estado, bairro, cep, pais,
        cpf_jovem, valor_jovem, assinante_jovem, data_nascimento_jovem, 
        experiencia_jovem, descricao_jovem, telefone_jovem, genero_jovem 
    } = req.body;
// ################################### TESTE PARA VER OQUE ESTAVA CHEGANDO ##############################
    // console.log(`[VERIFICACAO] id_usuario ANTES da primeira query: ${id_usuario}`);
    // console.log(`[VERIFICACAO] tipo de id_usuario ANTES da primeira query: ${typeof id_usuario}`);


    // // Log para depuração: verifique se o ID do usuário está chegando
    // console.log(`ID do usuário recebido: ${id_usuario}`);
    // console.log(`Caminho da foto para o DB: ${foto_jovem_path}`);
    // console.log('Dados do corpo da requisição:', req.body); // Verifique todos os campos


    // #####################################################################################################

    let id_endereco = 0;

    // Inserir endereço
    dbConfig.query("INSERT INTO endereco(logradouro, logradouro_nome, numero, complemento, cidade, estado, bairro, cep, pais) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [logradouro, logradouro_nome, numero, complemento, cidade, estado, bairro, cep, pais], (error, result) => {
            if (error) {
                console.error("Erro ao cadastrar endereço:", error);
                return res.status(500).send({ erro: `Erro ao tentar cadastrar endereço: ${error.message}` });
            }
            id_endereco = result.insertId;

            

            // Inserir jovem
            dbConfig.query("INSERT INTO jovem(id_usuario, id_endereco, cpf_jovem, valor_jovem, foto_jovem, assinante_jovem, data_nascimento_jovem, experiencia_jovem, descricao_jovem, telefone_jovem, genero_jovem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [id_usuario, id_endereco, cpf_jovem, valor_jovem, foto_jovem_path, assinante_jovem, data_nascimento_jovem, experiencia_jovem, descricao_jovem, telefone_jovem, genero_jovem], (er, rs) => {
                    if (er) {
                        console.error("Erro ao cadastrar jovem:", er);
                        return res.status(500).send({ erro: `Erro ao tentar cadastrar jovem: ${er.message}` });
                    }
                    res.status(201).send({ msg: `Jovem cadastrado com sucesso!`, payload: rs });
                });
        });
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

    // ######################################### IDOSO ###########################################

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
app.post('/idoso/cadastrar', upload.single('foto_idoso'), (req,res)=>{

    // 1. Verificar se a foto foi enviada
    if (!req.file) {
        return res.status(400).send({ erro: 'Nenhuma foto do idoso foi enviada.' });
    }

    // 2. Obter o caminho da foto gerado pelo Multer
    const foto_idoso_path = `/uploads/${req.file.filename}`; // Caminho relativo para salvar no DB

    // 3. Desestruturar os dados do req.body (campos do formulário de texto)
    // Adapte estes nomes de variáveis para os nomes dos seus campos no formulário HTML do idoso
    const { 
        id_usuario, 
        logradouro, logradouro_nome, numero, complemento, cidade, estado, bairro, cep, pais,
        // CAMPOS ESPECÍFICOS DO IDOSO
        cpf, // Assumindo que o campo no frontend é 'cpf' e não 'cpf_jovem'
        data_nascimento, // Assumindo que o campo no frontend é 'data_nascimento'
        comorbidade, 
        tipo_comorbidade, 
        descricao, 
        telefone_idoso, 
        genero, // Campo para o gênero do idoso
        assinante_idoso // Campo para assinante do idoso
    } = req.body;

    // Converte assinante_idoso e genero para 1 ou 0 se forem BOOLEAN no DB
    const assinante_idoso_db = (assinante_idoso === 'true' || assinante_idoso === true || assinante_idoso === 1) ? 1 : 0;
    const genero_db = (genero === 'true' || genero === true || genero === 1) ? 1 : 0; // Se genero for BOOLEAN. Se for STRING, remova esta linha e use 'genero' direto

    // Log para depuração:
    console.log(`[IDOSO BACKEND] ID do usuário recebido: ${id_usuario}`);
    console.log(`[IDOSO BACKEND] Caminho da foto para o DB: ${foto_idoso_path}`);
    console.log(`[IDOSO BACKEND] Dados do corpo da requisição:`, req.body);

    let id_endereco = 0;

    // 4. Inserir Endereço Primeiro
    dbConfig.query("INSERT INTO endereco(logradouro, logradouro_nome, numero, complemento, cidade, estado, bairro, cep, pais) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [logradouro, logradouro_nome, numero, complemento, cidade, estado, bairro, cep, pais], (error, result) => {
            if (error) {
                console.error("ERRO ao CADASTRAR ENDEREÇO do idoso:", error);
                return res.status(500).send({ erro: `Erro ao tentar cadastrar endereço do idoso: ${error.message}` });
            }
            id_endereco = result.insertId;
            console.log(`[IDOSO BACKEND] ID do Endereço gerado para idoso: ${id_endereco}`);

            // 5. Inserir Idoso (usando o id_endereco recém-gerado e o caminho da foto)
            dbConfig.query("INSERT INTO idoso(id_usuario, id_endereco, foto_idoso, assinante_idoso, cpf, data_nascimento, comorbidade, tipo_comorbidade, descricao, telefone_idoso, genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",

                [id_usuario, id_endereco, foto_idoso_path, assinante_idoso_db, cpf,
                 data_nascimento, comorbidade, tipo_comorbidade, descricao, telefone_idoso, genero_db 
                ], (er, rs) => {
                    
                    if (er) {
                        console.error("ERRO ao CADASTRAR IDOSO:", er);
                        return res.status(500).send({ erro: `Erro ao tentar cadastrar idoso: ${er.message}` });
                    }
                    res.status(201).send({ msg: `Idoso cadastrado com sucesso!`, payload: rs });
                });
        });
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

    // ######################################################################################

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


  // Envia e salva uma nova mensagem no banco
  app.post("/usuarios/mensagens", (req, res) => {
    const { id_remetente, id_destinatario, conteudo } = req.body;
  
    if (!id_de || !id_para || !texto) {
      return res.status(400).json({ erro: "Campos obrigatórios: id_de, id_para, texto" });
    }
  
    const sql = "INSERT INTO mensagens (id_remetente, id_destinatario, conteudo) VALUES (?, ?, ?)";
    dbConfig.query(sql, [id_remetente, id_destinatario, conteudo], (err, result) => {
      if (err) {
        console.error("Erro ao salvar mensagem:", err);
        return res.status(500).json({ erro: "Erro ao salvar mensagem" });
      }
  
      res.status(201).json({ mensagem: "Mensagem salva com sucesso", id: result.insertId });
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
      const sql = "INSERT INTO mensagens (id_de, id_para, texto) VALUES (?, ?, ?)";
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