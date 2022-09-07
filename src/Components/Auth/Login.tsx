import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';

type MyProps = {
};
type MyState = {
    items: Array<any>;
    name: string;
    email: string;
    password: string;
    role:string;
};

class Login extends React.Component<MyProps, MyState> {

    constructor(props:MyProps) {
        super(props);

        this.state = {
            name:  '',
            email: '',
            password: '',
            items:[],
            role:'1',
        };

        this.handleSubmit = this.handleSubmit.bind(this);

        this.name=this.name.bind(this);
        this.email=this.email.bind(this);
        this.password=this.password.bind(this);
    }
    componentDidMount() {
        /*axios.get('http://react-laravel.com/api/users')
            .then((res:any) => {
                this.setState({items: res.data.data});
            })*/
    }


    email(event:any){
        this.setState({email : event.target.value})
    }
    name(event:any){
        this.setState({name : event.target.value})
    }
    password(event:any){
        this.setState({password : event.target.value})
    }
    handleSubmit(event:any) {
        event.preventDefault();
        axios.get('http://react-laravel.com/sanctum/csrf-cookie')
            .then(response => {
                axios.post('http://react-laravel.com/api/login',{
                    email: this.state.email,
                    password: this.state.password}).then((res:any) => {
                    let token=res.data.access_token;
                    console.log(token.toString());
                    if(token){
                        localStorage.setItem("auth",token.toString());
                        window.location.href = "/";
                    }

                }).catch(err => console.log(err));
            });

    }
    render() {
        let user=this;
            return (
                    <div
                        className="row d-flex justify-content-center align-items-center"
                        style={{ height: "100vh" }}
                    >
                        <div className="card mb-3" style={{ width: "600px",height:"400px" }}>
                            <div className="col-md-12">
                                <div className="card-body">
                                    <h3 className="card-title text-center text-secondary mt-3">
                                        Login Form
                                    </h3>
                                    <form onSubmit={this.handleSubmit} >
                                        <div className="mb-3 mt-4">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control shadow-none"
                                                id="exampleFormControlInput1" onChange={this.email}

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control shadow-none"
                                                id="exampleFormControlInput2" onChange={this.password} />

                                                <p className="text-danger" style={{ fontSize: 14 ,display : 'none'}}>
                                                    Error Password
                                                </p>
                                        </div>
                                        <div className="text-center mt-4 ">
                                            <button
                                                className="btn btn-outline-primary text-center shadow-none mb-3"
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            )

    }

}
export default Login;