import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';

type MyProps = {
};
type MyState = {
    permissions:Array<any>;
};

class index extends  React.Component<MyProps, MyState>  {
    constructor(props:MyProps) {
        super(props);
        this.state = {
            permissions: []
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('auth') ;
        const headers = {
            Authorization: 'Bearer '+token
        }

        axios.get('http://react-laravel.com/api/permissions',{headers})
            .then(res => {
                this.setState({permissions: res.data.data});
            })
    }

    deletePermission(id:any){
        let Vm = this;

        const token = localStorage.getItem('auth') ;
        const headers = {
            Authorization: 'Bearer '+token
        }


        Swal.fire({
            title: 'Are you sure you want to delete this Permission?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(`http://react-laravel.com/api/permissions/${id}`,{headers}).then(res => {
                    window.location.reload();
                })
            } else if (result.isDenied) {
                Swal.fire(' Cancelled', '', 'error')
            }
        });

    }
    render() {
        let permission=this;
        const renderItems = this.state.permissions.map(function(item, i) {
            return (
                <tr  key={i}>
                    <td >{item.name}</td>
                    <td >
                        <Link to={`/permission/edit/${item.id}`} >
                            <i className="fa fa-edit" > </i>
                        </Link>
                        <i className="fa fa-trash" style={{color: "red","marginLeft":"10px"}} onClick={()=>permission.deletePermission(item.id)}> </i>

                    </td>
                </tr>
            )
        });

        return(
            <div className="container">
                <div className="row">
                    <div className="col-10">
                        <h1 className="text-left"> List of Permissions</h1>
                    </div>
                    <div className="col-2">
                        <Link to='/permission/create' >
                            <i className="fa fa-plus fa-2x text-right" > </i>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered" >
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col" data-title="Name" className="text-center" >Name</th>
                            <th  scope="col" data-title="Actions" className="text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody >
                        {renderItems}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default index;