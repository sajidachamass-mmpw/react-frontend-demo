import React from "react";
import axios from "axios";
import {token} from "../../global";

type MyProps = {
};
type MyState = {
    name: string;
};

class create extends React.Component<MyProps, MyState> {

    constructor(props:MyProps) {
        super(props);
        this.state = {
            name:  '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.name=this.name.bind(this);
    }


    componentDidMount() {
    }

    name(event:any){
        this.setState({name : event.target.value})
    }

    handleSubmit(event:any) {
        event.preventDefault();

        axios.post(process.env.REACT_APP_URL+`roles`,{
            name:  this.state.name
        },token).then(res => {
            window.location.href = "/roles";
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
                                        Create New Role
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