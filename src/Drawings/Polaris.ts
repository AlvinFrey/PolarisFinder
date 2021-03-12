import { Location } from "../Location";
import { Canvas } from "../Canvas";

export class Polaris {

    private readonly now: number;
    private radius!:number;

    private readonly x1: number;
    private readonly y1: number;

    private readonly min: number;
    private readonly degrees: number;

    constructor(degrees: number, now: number) {

        this.degrees = degrees;
        this.now = now;

        this.x1 = (Canvas.container.width/2);
        this.y1 = (Canvas.container.height/2);

        this.min = Math.min(Canvas.container.height, Canvas.container.width);

    }

    public draw() {

        this.draw_line();
        this.draw_polaris_point();

    }

    private draw_line() {

        Canvas.ctx.strokeStyle = "green";

        Canvas.ctx.setLineDash([5, 3]);

        Canvas.ctx.beginPath();

        this.radius = ((this.min*10)*((0.23 - ((this.now-2050)*0.0005)))) / 10;

        if(Location.latitude < 0){
            this.radius = ((this.min*10)*((0.38 - ((this.now-2050)*0.0005)))) / 10;
        }

        let theta = (this.degrees * Math.PI / 180)+1.5708;
        Canvas.ctx.moveTo(this.x1, this.y1);
        Canvas.ctx.lineTo(this.x1 - this.radius * Math.cos(theta), this.y1 + this.radius * Math.sin(theta));
        Canvas.ctx.stroke();

    }

    private draw_polaris_point() {

        let pointRadius = 4;

        Canvas.ctx.shadowBlur = 10;
        Canvas.ctx.shadowOffsetX = 0;
        Canvas.ctx.shadowOffsetY = 0;

        Canvas.ctx.fillStyle="white";
        Canvas.ctx.strokeStyle="#E0E0E0";
        Canvas.ctx.shadowColor="#E0E0E0";

        let theta = (this.degrees * Math.PI / 180)+1.5708;

        Canvas.ctx.beginPath();
        Canvas.ctx.arc(this.x1 - this.radius * Math.cos(theta), this.y1 + this.radius * Math.sin(theta), pointRadius, 0, Math.PI*2, true);
        Canvas.ctx.fill();
        Canvas.ctx.stroke();

    }

}
