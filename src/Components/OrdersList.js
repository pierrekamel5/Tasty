import React from 'react';
import Card from './Shared/Card/Card';
const OrdersList = props => {
    if (props.items.length === 0) {
      return (
        <div className="place-list center" style={{marginTop:"160px"}}>
          <Card>
            <h2  style={{padding:'25px'}}>No Orders found</h2>
          </Card>
          <div style={{paddingBottom:"650px"}}></div>
        </div>
      );
    }
    
    return (
      
      <ul >
      </ul>
    
    );
  };
  
  export default OrdersList;