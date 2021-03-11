import $ from "jquery";
import { Formatting } from "./Utils/Formatting";
import { DateUtils } from "./Utils/DateUtils";
import { Location } from "./Location";

export class Gui {

    public static content_opened = false;
    public static form_opened = false;
    public static manual_mode = false;

    public static initialize() {

        $("#realtime-state").text("Enabled");

        $("#show-content-button").on("click", function (){

            if(Gui.form_opened){
                $("#edit-tab").hide();
                Gui.form_opened = false;
            }

            if(Gui.content_opened) {
                $("#content").hide();
                Gui.content_opened = false;
            }else{
                $("#content").show();
                Gui.content_opened = true;
            }

        });

        $("#show-form-button").on("click", function (){

            if(Gui.content_opened){
                $("#content").hide();
                Gui.content_opened = false;
            }

            if(Gui.form_opened) {
                $("#edit-tab").hide();
                Gui.form_opened = false;
            }else{
                $("#edit-tab").show();
                Gui.form_opened = true;
            }

        });

        $("#submit-form-button").on("click", function (){

            Gui.manual_mode = true;

            $("#realtime-state").text("Disabled");

            Location.latitude = parseFloat(<string>$("#input-latitude").val());
            Location.longitude = -(parseFloat(<string>$("#input-longitude").val()));
            Location.accuracy = 0;

        });

        $("#auto-mode-button").on("click", function (){

            Gui.manual_mode = false;

            $("#realtime-state").text("Enabled");

        });

        $("#now-button").on("click", function (){

            $("#input-datetime").val((new Date().toLocaleString("sv-SE") + '').replace(' ','T'));

        });

    }

    public static updateLabels(now: Date, utc_now: {year: number, month: number, date: number, hours: number, minutes: number, seconds: number}, ha: number) {

        $('#earth .latitude').text(Location.latitude);
        $('#earth .longitude').text(-Location.longitude);
        $('#earth .accuracy').text(Location.accuracy + " meters");

        $('#earth .date').text(now.getFullYear()+'-'+Formatting.pad(now.getMonth()+1)+'-'+Formatting.pad(now.getDate()));
        $('#earth .time').text(now.getHours()+':'+ Formatting.pad(now.getMinutes())+':'+Formatting.pad(now.getSeconds()));
        $('#earth .jday').text(DateUtils.datetime_to_jd(utc_now).toFixed(5));

        if(Location.latitude < 0){
            $('#polaris #ha-label').text("Sigma Octantis - Hour Angle : ");
            $('#polaris .ha').text(Formatting.hms(Math.abs(Math.abs(ha)-24)-24));
        }else{
            $('#polaris #ha-label').text("Polaris - Hour Angle : ");
            $('#polaris .ha').text(Formatting.hms(ha));
        }

    }

}
