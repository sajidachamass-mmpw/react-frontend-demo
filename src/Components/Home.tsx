import React from "react";
import {Link} from "react-router-dom";

class HomeComp extends  React.Component {
    render() {
        return(
            <div className={"container"}>
                <div className="row mb-4 mt-4">
                    <div className="col-md-12">
                        <h1>Dashboard</h1>
                    </div>
                </div>
                    <div className="row">
                        <div className="col-md-4">
                            <Link to='/users' >
                                <button type="button" className="btn mb-2 mb-md-0 btn-primary btn-block"><span>Users</span>
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <i className="fa fa-user fa-2x text-left" > </i>
                                    </div>
                                </button>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to='/roles' >
                                <button type="button" className="btn mb-2 mb-md-0 btn-secondary btn-block"><span>Roles</span>
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <i className="fa fa-cog fa-2x text-left" > </i>
                                    </div>
                                </button>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to='/permissions' >
                                <button type="button" className="btn mb-2 mb-md-0 btn-quarternary btn-block"><span>Permissions</span>
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <i className="fa fa-unlock fa-2x text-left" > </i>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
        )
    }

}
export default HomeComp;