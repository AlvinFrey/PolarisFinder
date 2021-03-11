import $ from "jquery";

export class Location {

    public static latitude: number;
    public static longitude: number;
    public static accuracy: number;

    public static getPosition() {

        navigator.geolocation.getCurrentPosition((position) => {

            Location.latitude = position.coords.latitude;
            Location.longitude = position.coords.longitude;
            Location.accuracy = position.coords.accuracy;

            $('#input-latitude').val(Location.latitude);
            $('#input-longitude').val(-Location.longitude);

        });

    }

}
