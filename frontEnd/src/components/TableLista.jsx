import React, {useState, useEffect} from 'react';
import axios from 'axios';

function RegistroLista(props){

  const[erros, setErros] = useState({});
	const[errosKeys, setErrosKeys] = useState([]);
  
  const[pessoaSelecionada, setPessoaSelecionada]  = useState({
		id: "",
		nome: "",
		sexo: "",
		email: "",
		dataDeNascimento: "",
		naturalidade:"",
		nascionalidade: "",
    cpf: "",
    nomeTemErro: false,
		nomeTemMensagem: "",
		emailTemErro: false,
		emailTemMensagem: "",
		dataDeNascimentoTemErro: false,
		dataDeNascimentoTemMensagem: "",
		cpfTemErro: false,
    cpfTemMensagem: "",
    naturalidadeTemErro: false,
		naturalidadeTemMensagem: "",
		nacionalidadeTemErro: false,
		nacionalidadeTemMensagem: ""
  });

  const estadoInicial = {
		id: "",
		nome: "",
		sexo: "",
		email: "",
		dataDeNascimento: "",
		naturalidade:"",
		nascionalidade: "",
		cpf: "",
		nomeTemErro: false,
		nomeTemMensagem: "",
		emailTemErro: false,
		emailTemMensagem: "",
		dataDeNascimentoTemErro: false,
		dataDeNascimentoTemMensagem: "",
		cpfTemErro: false,
		cpfTemMensagem: "",
		naturalidadeTemErro: false,
		naturalidadeTemMensagem: "",
		nacionalidadeTemErro: false,
		nacionalidadeTemMensagem: ""
	}
  
  function handleChange(event){
    let{name, value} = event.target;
    if(name === "nome"){
			setPessoaSelecionada((old) => {
				return {...old,
						nomeTemErro: false,
						nomeTemMensagem: ""}
      }) 
		}

		if(name === "cpf"){
			setPessoaSelecionada((old) => {
				return {...old,
						cpfTemErro: false,
						cpfTemMensagem: ""}
      })
      
		}

		if(name === "dataDeNascimento"){
			setPessoaSelecionada((old) => {
				return {...old,
						dataDeNascimentoTemErro: false,
						dataDeNascimentoTemMensagem: ""}
      })
      
		}

		if(name === "email"){
			setPessoaSelecionada((old) => {
				return {...old,
						emailTemErro: false,
						emailTemMensagem: ""}
      })
      
    }
    
    if(name === "naturalidade"){
			setPessoaSelecionada((old) => {
				return {...old,
						naturalidadeTemErro: false,
						nacionalidadeTemMensagem: ""}
			})
		}

		if(name === "nacionalidade"){
			setPessoaSelecionada((old) => {
				return {...old,
						nacionalidadeTemErro: false,
						nacionalidadeTemMensagem: ""}
			})
		}

    setPessoaSelecionada((oldValue) =>{
      return(
        {
          ...oldValue,
          [name] : value
        }
      )
    })
  }

  async function deletaUser(id){
    try {
			let res = await axios({
        method: 'delete',
        //  --------------- ALTERAR AO ENVIAR PARA PRODUÇÃO  ------------------//
        url: `http://localhost:8080/api/pessoas/${id}`,
        "Content-Type":"application/json",
        "Accept": "application/json"		
			});
      console.log(res)
      props.remove(id);


		} catch (error) {
			console.log(error.response.data)
		}

    
  };

  async function atualizaUser(){	
		try {
			let res = await axios({
        method: 'put',
        //  --------------- ALTERAR AO ENVIAR PARA PRODUÇÃO  ------------------//
				url: 'http://localhost:8080/api/pessoas',
				data: pessoaSelecionada,
				headers:{
			 	  'Content-Type' : 'application/json'
				}
      });
      
      console.log(res);
      props.atualiza();
     
      
      setErrosKeys([]);
      let modal =document.getElementById("cancela");
      modal.click();

		} catch (error) {
      console.log(error.response)

      if(error.response.data.message ==="CPF já cadastrado"){
				setPessoaSelecionada((oldVal) =>{
					return {...oldVal, cpfTemErro:true, cpfTemMensagem: "CPF já cadastrado"}
				})
      }
      
      if(error.response.data.field ==="dataDeNascimento"){
				setPessoaSelecionada((oldVal) =>{
					return {...oldVal, dataDeNascimentoTemErro:true, 
							dataDeNascimentoTemMensagem: "Data de nascimento inválida."}
				})
			}
			setErros({...error.response.data});
			setErrosKeys(Object.keys(error.response.data));	
		}	
  }
  
  useEffect(()=>{
		errosKeys.map(erro =>{
			if(erro ==="nome"){
				setPessoaSelecionada(oldVal =>{
					return {...oldVal,
							nomeTemErro: true,
							nomeTemMensagem: erros.[erro]
							}
				})
			}
			if(erro ==="email"){
				setPessoaSelecionada(oldVal =>{
					return {...oldVal,
							emailTemErro: true,
							emailTemMensagem: erros.[erro]
							}
				})
			}
			if(erro ==="dataDeNascimento"){
				setPessoaSelecionada(oldVal =>{
					return {...oldVal,
							dataDeNascimentoTemErro: true,
							dataDeNascimentoTemMensagem: erros.[erro]
							}
				})
			}

			if(erro ==="cpf"){
				setPessoaSelecionada(oldVal =>{
					return {...oldVal,
							cpfTemErro: true,
							cpfTemMensagem: erros.[erro]
							}
				})
      }
      
      if(erro ==="naturalidade"){
				setPessoaSelecionada(oldVal =>{
					return {...oldVal,
							naturalidadeTemErro: true,
							naturalidadeTemMensagem: erros.[erro]
							}
				})
			}

			if(erro ==="nacionalidade"){
				setPessoaSelecionada(oldVal =>{
					return {...oldVal,
							nacionalidadeTemErro: true,
							nacionalidadeTemMensagem: erros.[erro]
							}
				})
			}
		})
  },  [errosKeys])

  function selecionaEdit(pessoa){
    setPessoaSelecionada((oldVal) =>{
      return {...oldVal, ...pessoa}
    })
  }
  
  let standardClass = " form-control ";
	let standardError = "is-invalid";

  return(
    <tbody>
        {props.listaCompleta.map(item =>{
          
          return (
            <tr key={item.id}>
              
              <td>{item.nome}</td>
              <td>{item.cpf}</td>
              <td>{item.email}</td>
              <td>{item.dataDeCriacao}</td>
              <td>{item.ultimaAtualizacao}</td>
              <td>
                <a href="#editModal" className="edit" data-toggle="modal" onClick={()=> selecionaEdit(item)}>
                  <i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                </a>
                <a 
                  href="#delete" 
                  className="delete" 
                  onClick={()=> deletaUser(item.id)} 
                >
                  <i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
              </td>

              {/* Modal de Edição do Usuário  */}
              <div id="editModal" className="modal fade " data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form>
                      <div className="modal-header">						
                        <h4 className="modal-title">Editar Usuário</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={()=> setPessoaSelecionada(estadoInicial)}> &times;</button>
                      </div>
                      <div className="modal-body">					
                        <div className="form-group">

                          <label>Nome</label>
                          <input 
                            type="text" 
                            className={ (pessoaSelecionada.nomeTemErro ? 
                              standardClass + standardError 
                              : standardClass) } 			
                            name="nome" 
                            value={pessoaSelecionada.nome} 
                            onChange={handleChange} 
                            required
                          />
                          <div className="invalid-feedback">
                                {pessoaSelecionada.nomeTemMensagem}
                          </div>

                          <label>Sexo</label>
                          <select 
                            class="custom-select mr-sm-2" 
                            id="inlineFormCustomSelect"
                            value={pessoaSelecionada.sexo}
                            onChange={handleChange}
                            name="sexo"
                          >
                            <option selected>Escolher</option>
                            <option value="1">Masculino</option>
                            <option value="2">Feminino</option>
                            <option value="0">Desconhecido</option>
                          </select>
                          

                          <label>CPF</label>
                          <input 
                            type="text" 
                            className={ (pessoaSelecionada.cpfTemErro ? 
                              standardClass + standardError 
                              : standardClass) } 		
                            name="cpf" 
                            value={pessoaSelecionada.cpf} 
                            onChange={handleChange} 
                      
                            required
                              
                          />
                          <div className="invalid-feedback">
                                {pessoaSelecionada.cpfTemMensagem}
                          </div>

                          <label>Email</label>
                          <input 
                            type="text" 
                            className={ (pessoaSelecionada.emailTemErro ? 
                              standardClass + standardError 
                              : standardClass) } 		
                            name="email" 
                            value={pessoaSelecionada.email} 
                            onChange={handleChange} 

                          />
                          <div className="invalid-feedback">
                                {pessoaSelecionada.emailTemMensagem}
                          </div>

                          <label>Data de Nascimento</label>
                          <input 
                            type="text" 
                            className={ (pessoaSelecionada.dataDeNascimentoTemErro ? 
                              standardClass + standardError 
                              : standardClass) } 		
                            name="dataDeNascimento" 
                            value={pessoaSelecionada.dataDeNascimento} 
                            onChange={handleChange} 
                            
                            required
                          />
                          <div className="invalid-feedback">
                                {pessoaSelecionada.dataDeNascimentoTemMensagem}
                          </div>

                          <label>Naturalidade</label>
                          <input 
                            type="text" 
                            className={ (pessoaSelecionada.naturalidadeTemErro ? 
                              standardClass + standardError 
                              : standardClass) } 
                            name="naturalidade" 
                            value={pessoaSelecionada.naturalidade} 
                            onChange={handleChange} 
                          />
                          <div className="invalid-feedback">
                                {pessoaSelecionada.naturalidadeTemMensagem}
                          </div>

                          <label>Nacionalidade</label>
                          <input 
                            type="text" 
                            className={ (pessoaSelecionada.nacionalidadeTemErro ? 
                              standardClass + standardError 
                              : standardClass) } 
                            name="nacionalidade" 
                            value={pessoaSelecionada.nacionalidade} 
                            onChange={handleChange} 
                          />       
                          <div className="invalid-feedback">
                                {pessoaSelecionada.nacionalidadeTemMensagem}
                          </div> 

                        </div>
                        
                      					
                      </div>
                      <div className="modal-footer">
                        <input 
                          id="cancela" 
                          type="button" 
                          className="btn btn-default" 
                          data-dismiss="modal" 
                          value="Cancel"
                          onClick={()=> setPessoaSelecionada(estadoInicial)}
                        />
                        <input 
                          type="button"
                          className="btn btn-info" 
                          value="Save" 
                          onClick={() => {
                            atualizaUser();
                          }
                          } 
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>        
            </tr>  
            
          );
        })}
    </tbody>
  
);
}

export default RegistroLista;