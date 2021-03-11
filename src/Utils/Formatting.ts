
export class Formatting {

    public static hms(time:number){

        let h = Math.floor(time);
        if(h<0){
            h = 24+h;
        }
        let min = Math.floor(60.0*this.frac(time));
        let secs = Math.round(60.0*(60.0*this.frac(time)-min));
        let str;
        if (min>=10) str=h+":"+min;
        else  str=h+":0"+min;
        if (secs<10) str = str + ":0"+secs;
        else str = str + ":"+secs;
        return " " + str;

    }

    public static pad(value: number) {
        if(value < 10) {
            return '0' + value;
        } else {
            return value;
        }
    }

    public static map24(hour: number)
    {
        let n;

        if (hour < 0.0)
        {
            n = (hour / 24.0) - 1;
            return (hour - n * 24.0);
        }
        else if (hour >= 24.0)
        {
            n = (hour / 24.0);
            return (hour - n * 24.0);
        }
        else
        {
            return (hour);
        }
    }

    public static frac(X: number) {
        X = X - Math.floor(X);
        if (X<0) X = X + 1.0;
        return X;
    }

}
