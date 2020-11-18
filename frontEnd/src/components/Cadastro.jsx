import React ,{useEffect, useState} from 'react';
import axios from 'axios';

function Cadastro(props){
	const[erros, setErros] = useState({});
	const[errosKeys, setErrosKeys] = useState([]);
	const[pessoa, setPessoa]  = useState({
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
	);
	
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
		const {name, value} = event.target;

		if(name === "nome"){
			setPessoa((old) => {
				return {...old,
						nomeTemErro: false,
						nomeTemMensagem: ""}
			})
		}

		if(name === "cpf"){
			setPessoa((old) => {
				return {...old,
						cpfTemErro: false,
						cpfTemMensagem: ""}
			})
		}

		if(name === "dataDeNascimento"){
			setPessoa((old) => {
				return {...old,
						dataDeNascimentoTemErro: false,
						dataDeNascimentoTemMensagem: ""}
			})
		}

		if(name === "email"){
			setPessoa((old) => {
				return {...old,
						emailTemErro: false,
						emailTemMensagem: ""}
			})
		}

		if(name === "naturalidade"){
			setPessoa((old) => {
				return {...old,
						naturalidadeTemErro: false,
						nacionalidadeTemMensagem: ""}
			})
		}

		if(name === "nacionalidade"){
			setPessoa((old) => {
				return {...old,
						nacionalidadeTemErro: false,
						nacionalidadeTemMensagem: ""}
			})
		}

		setPessoa(oldValue =>{
			return (
				{
					...oldValue,
					[name] : value
				}
			);
		})
	}

	async function submeteForm(){	
		try {
			let res = await axios({
				method: 'post',
				//  --------------- ALTERAR AO ENVIAR PARA PRODUÇÃO  ------------------//
				url: 'http://localhost:8080/api/pessoas',
				data: pessoa,
				headers:{
			 	  	'Content-Type' : 'application/json'
				}
			});

			let data = res.data;

			props.atualiza();
			setPessoa(estadoInicial);

			return data;

		} catch (error) {
			console.log(error.response)
			if(error.response.data.message ==="CPF já cadastrado"){
				setPessoa((oldVal) =>{
					return {...oldVal, cpfTemErro:true, cpfTemMensagem: "CPF já cadastrado"}
				})
			}
			
			console.log("O ERRO ESTA AQUI")

			if(error.response.data.field ==="dataDeNascimento"){
				setPessoa((oldVal) =>{
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
				setPessoa(oldVal =>{
					return {...oldVal,
							nomeTemErro: true,
							nomeTemMensagem: erros.[erro]
							}
				})
			}
			if(erro ==="email"){
				setPessoa(oldVal =>{
					return {...oldVal,
							emailTemErro: true,
							emailTemMensagem: erros.[erro]
							}
				})
			}
			

			if(erro ==="dataDeNascimento"){
				setPessoa(oldVal =>{
					return {...oldVal,
							dataDeNascimentoTemErro: true,
							dataDeNascimentoTemMensagem: erros.[erro]
							}
				})
			}

			if(erro ==="cpf"){
				setPessoa(oldVal =>{
					return {...oldVal,
							cpfTemErro: true,
							cpfTemMensagem: erros.[erro]
							}
				})
			}

			if(erro ==="naturalidade"){
				setPessoa(oldVal =>{
					return {...oldVal,
							naturalidadeTemErro: true,
							naturalidadeTemMensagem: erros.[erro]
							}
				})
			}

			if(erro ==="nacionalidade"){
				setPessoa(oldVal =>{
					return {...oldVal,
							nacionalidadeTemErro: true,
							nacionalidadeTemMensagem: erros.[erro]
							}
				})
			}

			
		})
	},  [errosKeys])

	
	let standardClass = " form-control ";
	let standardError = "is-invalid";

	
  return(
    <div className="container-xl">
		<div className="table-responsive">
        	<div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2>Cadastrar <b>Usuário</b></h2> 
                        </div>
						
                    </div>
                </div>
				    
				<div className="form-row">
					<div className="form-group col-md-6">
						<label htmlFor="inputNome">Nome</label>
						<input
								name="nome"
								type="text" 
								className={ (pessoa.nomeTemErro ? 
											standardClass + standardError 
											: standardClass) } 												 
								placeholder="Nome"
								onChange={handleChange}
								value={pessoa.nome}
								/>
						<div className="invalid-feedback">
          						{pessoa.nomeTemMensagem}
        				</div>
					</div>
					<div className="form-group col-md-6">
						<label htmlFor="cpf">CPF</label>
						<input
								name="cpf"
								type="text" 
								className={ (pessoa.cpfTemErro ? 
									standardClass + standardError 
									: standardClass) } 		 												 
								placeholder="Apenas Números, ex: 00011122233"
								onChange={handleChange}
								value={pessoa.cpf}
								/>
								<div className="invalid-feedback">
          						{pessoa.cpfTemMensagem}
        				</div>
					</div>

					<div className="form-group col-md-2">
						
						 <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Sexo</label>
						<select 
							className="custom-select mr-sm-2" 
							id="inlineFormCustomSelect"
							value={pessoa.sexo}
							onChange={handleChange}
							name="sexo"
						>
							<option defaultValue>Escolher</option>
							<option value="1">Masculino</option>
							<option value="2">Feminino</option>
							<option value="0">Desconhecido</option>
						</select>
					</div>
					<div className="form-group col-md-10">
						<label htmlFor="inputEmail">Email</label>
						
						<input 
							name="email"
							type="email" 
							className={ (pessoa.emailTemErro ? 
								standardClass + standardError 
								: standardClass) } 		
							placeholder="Ex: onias.filho@softplayer.com"
							onChange={handleChange}
							value={pessoa.email}
							/>
							<div className="invalid-feedback">
          						{pessoa.emailTemMensagem}
        				</div>							
					</div>
				</div>
				<div className="form-row">
					

					<div className="form-group col-md-6">
						
						
						
						<label htmlFor="dataDeNascimento"> Data de Nascimento </label>		
						<input 
							name="dataDeNascimento"
							type="text"
							pattern="^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$" 
							className={ (pessoa.dataDeNascimentoTemErro ? 
								standardClass + standardError 
								: standardClass) } 		
							placeholder="Ex: 30/03/1995"
							onChange={handleChange}
							value={pessoa.dataDeNascimento}
							/>
							<div className="invalid-feedback">
          						{pessoa.dataDeNascimentoTemMensagem}
        					</div>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-6">
						<label htmlFor="naturalidade"> Naturalidade </label>
						<input 
							name="naturalidade"
							type="text" 
							className={ (pessoa.naturalidadeTemErro ? 
								standardClass + standardError 
								: standardClass) } 	 
							placeholder="Ex: São Paulo"
							onChange={handleChange}
							value={pessoa.naturalidade}
							/>
						<div className="invalid-feedback">
          						{pessoa.naturalidadeTemMensagem}
						</div>
					</div>	
						
					<div className="form-group col-md-6">
						<label htmlFor="nacionalidade"> Nacionalidade </label>
						<input 
							name="nacionalidade"
							type="text" 
							className={ (pessoa.nacionalidadeTemErro ? 
								standardClass + standardError 
								: standardClass) } 	
							placeholder="Ex: Brasil"
							onChange={handleChange}
							value={pessoa.nacionalidade}
							/>
							<div className="invalid-feedback">
          						{pessoa.nacionalidadeTemMensagem}
							
					</div>
					</div>
							
												
				</div>

				<button 
					type="submit"
					className="btn btn-primary"
					onClick={submeteForm}
						
				>
					Cadastrar
				</button>
                
            </div>
        </div>        
      </div>
  );
}

export default Cadastro;