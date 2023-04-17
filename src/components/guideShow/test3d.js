import React from 'react';
import "aframe";
// import { Entity, Scene } from 'aframe-react';

export  const TestComponent=()=> {
    return (
        // <Scene>
        //     <Entity
        //         geometry={{ primitive: 'sphere', radius: 5 }}
        //         material={{ src: 'images/danganshi2.jpg' }}
        //     />
        // </Scene>
        <div style={{width: "1200px", height: "800px"}}>
            <a-scene embedded>
                <a-sky src="images/danganshi2.jpg" rotation="0 -130 0"></a-sky>
            </a-scene>
        </div>

    );
}
