
export class Canvas {

    public static container: HTMLCanvasElement;
    public static ctx: CanvasRenderingContext2D;

    public static getCanvasElementById = (id: string): HTMLCanvasElement => {

        const canvas = document.getElementById(id);

        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error(`The element of id "${id}" is not a HTMLCanvasElement. Make sure a <canvas id="${id}""> element is present in the document.`);
        }

        return canvas;

    }

    public static getCanvasRenderingContext2D = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {

        const context = canvas.getContext('2d');

        if (context === null) {
            throw new Error('This browser does not support 2-dimensional canvas rendering contexts.');
        }

        return context;

    }

    public static fixDpi() {

        const dpi: number = window.devicePixelRatio;

        let style = {
            height() {
                return + getComputedStyle(Canvas.container).getPropertyValue('height').slice(0,-2);
            },
            width() {
                return + getComputedStyle(Canvas.container).getPropertyValue('width').slice(0,-2);
            }
        }

        Canvas.container.setAttribute('width', (style.width() * dpi).toString());
        Canvas.container.setAttribute('height', (style.height() * dpi).toString());

    }

    public static clear(){

        Canvas.ctx.clearRect(0, 0, Canvas.container.width, Canvas.container.height);

    }


}
