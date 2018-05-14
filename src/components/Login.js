import React, {Component} from 'react';
import $ from 'jquery';
//import queryString from 'query-string';

export default class Login extends Component{
    constructor(){
        super();
        //this.state = {msg: queryString.parse(this.props.location.search).msg};
    }

    envia(event){
        event.preventDefault();
        $.ajax({
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url: 'https://api-fapeticao.herokuapp.com/api/login',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({email: this.email.value, password: this.password.value}),
            success: function(resposta){
                $.ajax({
                    headers:{
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + resposta.token
                    },
                    url:'https://api-fapeticao.herokuapp.com/api/user',
                    type: 'get',
                    success: function(user){
                        console.log(user);
                    },
                    error: function(error){
                        console.error(error);
                    }
                })
            },
            error: function(erro){
                console.log(erro)
            }
        });
    }

    // envia(event){
    //     event.preventDefault();
    //     const requestInfo = {
    //         method: 'post',
    //         mode:'no-cors',            
    //         body: JSON.stringify(
    //             {
    //                 "email": this.email.value,
    //                 "password": this.password.value
    //             }
    //         ),
    //         headers:{
    //             'Accept': 'application/json',
    //             'Content-Type':'application/json',                
    //         }
    //     };

    //     fetch('https://api-fapeticao.herokuapp.com/api/login', requestInfo)
    //     .then(response => {
    //         console.log(response);
    //         if(response.ok){
    //             return response.json();                
    //         }else{
    //             throw new Error('Erro ao fazer login.');
    //         }
    //     })
    //     .then(token =>{
    //         console.log(token);
    //         //this.props.history.push('/timeline');
    //     })
    //     .catch(error =>{
    //         //this.setState({msg: error.message});
    //         console.log(requestInfo);
    //     })
    // }

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