
export class StarField {

    private static stars: { brightness: number; x: number; y: number }[];

    public static initialize(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement) {

        // Make the background.
        ctx.fillStyle = "#222";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.stars = this.generate_stars(canvas);

    }

    public static draw(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement, random=false) {

        if(random){

            this.stars.forEach(star => {
                this.draw_star_pixel(ctx, star.x, star.y, Math.random());
            });

        }
        else{

            this.stars.forEach(star => {
                this.draw_star_pixel(ctx, star.x, star.y, star.brightness);
            });

        }

    }

    private static generate_stars(canvas:HTMLCanvasElement) {

        let stars = [];
        for (let i = 0; i < 1000; i++) {
            stars[i] = {
                x: this.generate_random_with_max(canvas.width),
                y: this.generate_random_with_max(canvas.height),
                brightness: Math.random()
            };
        }

        return stars;

    }

    private static draw_star_pixel(ctx:CanvasRenderingContext2D, x: number, y: number, brightness: number) {

        const intensity = brightness * 255;
        const rgb = "rgb(" + intensity + "," + intensity + "," + intensity + ")";

        ctx.fillStyle = rgb;
        ctx.fillRect(x, y, 1, 1);

    }

    private static generate_random_with_max(max: number) {
        return Math.floor(Math.random() * max) + 1;
    }

}
