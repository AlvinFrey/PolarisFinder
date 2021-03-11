import { Location } from "../Location";
import {Formatting} from "./Formatting";

export class DateUtils {

    public static datetime_to_utc(datetime: Date){

        return {
            year: datetime.getUTCFullYear(),
            month: datetime.getUTCMonth(),
            date: datetime.getUTCDate(),
            hours: datetime.getUTCHours(),
            minutes: datetime.getUTCMinutes(),
            seconds: datetime.getUTCSeconds()
        }

    }

    public static datetime_to_jd(datetime: {year: number, month: number, date: number, hours: number, minutes: number, seconds: number}){

        let date = datetime.date;
        let month = datetime.month + 1;
        let year = datetime.year;

        let ut =  datetime.hours + datetime.minutes/60 + datetime.seconds/3600;

        if (month <= 2) {
            month = month+12;
            year = year-1;
        }

        let a = Math.floor(year/100);

        return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + date - 13 - 1524.5 + ut / 24.0;

    }

    public static jd_to_gmst(jd: number){

        let t_eph;
        let ut;
        let MJD0;
        let MJD;
        MJD = jd - 2400000.5;
        MJD0 = Math.floor(MJD);
        ut = (MJD - MJD0)*24.0;
        t_eph  = (MJD0-51544.5)/36525.0;

        return  6.697374558 + 1.0027379093*ut + (8640184.812866 + (0.093104 - 0.0000062*t_eph)*t_eph)*t_eph/3600.0;

    }

    public static gmst_to_lst(gmst: number, longitude: number){

        return 24.0 * Formatting.frac((gmst + longitude / 15.0) / 24.0);

    }

    public static utc_to_lst(utc_now: {year: number, month: number, date: number, hours: number, minutes: number, seconds: number}){

        const julian_day = DateUtils.datetime_to_jd(utc_now);

        const gmst = DateUtils.jd_to_gmst(julian_day);

        return DateUtils.gmst_to_lst(gmst, Location.longitude);

    }

}
