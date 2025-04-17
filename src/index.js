//importar a biblioteca do node modules chamada Express para
//criar nosso servidor de backend
const express = require("express");
 
//require importa a bibliotecqa
//importar a biblioiteca mysql
const mysql = require("mysql2");
 
 
//fazer conexao com o banco mysql
const con = mysql.createConnection({
    host:"127.0.0.1",
    port:3307,
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
//Segunda rota para receber os dados enviados pelo usuario
app.post("/idoso/cadastrar",(req,res)=>{
 
    con.query("insert into idoso set ?",req.body,(error,result)=>{
 
        if(error){
            return res.status(500).send({erro:`erro ao tentar cadastrar idoso ${error}`})
        }
    res.status(201).send({msg:`idoso cadastrado`,payload:result});
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
 
    con.query("insert into gendamentoset ?",req.body,(error,result)=>{
 
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
app.get("/listar",(req,res)=>{
    //usar o comando select para listar todos os clientes
     
        con.query("Select * from avalicao",(error,result)=>{
            if(error){
                res.status(500)
                .send({erro:`Erro ao tentar listar os avalicao ${error}`})
            }
            res.status(200).send({msg:result});
        })
     
    });
    //Segunda rota para receber os dados enviados pelo usuario
    app.post("/cadastrar",(req,res)=>{
     
        con.query("insert into avalicao set ?",req.body,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar cadastrar avalicao ${error}`})
            }
        res.status(201).send({msg:`avalicao cadastrado`,payload:result});
        })
     
    });
     
    //Terceira rota para receber os dados e atualizar
    app.put("/avaliacao/atualizar/:id",(req,res)=>{
       
        con.query("update avalicao set ? where id=?",[req.body, req.params.id],(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar atualizar ${error}`})
            }
       
       
        res.status(200).send({msg:`Dados atualizados`,payload:result});
        })
    });
     
    // Quarta rota para receber um id e apagar um dados
    app.delete("/avaliacao/apagar/:id",(req,res)=>{
     
     
        con.query("/avaliacao/delete from avalicao where id=?",req.params.id,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar deletar ${error}`})
            }
            res.status(204).send({msg:`Dados atualizados`,payload:result});
        })
    });
    ////////////////////////////////////////TABELA-CONTATO//////////////////////////////////////////////////////////////////////////////////////////


    // primeira rota para listar os dados do banco
app.get("/contato/listar",(req,res)=>{
    //usar o comando select para listar todos os clientes
     
        con.query("Select * from contato",(error,result)=>{
            if(error){
                res.status(500)
                .send({erro:`Erro ao tentar listar os contato ${error}`})
            }
            res.status(200).send({msg:result});
        })
     
    });
    //Segunda rota para receber os dados enviados pelo usuario
    app.post("/contato/cadastrar",(req,res)=>{
     
        con.query("insert into contato set ?",req.body,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar cadastrar contato ${error}`})
            }
        res.status(201).send({msg:`contato cadastrado`,payload:result});
        })
     
    });
     
    //Terceira rota para receber os dados e atualizar
    app.put("/contato/atualizar/:id",(req,res)=>{
       
        con.query("update contato set ? where id=?",[req.body, req.params.id],(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar atualizar ${error}`})
            }
       
       
        res.status(200).send({msg:`Dados atualizados`,payload:result});
        })
    });
     
    // Quarta rota para receber um id e apagar um dados
    app.delete("contato/apagar/:id",(req,res)=>{
     
     
        con.query("delete from contato  where id=?",req.params.id,(error,result)=>{
     
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
     
        con.query("insert into jovem set ?",req.body,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar cadastrar jovem ${error}`})
            }
        res.status(201).send({msg:`jovem cadastrado`,payload:result});
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
//////////////////////////////////////////TABELA-PAGAMENTO/////////////////////////////////////////////////////////////////////////////////////////


// primeira rota para listar os dados do banco
app.get("/pagamento/listar",(req,res)=>{
    //usar o comando select para listar todos os clientes
     
        con.query("Select * from pagamento",(error,result)=>{
            if(error){
                res.status(500)
                .send({erro:`Erro ao tentar listar os pagamento ${error}`})
            }
            res.status(200).send({msg:result});
        })
     
    });
    //Segunda rota para receber os dados enviados pelo usuario
    app.post("/pagamento/cadastrar",(req,res)=>{
     
        con.query("insert into pagamento set ?",req.body,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar cadastrar pagamento ${error}`})
            }
        res.status(201).send({msg:`pagamento cadastrado`,payload:result});
        })
     
    });
     
    //Terceira rota para receber os dados e atualizar
    app.put("/pagamento/atualizar/:id",(req,res)=>{
       
        con.query("update pagamento set ? where id=?",[req.body, req.params.id],(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar atualizar ${error}`})
            }
       
       
        res.status(200).send({msg:`Dados atualizados`,payload:result});
        })
    });
     
    // Quarta rota para receber um id e apagar um dados
    app.delete("/pagamento/apagar/:id",(req,res)=>{
     
     
        con.query("delete from pagamento  where id=?",req.params.id,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar deletar ${error}`})
            }
            res.status(204).send({msg:`Dados atualizados`,payload:result});
        })
    });

    //////////////////////////////////////////////TABELA-RECEBER/////////////////////////////////////////////////////////////////////////////////

     
// primeira rota para listar os dados do banco
app.get("/receber/listar",(req,res)=>{
    //usar o comando select para listar todos os clientes
     
        con.query("Select * from receber",(error,result)=>{
            if(error){
                res.status(500)
                .send({erro:`Erro ao tentar listar os receber ${error}`})
            }
            res.status(200).send({msg:result});
        })
     
    });
    //Segunda rota para receber os dados enviados pelo usuario
    app.post("/receber/cadastrar",(req,res)=>{
     
        con.query("insert into receber set ?",req.body,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar cadastrar receber ${error}`})
            }
        res.status(201).send({msg:`receber cadastrado`,payload:result});
        })
     
    });
     
    //Terceira rota para receber os dados e atualizar
    app.put("/receber/atualizar/:id",(req,res)=>{
       
        con.query("update receber set ? where id=?",[req.body, req.params.id],(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar atualizar ${error}`})
            }
       
       
        res.status(200).send({msg:`Dados atualizados`,payload:result});
        })
    });
     
    // Quarta rota para receber um id e apagar um dados
    app.delete("/receber/apagar/:id",(req,res)=>{
     
     
        con.query("delete from receber  where id=?",req.params.id,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar deletar ${error}`})
            }
            res.status(204).send({msg:`Dados atualizados`,payload:result});
        })
    });
    ///////////////////////////////////////////TABELA-USUARIO////////////////////////////////////////////////////////////////////////

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
    //Segunda rota para receber os dados enviados pelo usuario
    app.post("/usuario/cadastrar",(req,res)=>{
     
        con.query("insert into usuario set ?",req.body,(error,result)=>{
     
            if(error){
                return res.status(500).send({erro:`erro ao tentar cadastrar idoso ${error}`})
            }
        res.status(201).send({msg:`idoso cadastrado`,payload:result});
        })
     
    });
     
    //Terceira rota para receber os dados e atualizar
    app.put("/usuario/atualizar/:id",(req,res)=>{
       
        con.query("update idoso set ? where id=?",[req.body, req.params.id],(error,result)=>{
     
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
    
  