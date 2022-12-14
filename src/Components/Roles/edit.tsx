import React ,{useEffect,useState} from "react";
import axios from "axios";
import {token} from "../../global";

type MyProps = {
};
type MyState = {
    roles:Array<any>;
    name:  '',
    permissions:[],
    roleId :'',
    rolePermissions:Array<any>,
    checkedPermissions:Array<any>,
};



class edit extends React.Component<MyProps, MyState> {
    private params: any;
    constructor(props:MyProps) {
        super(props);
        this.state = {
            roles: [],
            name:  '',
            permissions:[],
            roleId :'',
            rolePermissions:[],
            checkedPermissions:[],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitRolePermission=this.handleSubmitRolePermission.bind(this);
        this.permission = this.permission.bind(this);
        this.name=this.name.bind(this);
    }

    componentDidMount() {
        this.getParams();

        axios.get(process.env.REACT_APP_URL+`permissions`,token)
            .then(res => {
                this.setState({permissions :res.data.permissionsList});
            });
    }

    getParams = () => {
        this.params = this.props;
        let permiss=this;

        this.setState({
            roleId: this.params.match.params.id
        },function() {
            axios.get(process.env.REACT_APP_URL+`roles/${this.state.roleId}/edit`,token)
                .then(res => {
                    const data=res.data.data;

                    this.setState({name : data.name});

                    const renderPermissions = permiss.state.permissions.map(function (perm:any, i:any) {

                        if(data.permissions.some((value:any) => value.id === perm.id)){

                            if( !permiss.state.checkedPermissions.includes(perm.id)){
                                permiss.setState(previousState => ({
                                    checkedPermissions: [...previousState.checkedPermissions, perm.id]
                                }));
                            }

                            return (
                                <div className="col-4 mb-5 text-left" key={i}>
                                    <label className="checkbox" >
                                        <input name="permissions" type="checkbox"  value={perm.id} defaultChecked={true} onChange={(event)=> permiss.permission(event, perm.id)}/>
                                        <span></span>{perm.name}</label>
                                </div>

                            )
                        }
                        else
                        {
                            return (
                                <div className="col-4 mb-5 text-left" key={i}>
                                    <label className="checkbox" >
                                        <input name="permissions" type="checkbox"  value={perm.id}  onChange={(event)=> permiss.permission(event, perm.id)}/>
                                        <span></span>{perm.name}</label>
                                </div>
                            )

                        }

                    });
                    permiss.setState({rolePermissions: renderPermissions});
                });
        });
        return null;

    };

    name(event:any){
        this.setState({name : event.target.value})
    }


    handleSubmit(e:any) {
        e.preventDefault();

        axios.put(process.env.REACT_APP_URL+`roles/${this.state.roleId}`,{
            name     :  this.state.name,
        },token).then(res => {
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });
    }
    permission(e:any,id:any){

        if(e.target.checked){
            this.setState(previousState => ({
                checkedPermissions: [...previousState.checkedPermissions, id]
            }), () => {
                console.log(this.state.checkedPermissions);
            });

        }
        else
        {
            const index = this.state.checkedPermissions.indexOf(id);
            if (index > -1) {
                this.state.checkedPermissions.splice(index, 1);
            }


        }
    }

    handleSubmitRolePermission(e:any){
        e.preventDefault();
        axios.put(process.env.REACT_APP_URL+`rolePermissions/${this.state.roleId}`,{
            permissions     :  this.state.checkedPermissions,
        },token).then(res => {
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });

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
                                        Edit  Role
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group row">
                                                    <label
                                                        className="col-xl-3 col-lg-3 col-form-label text-left">Name <span>*</span>
                                                    </label>
                                                    <div className="col-9">
                                                        <input type="text" name="name" className="form-control"
                                                               aria-label="Small"
                                                               aria-describedby="inputGroup-sizing-sm"
                                                               aria-placeholder="Name" onChange={this.name} value={this.state.name}/>
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

                <form onSubmit={this.handleSubmitRolePermission}>
                    <div className="container" style={{"marginTop": "100px"}}>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header text-left">
                                        Role Permissions
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group row">
                                                    {this.state.rolePermissions}
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

export default  edit;