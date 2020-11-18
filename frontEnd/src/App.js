import React, {useState, useEffect} from "react";
import Cadastro from "./components/Cadastro";
import Listagem from "./components/Listagem";
import Login from "./components/Login";
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  const[atualiza, setAtualiza] = useState(0);
  const [basicAuthHeader, setBasicAuthHeader] = useState("");
  const [dados, setDados] = useState([]);
  const [autenticado, setAutenticado] = useState(false);


  function inserirInterceptadores(){
    axios.interceptors.request.use(
      (config) => {
        if(autenticado){
          config.headers.authorization = basicAuthHeader;
        }
        return config
      }
    )
  }

  function autentica(){
    setAutenticado(true);
    inserirInterceptadores();
  }

  function recebeLogin(){
    
    setBasicAuthHeader('Basic c29mdHBsYW46MTIzNDU=');
    sessionStorage.setItem('authenticatedUser', 'softplan');

  }

  useEffect(() => {
    if(sessionStorage.authenticatedUser === "softplan"){
      autentica();
      recebeLogin();
    }
  })

  useEffect(() =>{
    
    try {
      //  --------------- ALTERAR AO ENVIAR PARA PRODUÇÃO  ------------------//
      let res = axios.get("http://localhost:8080/api/pessoas");
      res.then(data => {
        setDados(data.data)
      })

		} catch (error) {
      
        
      console.log(error)
      
		}
  }, [atualiza,basicAuthHeader])

  function remove(id){
    setDados(dados.filter(dado => dado.id !== id))
  }

  function handleAtualiza(){
    setAtualiza(oldVal => oldVal +1)
  }
  
  return (
    <Router>
    <Route path="/source" component={()=>{
        //  --------------- ALTERAR AO ENVIAR PARA PRODUÇÃO  ------------------
      window.location.href="http://localhost:8080/source"; 
      return null;
    }} />
    <div className="App">
     
      
      {autenticado?
      <span>
      
      <Cadastro atualiza={handleAtualiza}/>
      <Listagem 
        atualiza={handleAtualiza}
        listaCompleta={dados}
        remove={remove}

      />
      </span>:
      <Login autentica={autentica} login={recebeLogin}/>}
           
    </div>
  </Router>
  );
}

export default App;
