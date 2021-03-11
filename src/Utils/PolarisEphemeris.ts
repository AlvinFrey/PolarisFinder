import { StarPositions } from "./StarPositions";
import { DateUtils } from "./DateUtils";
import { Location } from "../Location";
import {Formatting} from "./Formatting";

export class PolarisEphemeris {

    public static corrected_ra: number;
    public static corrected_dec: number;

    public static precession_correction(utc_now: {year: number, month: number, date: number, hours: number, minutes: number, seconds: number}) {

        const julian_day1 = DateUtils.datetime_to_jd(utc_now);

        /* Convert to radians for use here */

        let ra = StarPositions.Polaris.RightAscension;
        let dec = StarPositions.Polaris.Declination;

        if(Location.latitude < 0){

            ra = StarPositions.SigmaOctantis.RightAscension;
            dec = StarPositions.SigmaOctantis.Declination;

        }

        let ra_in = ra*Math.PI/12.;
        let dec_in = dec*Math.PI/180.;

        if(Location.latitude < 0){

            this.corrected_ra = ra + (3.075 + 1.336 * Math.sin(ra * 15) * 57.08839) * (utc_now.year - 2000) / 3600;
            this.corrected_dec = dec + 20.04 * Math.cos(dec * 15) * (utc_now.year - 2000) / 3600;

        }else {

            /* Find zeta, z, and theta at this moment */

            /* JD for the fixed epoch */

            let jdfixed = (2000 - 2000.0)*365.25+2451545.0;

            /* Julian centuries for the fixed epoch from a base epoch 2000.0 */

            let T = (jdfixed - 2451545.0) / 36525.0;

            /* Julian centuries for the epoch of date from the fixed epoch */

            let t = (julian_day1 - jdfixed) / 36525.0;

            /* Evaluate the constants in arc seconds */

            let zeta=(2306.2181 + 1.39656*T - 0.000139*T*T)*t +
                (0.30188 - 0.000344*T)*t*t +
                (0.017998)*t*t*t;

            let  z=(2306.2181 + 1.39656*T - 0.000139*T*T)*t +
                (1.09468 + 0.000066*T)*t*t +
                (0.018203)*t*t*t;

            let theta=(2004.3109 - 0.85330*T - 0.000217*T*T)*t +
                (-0.42665 - 0.000217*T)*t*t +
                (-0.041833)*t*t*t;

            /* Convert to radians */

            zeta = zeta * Math.PI / (180.*3600.);
            z = z *  Math.PI / (180.*3600.);
            theta = theta * Math.PI / (180.*3600.);

            /* Calculate the precession */

            let a = Math.sin(ra_in + zeta)*Math.cos(dec_in);
            let  b = Math.cos(ra_in + zeta)*Math.cos(theta)*Math.cos(dec_in) -
                Math.sin(theta)*Math.sin(dec_in);
            let c = Math.cos(ra_in + zeta)*Math.sin(theta)*Math.cos(dec_in) +
                Math.cos(theta)*Math.sin(dec_in);

            if (c > 0.9)
            {
                this.corrected_dec = Math.acos(Math.sqrt(a*a+b*b));
            }
            else if (c < -0.9)
            {
                this.corrected_dec = -Math.acos(Math.sqrt(a*a+b*b));
            }
            else
            {
                this.corrected_dec = Math.asin(c);
            }

            this.corrected_ra = Math.atan2(a,b) + z;

            /* Convert back to hours and degrees */

            this.corrected_ra = this.corrected_ra*12./Math.PI;

            this.corrected_dec = this.corrected_dec*180./Math.PI;

            /* Check for range and adjust to -90 -> +90 and 0 -> 24 and if needed */

            if (this.corrected_dec > 90. )
            {
                this.corrected_dec = 180. - this.corrected_dec;
                this.corrected_ra = this.corrected_ra + 12.;
            }
            if (this.corrected_dec < -90. )
            {
                this.corrected_dec = -180. - this.corrected_dec;
                this.corrected_ra = this.corrected_ra + 12.;
            }

            this.corrected_ra = Formatting.map24(this.corrected_ra);

        }

    }

    public static get_polaris_ha(lst: number) {

        let ha = (lst - this.corrected_ra);

        if(Location.latitude < 0){
            if(ha < 0){
                ha = Math.abs(ha);
            }else{
                ha = -ha;
            }
        }

        return ha;

    }

    public static ha_to_degrees(ha: number) {

        return (ha * 360) / 24;

    }

}
