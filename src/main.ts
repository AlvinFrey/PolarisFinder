
import $ from "jquery";
import { Reticle } from "./Drawings/Reticle"
import { StarField } from "./Drawings/StarField";
import { Polaris } from "./Drawings/Polaris";
import { Canvas } from "./Canvas";
import { DateUtils } from "./Utils/DateUtils";
import { PolarisEphemeris } from "./Utils/PolarisEphemeris";
import { Location } from "./Location";
import { Gui } from "./Gui";
import { ServiceWorkerInitializer } from "./ServiceWorkerInitializer";

Canvas.container = Canvas.getCanvasElementById('canvas-container');
Canvas.ctx = Canvas.getCanvasRenderingContext2D(Canvas.container);

ServiceWorkerInitializer.registerServiceWorker();

if(Canvas.container != null && Canvas.ctx != null){

    Canvas.fixDpi();
    Canvas.clear();

    Gui.initialize();
    StarField.initialize();

    Location.getPosition();

    setInterval(function () {

        Canvas.fixDpi();

        Reticle.draw();
        StarField.draw();

        let now = new Date();

            if(Gui.manual_mode){

                now = new Date(<string>$("#input-datetime").val());

            }else{

                $("#input-datetime").val((now.toLocaleString("sv-SE") + '').replace(' ','T'));

            }

        let utc_now = DateUtils.datetime_to_utc(now);

        if(Location.latitude < 0){
            PolarisEphemeris.precession_correction(utc_now);
        }else{
            PolarisEphemeris.precession_correction(utc_now);
        }

        let lst = DateUtils.utc_to_lst(utc_now);

        let ha = PolarisEphemeris.get_polaris_ha(lst);

        Gui.updateLabels(now, utc_now, ha);

        let polaris = new Polaris(PolarisEphemeris.ha_to_degrees(ha), utc_now.year);

        polaris.draw();

    }, 100)


    window.addEventListener('resize', () => {

        Canvas.clear();

        Reticle.draw();
        StarField.initialize();
        StarField.draw();

    });

}else {

    console.log("Can't find canvas or context in HTML document")

}
