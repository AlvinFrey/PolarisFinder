import {Canvas} from "../Canvas";

export class StarField {

    private static stars: { brightness: number; x: number; y: number }[];

    public static initialize() {

        // Make the background.
        Canvas.ctx.fillStyle = "#222";
        Canvas.ctx.fillRect(0, 0,  Canvas.container.width,  Canvas.container.height);

        this.stars = this.generate_stars();

    }

    public static draw(random=false) {

        if(random){

            this.stars.forEach(star => {
                this.draw_star_pixel(star.x, star.y, Math.random());
            });

        }
        else{

            this.stars.forEach(star => {
                this.draw_star_pixel(star.x, star.y, star.brightness);
            });

        }

    }

    private static generate_stars() {

        let stars = [];
        for (let i = 0; i < 1000; i++) {
            stars[i] = {
                x: this.generate_random_with_max(Canvas.container.width),
                y: this.generate_random_with_max(Canvas.container.height),
                brightness: Math.random()
            };
        }

        return stars;

    }

    private static draw_star_pixel(x: number, y: number, brightness: number) {

        const intensity = brightness * 255;
        const rgb = "rgb(" + intensity + "," + intensity + "," + intensity + ")";

        Canvas.ctx.fillStyle = rgb;
        Canvas.ctx.fillRect(x, y, 1, 1);

    }

    private static generate_random_with_max(max: number) {
        return Math.floor(Math.random() * max) + 1;
    }

}
