import React, {useState} from 'react';
import axios from 'axios';
import logo from '../resources/logo.svg';

function Login(props){
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });
    const [dados, setDados] = useState([]);
    const [isValid, setIsValid] = useState(true);
    
    
    
    async function valida(){
        const {username, password} = loginData;
		try {
            //  --------------- ALTERAR AO ENVIAR PARA PRODUÇÃO  ------------------//
			const res = await axios.get('http://localhost:8080/login', {
            auth: {
                username: username,
                password: password
            },
            "Content-Type":"application/json",
            "Accept": "application/json"
            });
            console.log(res);
            props.autentica();
            props.login(loginData)

            

		} catch (error) {
			setIsValid(false);
		}			
	}

    function handleChange(e){
        let {name, value} = e.target;

        setLoginData((oldValue) => {
            return {...oldValue,
                    [name]:[value]
                                }
        })
    }

    return(

        <div className="login-form ">
            <form className={isValid? null: "is-invalid"}>
                <img src={logo} alt="logo"/>
                <h6>Login</h6>
                <div className="form-group">
                    <input type="text" 
                        className="form-control" 
                        name="username" 
                        placeholder="Usuario" 
                        value={loginData.nome}
                        onChange={handleChange}
                        required="required"
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-control" 
                        name="password" 
                        placeholder="Senha" 
                        value={loginData.password}
                        onChange={handleChange}
                        required="required"
                    />
                </div>
                <div className="form-group">
                    <button type="button" onClick={valida} className="btn btn-primary btn-block">Log in</button>
                </div>
                
            </form>
            <div class="invalid-feedback">
            Usuario ou Senha invalidos
            </div>
        </div>
        
    );
}

export default Login;