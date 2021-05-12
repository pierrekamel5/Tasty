import React from "react";
import { Chart } from 'react-charts'
 const Charts = props => {
    
      const data = React.useMemo(
        () => [
          {
            label: 'Reservation',
            data: [[1,localStorage.getItem('MhanaSurMer') ], [2, localStorage.getItem('AlSultanIbrahim')], [3, localStorage.getItem('Mounir')]
           ]
          }
        ],
        []
      )
        return (
          <div style={{height:"300px",width:"500px"}}>
 <div>
  Reservations of every Restaurants ( Mhana Sur Mer, Al Sultan Ibrahim, Mounir)
 </div>{props && <Chart data={data} axes={props.axes} 
              primaryCursor
           secondaryCursor />}
              
          </div>
            
            )
    }
 


export default Charts;