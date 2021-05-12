import React, { useEffect, useState } from 'react';
import { getUsers } from '../actions/actions'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../Styles/users.css';
import Card from '../Components/Shared/Card/Card';
import { InputText } from 'primereact/inputtext';
 const UsersScreen = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  
 useEffect(() => {
 const retrieveUsers = async () => {
   await getUsers().then(res => {
      setLoadedUsers(res.data.users);
      console.log(res.data.users)
    });
  }
  retrieveUsers();
 }, []) 
  return (
    <React.Fragment>
      { loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};
export default UsersScreen;
const UsersList = props => {
  const [globalFilter, setGlobalFilter] = useState(null);
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }
  let header = (
    <div style={{'textAlign':'left'}}>
        <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" size="50"/>
    </div>
);
  return (
    <ul className="users-list">
         <DataTable value={props.items} paginator rows={10} header={header} globalFilter={globalFilter}>
            <Column field="name" sortable filter filterPlaceholder="Search by name" header="Name"></Column>
            <Column field="email" sortable filter filterPlaceholder="Search by address" header="Email"></Column>
        </DataTable>
    </ul>
  );
};
