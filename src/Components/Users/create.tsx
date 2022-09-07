import React from "react";
import axios from "axios";

type MyProps = {
};
type MyState = {
    roles: Array<any>;
    name: string;
    email: string;
    password: string;
    role:string;
};


class create extends React.Component<MyProps, MyState>  {

    constructor(props:MyProps) {
        super(props);

        this.state = {
            roles: [],
            name:  '',
            email: '',
            password: '',
            role:'1',
        };

        this.handleSubmit = this.handleSubmit.bind(this);

        this.name=this.name.bind(this);
        this.email=this.email.bind(this);
        this.password=this.password.bind(this);
        this.role=this.role.bind(this);
    }



    componentDidMount() {
        let user = this;

        const token = localStorage.getItem('auth') ;
        const headers = {
            Authorization: 'Bearer '+token
        }

        axios.get('http://react-laravel.com/api/roles',{headers})
            .then((res:any) => {
                const renderRoles = res.data.data.map(function (role:any,i:any) {
                    if (i === 0) {
                        user.setState({role: role.id});
                    }
                    return (
                        <option value={role.id} key={i}>{role.name}</option>
                    )
                });
                user.setState({roles: renderRoles});
            })
    }

    role(event:any) {
        this.setState({role : event.target.value})
    }
    name(event:any){
        this.setState({name : event.target.value})
    }
    email(event:any){
        this.setState({email : event.target.value})
    }
    password(event:any){
        this.setState({password : event.target.value})
    }

    handleSubmit(event:any) {
        event.preventDefault();

        const token = localStorage.getItem('auth') ;
        const headers = {
            Authorization: 'Bearer '+token
        }

        axios.post('http://react-laravel.com/api/users',{
            name:  this.state.name,
            email: this.state.email,
            password: this.state.password,
            role:this.state.role},{headers}).then((res:any) => {
            window.location.href = "/users";
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="container" style={{"marginTop": "100px"}}>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header text-left">
                                        Create New User
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group row">
                                                    <label
                                                        className="col-xl-3 col-lg-3 col-form-label text-left">Name <span>*</span>
                                                    </label>
                                                    <div className="col-9">
                                                        <input type="text" name="name" className="form-control" aria-label="Small"
                                                               aria-describedby="inputGroup-sizing-sm"
                                                               aria-placeholder="Name" onChange={this.name} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group row">
                                                    <label
                                                        className="col-xl-3 col-lg-3 col-form-label text-left">Email <span>*</span>
                                                    </label>
                                                    <div className="col-9">
                                                        <input type="text" className="form-control" aria-label="Small"
                                                               aria-describedby="inputGroup-sizing-sm" onChange={this.email}
                                                               aria-placeholder="Email"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group row">
                                                    <label
                                                        className="col-xl-3 col-lg-3 col-form-label text-left">Password <span>*</span>
                                                    </label>
                                                    <div className="col-9">
                                                        <input type="password" className="form-control"
                                                               aria-label="Small"
                                                               aria-describedby="inputGroup-sizing-sm"
                                                               aria-placeholder="Password" onChange={this.password}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-lg-3 col-form-label text-left">Roles <span>*</span></label>
                                                    <div className="col-9">
                                                        <select className="form-control" value={this.state.role} onChange={this.role}>
                                                            {this.state.roles}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 text-left">
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default create;