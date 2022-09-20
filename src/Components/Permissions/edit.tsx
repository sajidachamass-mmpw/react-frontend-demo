import React from "react";
import axios from "axios";

type MyProps = {
};
type MyState = {
    name:  '',
    permId :'',
};

class edit extends React.Component<MyProps, MyState> {
    private params: any;
    constructor(props:MyProps) {
        super(props);
        this.state = {
            name:  '',
            permId :'',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.name=this.name.bind(this);
    }
    componentDidMount() {
        this.getParams();
    }

    getParams = () => {
        this.params = this.props;
        this.setState({
            permId: this.params.match.params.id
        },function() {
            const token = localStorage.getItem('auth') ;
            const headers = {
                Authorization: 'Bearer '+token
            }

            axios.get(`http://react-demo-backend-ch.test/api/permissions/${this.state.permId}/edit`,{headers})
                .then(res => {
                    const data=res.data.data;
                    this.setState({name : data.name});
                });
        });
        return null;

    };


    name(event:any){
        this.setState({name : event.target.value})
    }


    handleSubmit(e:any) {
        e.preventDefault();
        const token = localStorage.getItem('auth') ;
        const headers = {
            Authorization: 'Bearer '+token
        }

        axios.put(`http://react-demo-backend-ch.test/api/permissions/${this.state.permId}`,{
            name     :  this.state.name,
        },{headers}).then(res => {
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
                                        Edit  Permission
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
            </div>
        )

    }
}

export default  edit;