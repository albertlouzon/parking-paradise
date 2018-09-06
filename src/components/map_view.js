import React, { Component } from 'react';

class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div style={{
                height:'55vh',
                backgroundImage : 'url(../../public/img/3d_map.png)',
                backgroundPosition : 'center',
                backgroundSize : 'contain',
                backgroundRepeat : 'no-repeat'
            }}>
            </div>
         );
    }
}
 
export default MapView;