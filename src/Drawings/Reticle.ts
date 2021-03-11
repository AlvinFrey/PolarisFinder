import {Canvas} from "../Canvas";

export class Reticle {

    public static draw(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement){

        this.draw_lines(ctx, canvas);
        this.draw_circles(ctx, canvas);
        this.draw_graduations(ctx, canvas);
        this.draw_labels(ctx, canvas);

    }

    private static draw_lines(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement) {

        // Vertical reticle lines

        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo((canvas.width/2), (canvas.height/2));
        ctx.lineTo((canvas.width/2), -canvas.height/2);
        ctx.lineTo((canvas.width/2), canvas.height);
        ctx.stroke();

        // Horizontal reticle lines

        ctx.beginPath();
        ctx.moveTo((canvas.width/2), (canvas.height/2));
        ctx.lineTo((canvas.width*0.06), (canvas.height/2));
        ctx.moveTo((canvas.width/2), (canvas.height/2));
        ctx.lineTo(canvas.width - (canvas.width*0.06), (canvas.height/2));
        ctx.stroke();

    }

    private static draw_circles(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement) {

        const min = Math.min(canvas.height, canvas.width);

        // Make the reticle circles. (nothern)
        ctx.beginPath();
        ctx.arc((canvas.width/2), (canvas.height/2),(min*0.23), 0, 2 * Math.PI);
        ctx.arc((canvas.width/2), (canvas.height/2),(min*0.27), 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([5, 3]);
        ctx.beginPath()
        ctx.arc((canvas.width/2), (canvas.height/2),(min*0.25), 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);

        // Make the reticle circles. (southern)
        ctx.strokeStyle = "red";
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.arc((canvas.width/2), (canvas.height/2),(min*0.38), 0, 2 * Math.PI);
        ctx.arc((canvas.width/2), (canvas.height/2),(min*0.40), 0, 2 * Math.PI);
        ctx.arc((canvas.width/2), (canvas.height/2),(min*0.42), 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);

        // Center circle
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.arc((canvas.width/2), (canvas.height/2),(min*0.01), 0, 2 * Math.PI);
        ctx.stroke();

    }

    private static draw_labels(ctx: CanvasRenderingContext2D, canvas:HTMLCanvasElement) {

        // Reticle hour labels
        ctx.beginPath();
        ctx.font = (canvas.width) * 0.015 + "px Arial";
        ctx.fillStyle="red";
        ctx.textAlign = 'center';
        ctx.fillText('0', (canvas.width/2), (canvas.height*0.98)); // 0

        ctx.beginPath();
        ctx.font = (canvas.width) * 0.015 + "px Arial";
        ctx.textBaseline = 'middle';
        ctx.fillText('6', (canvas.width*0.95), (canvas.height/2)); // 6

        ctx.beginPath();
        ctx.font = (canvas.width) * 0.015 + "px Arial";
        ctx.textAlign = 'center';
        ctx.fillText('12', (canvas.width/2), (canvas.height)*0.04); // 12

        ctx.beginPath();
        ctx.font = (canvas.width) * 0.015 + "px Arial";
        ctx.textBaseline = 'middle';
        ctx.fillText('18', (canvas.width)*0.04, (canvas.height/2)); // 18

    }

    private static draw_graduations(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement) {

        const min = Math.min(canvas.height, canvas.width);

        // Graduations inner (northern)
        let graduations = 360;

        ctx.beginPath();
        ctx.moveTo((canvas.width/2), (canvas.height/2));
        for (let i = 0; i < graduations; i++) {
            ctx.strokeStyle = "red";
            ctx.beginPath();
            let x1 = (canvas.width/2);
            let y1 = (canvas.height/2);
            let r =  (min*0.25);
            let theta = (i * Math.PI / 180)+1.5708;
            ctx.moveTo(x1 - (min*0.21) * Math.cos(theta), y1 +  (min*0.21) * Math.sin(theta));
            if (i%9===0) {
                ctx.moveTo(x1 - (min*0.18) * Math.cos(theta), y1 +  (min*0.18) * Math.sin(theta));
                ctx.lineTo(x1 - (min*0.23) * Math.cos(theta), y1 +  (min*0.23) * Math.sin(theta));
            }
            else if (i%3===0) {
                ctx.moveTo(x1 - (min*0.20) * Math.cos(theta), y1 +  (min*0.20) * Math.sin(theta));
                ctx.lineTo(x1 - (min*0.23) * Math.cos(theta), y1 + (min*0.23) * Math.sin(theta));
            }
            else{
                ctx.lineTo(x1 - (min*0.23) * Math.cos(theta), y1 + (min*0.23) * Math.sin(theta));
            }
            ctx.stroke();
            i+=4;
        }

        // Graduations outer (northern)

        ctx.beginPath();
        ctx.moveTo((canvas.width/2), (canvas.height/2));
        for (let i = 0; i < graduations; i++) {
            ctx.strokeStyle = "red";
            ctx.beginPath();
            let x1 = (canvas.width/2);
            let y1 = (canvas.height/2);
            let r =  (min*0.25);
            let theta = (i * Math.PI / 180)+1.5708;
            ctx.moveTo(x1 - (min*0.29) * Math.cos(theta), y1 +  (min*0.29) * Math.sin(theta));
            if (i%9===0) {
                ctx.moveTo(x1 - (min*0.27) * Math.cos(theta), y1 +  (min*0.27) * Math.sin(theta));
                ctx.lineTo(x1 - (min*0.32) * Math.cos(theta), y1 + (min*0.32) * Math.sin(theta));
            }
            else if (i%3===0) {
                ctx.moveTo(x1 - (min*0.27) * Math.cos(theta), y1 +  (min*0.27) * Math.sin(theta));
                ctx.lineTo(x1 - (min*0.30) * Math.cos(theta), y1 +  (min*0.30) * Math.sin(theta));
            }
            else{
                ctx.lineTo(x1 - (min*0.27) * Math.cos(theta), y1 + (min*0.27) * Math.sin(theta));
            }
            ctx.stroke();
            i+=4;
        }

        // Graduations inner (southern)

        ctx.beginPath();
        ctx.moveTo((canvas.width/2), (canvas.height/2));
        for (let i = 0; i < graduations; i++) {
            ctx.strokeStyle = "red";
            ctx.beginPath();
            let x1 = (canvas.width/2);
            let y1 = (canvas.height/2);
            let r =  (min*0.38);
            let theta = (i * Math.PI / 180)+1.5708;
            ctx.moveTo(x1 - (min*0.36) * Math.cos(theta), y1 +  (min*0.36) * Math.sin(theta));
            if (i%9===0) {
                ctx.moveTo(x1 - (min*0.34) * Math.cos(theta), y1 +  (min*0.34) * Math.sin(theta));
                ctx.lineTo(x1 - r * Math.cos(theta), y1 +  r * Math.sin(theta));
            }
            else if (i%3===0) {
                ctx.moveTo(x1 - (min*0.35) * Math.cos(theta), y1 +  (min*0.35) * Math.sin(theta));
                ctx.lineTo(x1 - r * Math.cos(theta), y1 + r * Math.sin(theta));
            }
            else{
                ctx.lineTo(x1 - (min*0.38) * Math.cos(theta), y1 + (min*0.38) * Math.sin(theta));
            }
            ctx.stroke();
            i+=4;
        }

        // Graduations outer (southern)

        ctx.beginPath();
        ctx.moveTo((canvas.width/2), (canvas.height/2));
        for (let i = 0; i < graduations; i++) {
            ctx.strokeStyle = "red";
            ctx.beginPath();
            let x1 = (canvas.width/2);
            let y1 = (canvas.height/2);
            let r =  (min*0.40);
            let theta = (i * Math.PI / 180)+1.5708;
            ctx.moveTo(x1 - (min*0.44) * Math.cos(theta), y1 +  (min*0.44) * Math.sin(theta));
            if (i%9===0) {
                ctx.moveTo(x1 - (min*0.42) * Math.cos(theta), y1 +  (min*0.42) * Math.sin(theta));
                ctx.lineTo(x1 - (min*0.47) * Math.cos(theta), y1 +  (min*0.47) * Math.sin(theta));
            }
            else if (i%3===0) {
                ctx.moveTo(x1 - (min*0.42) * Math.cos(theta), y1 +  (min*0.42) * Math.sin(theta));
                ctx.lineTo(x1 - (min*0.45) * Math.cos(theta), y1 + (min*0.45) * Math.sin(theta));
            }
            else{
                ctx.lineTo(x1 - (min*0.42) * Math.cos(theta), y1 + (min*0.42) * Math.sin(theta));
            }
            ctx.stroke();
            i+=4;
        }

    }

}
