import React from 'react';
import FrontCamIcon from '@material-ui/icons/CameraFront';
import SecondCamIcon from '@material-ui/icons/CameraRear';
import ThermalCamIcon from '@material-ui/icons/BlurCircular';


export default function () {
    const settings = {
        timeoutInterval: 3000,
        system_ip: '10.42.0.1',
        port:8080,
        debug: false,
        topic: {
            color: '/usb_cam1/image_raw',
            IR: '/thermal_camera/image_color',
            scd_cam : '/usb_cam2/image_raw'
        },
        height: '240', //for now, height and width are overrided by the camera screen container so that it fills all the space allowed for each screen
        width: '320',
        quality:'40' // lowest quality : 0 ---> 100 : highest quality
       
    }

    return [
        {
            title: 'main_frontcam',
            path: `http://${settings.system_ip}:${settings.port}/stream?topic=${settings.topic.color}&quality=${settings.quality}&height=${settings.height}&width=${settings.width}`,
            icon : <FrontCamIcon/>
        },
        {
            title: 'secondary_frontcam', 
            path: `http://${settings.system_ip}:${settings.port}/stream?topic=${settings.topic.scd_cam}&quality=${settings.quality}&height=${settings.height}&width=${settings.width}`,
            icon : <SecondCamIcon/>

        },
        {
            title: 'IR', 
            path: `http://${settings.system_ip}:${settings.port}/stream?topic=${settings.topic.IR}&quality=${settings.quality}&height=${settings.height}&width=${settings.width}`,
            icon : <ThermalCamIcon/>

        },
       
    ]

}
