import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';
import Pagination from 'react-js-pagination';
import {token} from "../../global";


type MyProps = {
    // using `interface` is also ok
    message: string;
};
type MyState = {
    users:Array<any>;
    activePage:any;
    count:any;
};

class index extends React.Component<MyProps, MyState> {
    state: MyState = {
        // optional second annotation for better type inference
        users: [],
        activePage: 1,
        count:0,
    };
    componentDidMount() {
        this.getUserData();
    }
    deleteUser(id:any){
        Swal.fire({
            title: 'Are you sure you want to delete this user?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(process.env.REACT_APP_URL+`users/${id}`,token).then((res:any)=> {
                    window.location.reload();
                })
            } else if (result.isDenied) {
                Swal.fire(' Cancelled', '', 'error')
            }
        });

    }

    getUserData(pageNumber=1){

        this.setState({activePage: pageNumber});
        const url=process.env.REACT_APP_URL+`users?page=${pageNumber}`;

        axios.get(url,token)
            .then((res:any) => {
                this.setState({users: res.data.users,count:res.data.count});
            })

    }
    render() {
        let userList=this;

        const renderItems = this.state.users.map(function(user, i) {
            const userRoles = user.roles.join("- ");
            return (
                <tr   key={i}>
                    <td >{user.name}</td>
                    <td >{user.email}</td>
                    <td >{userRoles}</td>
                    <td >
                        <Link to={`/user/edit/${user.id}`} >
                            <i className="fa fa-edit" > </i>
                        </Link>
                        <i className="fa fa-trash" style={{color: "red","marginLeft":"10px"}} onClick={()=>userList.deleteUser(user.id)}> </i>
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
                <div className="row">
                    <div className={"col-12 "}>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={this.state.count}
                            pageRangeDisplayed={3}
                            onChange={this.getUserData.bind(this)}
                            itemClass="page-item"
                            linkClass="page-link"
                            innerClass="pagination page"
                        />
                    </div>
                </div>
            </div>
        );
    }

}
export default index;