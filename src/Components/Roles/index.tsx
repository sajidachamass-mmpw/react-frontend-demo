import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';
import Pagination from "react-js-pagination";

type MyProps = {
};
type MyState = {
    roles:Array<any>;
    activePage:any;
    count:any;
};

class index extends React.Component<MyProps, MyState> {
    constructor(props:MyProps) {
        super(props);
        this.state = {
            roles: [],
            activePage: 1,
            count:0,
        }
    }
    componentDidMount() {
        this.getRoleData();
    }
    getRoleData(pageNumber=1){

        this.setState({activePage: pageNumber});
        const token = localStorage.getItem('auth') ;
        const headers = {
            Authorization: 'Bearer '+token
        }

        const url=`http://react-demo-backend-ch.test/api/roles?page=${pageNumber}`;

        axios.get(url,{headers})
            .then((res:any) => {
                this.setState({roles: res.data.roles,count:res.data.count});
            })
    }

    deleteRole(id:any){
        let Vm = this;
        const token = localStorage.getItem('auth') ;
        const headers = {
            Authorization: 'Bearer '+token
        }

        Swal.fire({
            title: 'Are you sure you want to delete this role?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(`http://react-demo-backend-ch.test/api/roles/${id}`,{headers}).then(res => {
                    window.location.reload();
                })
            } else if (result.isDenied) {
                Swal.fire(' Cancelled', '', 'error')
            }
        });

    }
    render() {
        let role=this;
        const renderItems = this.state.roles.map(function(item, i) {
            return (
                <tr  key={i}>
                    <td >{item.name}</td>
                    <td >
                        <Link to={`/role/edit/${item.id}`} >
                            <i className="fa fa-edit" > </i>
                        </Link>
                        <i className="fa fa-trash" style={{color: "red","marginLeft":"10px"}} onClick={()=>role.deleteRole(item.id)}> </i>

                    </td>
                </tr>
            )
        });

        return(
            <div className="container">
                <div className="row">
                    <div className="col-10">
                        <h1 className="text-left"> List of Roles</h1>
                    </div>
                    <div className="col-2">
                        <Link to='/role/create' >
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
                <div className="row">
                    <div className={"col-12 "}>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={this.state.count}
                            pageRangeDisplayed={3}
                            onChange={this.getRoleData.bind(this)}
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