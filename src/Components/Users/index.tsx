import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';


type MyProps = {
};
type MyState = {
    items:Array<any>;
};

class index extends React.Component<MyProps, MyState> {

    constructor(props:MyProps) {
        super(props);

        this.state = {
            items: [],
        };
    }
    componentDidMount() {

        const token = localStorage.getItem('auth') ;
        const headers = {
            Authorization: 'Bearer '+token
        }
        axios.get('http://react-laravel.com/api/users',{headers})
            .then((res:any) => {
                this.setState({items: res.data.data});
            })
    }
    deleteUser(id:any){
        const token = localStorage.getItem('auth') ;
        const headers = {
            Authorization: 'Bearer '+token
        }

        Swal.fire({
            title: 'Are you sure you want to delete this user?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(`http://react-laravel.com/api/users/${id}`,{headers}).then((res:any)=> {
                    window.location.reload();
                })
            } else if (result.isDenied) {
                Swal.fire(' Cancelled', '', 'error')
            }
        });

    }
    render() {
        let user=this;
        const renderItems = this.state.items.map(function(item, i) {

            const userRoles = item.roles.join("- ");
            return (
                <tr  key={i}>
                    <td >{item.name}</td>
                    <td >{item.email}</td>
                    <td >{userRoles}</td>
                    <td >
                        <Link to={`/user/edit/${item.id}`} >
                            <i className="fa fa-edit" > </i>
                        </Link>
                        <i className="fa fa-trash" style={{color: "red","marginLeft":"10px"}} onClick={()=>user.deleteUser(item.id)}> </i>

                    </td>
                </tr>
            )
        });

        return(
            <div className="container">
                <div className="row">
                    <div className="col-10">
                        <h1 className="text-left"> List of Users</h1>
                    </div>
                    <div className="col-2">
                        <Link to='/user/create' >
                            <i className="fa fa-plus fa-2x text-right" > </i>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered" >
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col" data-title="Name" className="text-center" >Name</th>
                            <th  scope="col" data-title="Email" className="text-center">Email</th>
                            <th  scope="col" data-title="Role" className="text-center">Role</th>
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