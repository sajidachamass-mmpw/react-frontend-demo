import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';
import Pagination from "react-js-pagination";
import {token} from "../../global";

type MyProps = {
};
type MyState = {
    permissions:Array<any>;
    activePage:any;
    count:any;
};

class index extends  React.Component<MyProps, MyState>  {
    constructor(props:MyProps) {
        super(props);
        this.state = {
            permissions: [],
            activePage: 1,
            count:0,
        }
    }
    componentDidMount() {
        this.getPermissionData();
    }
    getPermissionData(pageNumber=1){
        this.setState({activePage: pageNumber});

        const url=process.env.REACT_APP_URL+`permissions?page=${pageNumber}`;

        axios.get(url,token)
            .then((res:any) => {
                this.setState({permissions: res.data.permissions,count:res.data.count});
            })

    }

    deletePermission(id:any){

        Swal.fire({
            title: 'Are you sure you want to delete this Permission?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(process.env.REACT_APP_URL+`permissions/${id}`,token).then(res => {
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
                <div className="row">
                    <div className={"col-12 "}>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={this.state.count}
                            pageRangeDisplayed={3}
                            onChange={this.getPermissionData.bind(this)}
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