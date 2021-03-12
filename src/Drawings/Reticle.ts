import {Canvas} from "../Canvas";

export class Reticle {

    public static draw(){

        this.draw_lines();
        this.draw_circles();
        this.draw_graduations();
        this.draw_labels();

    }

    private static draw_lines() {

        // Vertical reticle lines

        Canvas.ctx.strokeStyle = "red";

        Canvas.ctx.beginPath();
        Canvas.ctx.moveTo((Canvas.container.width/2), (Canvas.container.height/2));
        Canvas.ctx.lineTo((Canvas.container.width/2), -Canvas.container.height/2);
        Canvas.ctx.lineTo((Canvas.container.width/2), Canvas.container.height);
        Canvas.ctx.stroke();

        // Horizontal reticle lines

        Canvas.ctx.beginPath();
        Canvas.ctx.moveTo((Canvas.container.width/2), (Canvas.container.height/2));
        Canvas.ctx.lineTo((Canvas.container.width*0.06), (Canvas.container.height/2));
        Canvas.ctx.moveTo((Canvas.container.width/2), (Canvas.container.height/2));
        Canvas.ctx.lineTo(Canvas.container.width - (Canvas.container.width*0.06), (Canvas.container.height/2));
        Canvas.ctx.stroke();

    }

    private static draw_circles() {

        const min = Math.min(Canvas.container.height, Canvas.container.width);

        // Make the reticle circles. (nothern)
        Canvas.ctx.beginPath();
        Canvas.ctx.arc((Canvas.container.width/2), (Canvas.container.height/2),(min*0.23), 0, 2 * Math.PI);
        Canvas.ctx.arc((Canvas.container.width/2), (Canvas.container.height/2),(min*0.27), 0, 2 * Math.PI);
        Canvas.ctx.stroke();
        Canvas.ctx.setLineDash([5, 3]);
        Canvas.ctx.beginPath()
        Canvas.ctx.arc((Canvas.container.width/2), (Canvas.container.height/2),(min*0.25), 0, 2 * Math.PI);
        Canvas.ctx.stroke();
        Canvas.ctx.setLineDash([]);

        // Make the reticle circles. (southern)
        Canvas.ctx.strokeStyle = "red";
        Canvas.ctx.setLineDash([5, 3]);
        Canvas.ctx.beginPath();
        Canvas.ctx.arc((Canvas.container.width/2), (Canvas.container.height/2),(min*0.38), 0, 2 * Math.PI);
        Canvas.ctx.arc((Canvas.container.width/2), (Canvas.container.height/2),(min*0.40), 0, 2 * Math.PI);
        Canvas.ctx.arc((Canvas.container.width/2), (Canvas.container.height/2),(min*0.42), 0, 2 * Math.PI);
        Canvas.ctx.stroke();
        Canvas.ctx.setLineDash([]);

        // Center circle
        Canvas.ctx.strokeStyle = "red";
        Canvas.ctx.beginPath();
        Canvas.ctx.arc((Canvas.container.width/2), (Canvas.container.height/2),(min*0.01), 0, 2 * Math.PI);
        Canvas.ctx.stroke();

    }

    private static draw_labels() {

        // Reticle hour labels
        Canvas.ctx.beginPath();
        Canvas.ctx.font = (Canvas.container.width) * 0.015 + "px Arial";
        Canvas.ctx.fillStyle="red";
        Canvas.ctx.textAlign = 'center';
        Canvas.ctx.fillText('0', (Canvas.container.width/2), (Canvas.container.height*0.98)); // 0

        Canvas.ctx.beginPath();
        Canvas.ctx.font = (Canvas.container.width) * 0.015 + "px Arial";
        Canvas.ctx.textBaseline = 'middle';
        Canvas.ctx.fillText('6', (Canvas.container.width*0.95), (Canvas.container.height/2)); // 6

        Canvas.ctx.beginPath();
        Canvas.ctx.font = (Canvas.container.width) * 0.015 + "px Arial";
        Canvas.ctx.textAlign = 'center';
        Canvas.ctx.fillText('12', (Canvas.container.width/2), (Canvas.container.height)*0.04); // 12

        Canvas.ctx.beginPath();
        Canvas.ctx.font = (Canvas.container.width) * 0.015 + "px Arial";
        Canvas.ctx.textBaseline = 'middle';
        Canvas.ctx.fillText('18', (Canvas.container.width)*0.04, (Canvas.container.height/2)); // 18

    }

    private static draw_graduations() {

        const min = Math.min(Canvas.container.height, Canvas.container.width);

        // Graduations inner (northern)
        let graduations = 360;

        Canvas.ctx.beginPath();
        Canvas.ctx.moveTo((Canvas.container.width/2), (Canvas.container.height/2));
        for (let i = 0; i < graduations; i++) {
            Canvas.ctx.strokeStyle = "red";
            Canvas.ctx.beginPath();
            let x1 = (Canvas.container.width/2);
            let y1 = (Canvas.container.height/2);
            let r =  (min*0.25);
            let theta = (i * Math.PI / 180)+1.5708;
            Canvas.ctx.moveTo(x1 - (min*0.21) * Math.cos(theta), y1 +  (min*0.21) * Math.sin(theta));
            if (i%9===0) {
                Canvas.ctx.moveTo(x1 - (min*0.18) * Math.cos(theta), y1 +  (min*0.18) * Math.sin(theta));
                Canvas.ctx.lineTo(x1 - (min*0.23) * Math.cos(theta), y1 +  (min*0.23) * Math.sin(theta));
            }
            else if (i%3===0) {
                Canvas.ctx.moveTo(x1 - (min*0.20) * Math.cos(theta), y1 +  (min*0.20) * Math.sin(theta));
                Canvas.ctx.lineTo(x1 - (min*0.23) * Math.cos(theta), y1 + (min*0.23) * Math.sin(theta));
            }
            else{
                Canvas.ctx.lineTo(x1 - (min*0.23) * Math.cos(theta), y1 + (min*0.23) * Math.sin(theta));
            }
            Canvas.ctx.stroke();
            i+=4;
        }

        // Graduations outer (northern)

        Canvas.ctx.beginPath();
        Canvas.ctx.moveTo((Canvas.container.width/2), (Canvas.container.height/2));
        for (let i = 0; i < graduations; i++) {
            Canvas.ctx.strokeStyle = "red";
            Canvas.ctx.beginPath();
            let x1 = (Canvas.container.width/2);
            let y1 = (Canvas.container.height/2);
            let r =  (min*0.25);
            let theta = (i * Math.PI / 180)+1.5708;
            Canvas.ctx.moveTo(x1 - (min*0.29) * Math.cos(theta), y1 +  (min*0.29) * Math.sin(theta));
            if (i%9===0) {
                Canvas.ctx.moveTo(x1 - (min*0.27) * Math.cos(theta), y1 +  (min*0.27) * Math.sin(theta));
                Canvas.ctx.lineTo(x1 - (min*0.32) * Math.cos(theta), y1 + (min*0.32) * Math.sin(theta));
            }
            else if (i%3===0) {
                Canvas.ctx.moveTo(x1 - (min*0.27) * Math.cos(theta), y1 +  (min*0.27) * Math.sin(theta));
                Canvas.ctx.lineTo(x1 - (min*0.30) * Math.cos(theta), y1 +  (min*0.30) * Math.sin(theta));
            }
            else{
                Canvas.ctx.lineTo(x1 - (min*0.27) * Math.cos(theta), y1 + (min*0.27) * Math.sin(theta));
            }
            Canvas.ctx.stroke();
            i+=4;
        }

        // Graduations inner (southern)

        Canvas.ctx.beginPath();
        Canvas.ctx.moveTo((Canvas.container.width/2), (Canvas.container.height/2));
        for (let i = 0; i < graduations; i++) {
            Canvas.ctx.strokeStyle = "red";
            Canvas.ctx.beginPath();
            let x1 = (Canvas.container.width/2);
            let y1 = (Canvas.container.height/2);
            let r =  (min*0.38);
            let theta = (i * Math.PI / 180)+1.5708;
            Canvas.ctx.moveTo(x1 - (min*0.36) * Math.cos(theta), y1 +  (min*0.36) * Math.sin(theta));
            if (i%9===0) {
                Canvas.ctx.moveTo(x1 - (min*0.34) * Math.cos(theta), y1 +  (min*0.34) * Math.sin(theta));
                Canvas.ctx.lineTo(x1 - r * Math.cos(theta), y1 +  r * Math.sin(theta));
            }
            else if (i%3===0) {
                Canvas.ctx.moveTo(x1 - (min*0.35) * Math.cos(theta), y1 +  (min*0.35) * Math.sin(theta));
                Canvas.ctx.lineTo(x1 - r * Math.cos(theta), y1 + r * Math.sin(theta));
            }
            else{
                Canvas.ctx.lineTo(x1 - (min*0.38) * Math.cos(theta), y1 + (min*0.38) * Math.sin(theta));
            }
            Canvas.ctx.stroke();
            i+=4;
        }

        // Graduations outer (southern)

        Canvas.ctx.beginPath();
        Canvas.ctx.moveTo((Canvas.container.width/2), (Canvas.container.height/2));
        for (let i = 0; i < graduations; i++) {
            Canvas.ctx.strokeStyle = "red";
            Canvas.ctx.beginPath();
            let x1 = (Canvas.container.width/2);
            let y1 = (Canvas.container.height/2);
            let r =  (min*0.40);
            let theta = (i * Math.PI / 180)+1.5708;
            Canvas.ctx.moveTo(x1 - (min*0.44) * Math.cos(theta), y1 +  (min*0.44) * Math.sin(theta));
            if (i%9===0) {
                Canvas.ctx.moveTo(x1 - (min*0.42) * Math.cos(theta), y1 +  (min*0.42) * Math.sin(theta));
                Canvas.ctx.lineTo(x1 - (min*0.47) * Math.cos(theta), y1 +  (min*0.47) * Math.sin(theta));
            }
            else if (i%3===0) {
                Canvas.ctx.moveTo(x1 - (min*0.42) * Math.cos(theta), y1 +  (min*0.42) * Math.sin(theta));
                Canvas.ctx.lineTo(x1 - (min*0.45) * Math.cos(theta), y1 + (min*0.45) * Math.sin(theta));
            }
            else{
                Canvas.ctx.lineTo(x1 - (min*0.42) * Math.cos(theta), y1 + (min*0.42) * Math.sin(theta));
            }
            Canvas.ctx.stroke();
            i+=4;
        }

    }

}
