import {Location} from "../Location";

export class Polaris {

    private readonly now: number;
    private ctx:CanvasRenderingContext2D;
    private canvas:HTMLCanvasElement;
    private radius!:number;

    private readonly x1: number;
    private readonly y1: number;

    private readonly min: number;
    private readonly degrees: number;

    constructor(degrees: number, now: number, ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement) {

        this.degrees = degrees;
        this.now = now;
        this.ctx = ctx;
        this.canvas = canvas;

        this.x1 = (this.canvas.width/2);
        this.y1 = (this.canvas.height/2);

        this.min = Math.min(this.canvas.height, this.canvas.width);

    }

    public draw() {

        this.draw_line();
        this.draw_polaris_point();

    }

    private draw_line() {

        this.ctx.strokeStyle = "green";

        this.ctx.setLineDash([5, 3]);

        this.ctx.beginPath();

        this.radius = ((this.min*10)*((0.23 - ((this.now-2050)*0.0005)))) / 10;

        if(Location.latitude < 0){
            this.radius = ((this.min*10)*((0.38 - ((this.now-2050)*0.0005)))) / 10;
        }

        let theta = (this.degrees * Math.PI / 180)+1.5708;
        this.ctx.moveTo(this.x1, this.y1);
        this.ctx.lineTo(this.x1 - this.radius * Math.cos(theta), this.y1 + this.radius * Math.sin(theta));
        this.ctx.stroke();

    }

    private draw_polaris_point() {

        let pointRadius = 4;

        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;

        this.ctx.fillStyle="white";
        this.ctx.strokeStyle="#E0E0E0";
        this.ctx.shadowColor="#E0E0E0";

        let theta = (this.degrees * Math.PI / 180)+1.5708;

        this.ctx.beginPath();
        this.ctx.arc(this.x1 - this.radius * Math.cos(theta), this.y1 + this.radius * Math.sin(theta), pointRadius, 0, Math.PI*2, true);
        this.ctx.fill();
        this.ctx.stroke();

    }

}
