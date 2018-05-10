import React, {Component} from 'react';
import queryString from 'query-string';

export default class Login extends Component{
    constructor(){
        super();
        this.state = {msg: queryString.parse(this.props.location.search).msg};
    }

    envia(event){
        event.preventDefault();

        const requestInfo = {
            method: 'POST',
            mode:'no-cors',            
            body: JSON.stringify(
                {
                    email: this.login.value,
                    password: this.senha.value
                }
            ),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };

        fetch('https://api-fapeticao.herokuapp.com/api/login', requestInfo)
        .then(response => {
            console.log(response);
            if(response.ok){
                return response.json();                
            }else{
                throw new Error('Erro ao fazer login.');
            }
        })
        .then(token =>{
            console.log(token);
            //this.props.history.push('/timeline');
        })
        .catch(error =>{
            this.setState({msg: error.message});
            console.log(requestInfo);
        })
    }

    render(){
        return(
            <main style={{height: 70 + 'vh'}}>
                <div className="container">
                    <div className="row justify-content-center" style={{marginTop: 10 + '%'}}>
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-header blue darken-4 white-text">
                                    <h1 className="h1-responsive text-center">
                                        <strong>Login</strong>
                                    </h1>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.envia.bind(this)}>
                                        <div className="md-form">
                                            <label htmlFor="user">Email</label>
                                            <input type="text" name="email" id="email" className="form-control" ref={(input) => this.email = input}/>
                                        </div>
                                        <div className="md-form">
                                            <label htmlFor="senha">Senha</label>
                                            <input type="password" name="password" id="password" className="form-control" ref={(input) => this.password = input}/>
                                        </div>
                                        <div className="text-center">
                                            <input type="submit" value="Enviar" className="btn blue darken-4"/>
                                        </div>
                                        <div className="text-center mt-2">
                                            <p className="red-text">{this.state.msg}</p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
            </main>    
        );
    }
}