import React, { useEffect, useState } from 'react';
import { getReservations } from '../actions/actions'
import Card from '../Components/Shared/Card/Card';
import moment from 'moment'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Chip } from 'primereact/chip';
 const ReservationsScreen = () => {
  const [loadedReservations, setReservations] = useState();
  
 useEffect(() => {
 const retrieveUsers = async () => {
   await getReservations().then(res => {
   setReservations(res.data.reservation)
   console.log(res.data.reservation)
    });
  }
  retrieveUsers();
 }, []) 
  return (
    <React.Fragment>
      { loadedReservations && <ReservationsList items={loadedReservations} />}
    </React.Fragment>
  );
};
export default ReservationsScreen;
const ReservationsList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No reservations found.</h2>
        </Card>
      </div>
    );
  }
  const priceBodyTemplate = (rowData) => {
   var todayDate = moment().format('YYYY-MM-DD'); 
   var reservationDate = rowData.reservationDate.slice(0, rowData.reservationDate.indexOf("T"));
   if(reservationDate < todayDate){
     return   <Chip label="Expired" style={{backgroundColor:"red",color:"white",fontWeight:"bold"}} className="p-mr-2 p-mb-2 custom-chip" />
   }
   return <Chip label="Pending" style={{backgroundColor:"green",color:"white",fontWeight:"bold"}} className="p-mr-2 p-mb-2 custom-chip" />
}
  return (
             <DataTable value={props.items} paginator rows={10} >
            <Column field="marketName" sortable filter filterPlaceholder="Search by Restaurant" header="Restaurant"></Column>
            <Column field="reservedBy" sortable filter filterPlaceholder="reserved By" header="Reserved Name"></Column>
            <Column field="reservationDate" sortable  header="Reservation Date"></Column>
            <Column field="numberOfPeople" sortable filter filterPlaceholder="Number Of Seats" header="Number of seats"></Column>
            <Column  sortable  header="Status" body={priceBodyTemplate}></Column>
        </DataTable>
  );
};
