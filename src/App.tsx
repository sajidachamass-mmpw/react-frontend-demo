import React from 'react';
import {Switch, Route} from "react-router-dom";
import './App.css';

import ListUsers from './Components/Users/index';
import CreateUser from './Components/Users/create';
import EditUser from './Components/Users/edit';

import ListRoles from './Components/Roles/index';
import CreateRole from './Components/Roles/create';
import EditRole from './Components/Roles/edit';

import ListPermissions from './Components/Permissions/index';
import CreatePermission from './Components/Permissions/create';
import EditPermission from './Components/Permissions/edit';

import PrivateRoute from "./Components/Auth/PrivateRoute";
import Login        from     "./Components/Auth/Login";


function App() {

  return (
      <div className="App">

        <Switch>
            <Route exact={true}
                path="/"
                component={PrivateRoute}
            />
            <Route   exact={true} path="/login" component={Login} />


            <Route  exact={true} path="/users" component={ListUsers}/>
            <Route  exact={true} path="/user/create" component={CreateUser}/>
            <Route  exact={true} path="/user/edit/:id"  component={EditUser} />

            <Route  exact={true} path="/roles" component={ListRoles}/>
            <Route  exact={true} path="/role/create" component={CreateRole}/>
            <Route  exact={true} path="/role/edit/:id"  component={EditRole} />

            <Route  exact={true} path="/permissions" component={ListPermissions}/>
            <Route  exact={true} path="/permission/create" component={CreatePermission}/>
            <Route  exact={true} path="/permission/edit/:id"  component={EditPermission} />

        </Switch>
      </div>
  );
}
export default App;


