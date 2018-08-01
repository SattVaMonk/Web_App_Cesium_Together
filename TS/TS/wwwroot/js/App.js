
    "use strict";
var viewer = new Cesium.Viewer('cesiumContainer', {
    timeline: false,
    animation: false,
    geocoder: false,
    homeButton: false,
    baseLayerPicker: false,
    navigationHelpButton: false
});

// // Create an initial camera view
var initialPosition = new Cesium.Cartesian3(8640846.100855909,3240371.9760483615,2623371.724015734);
var initialOrientation = new Cesium.HeadingPitchRoll(-0.6336820746480345,-0.7305370107966855,0.254485174668401);
var homeCameraView = {
    destination: initialPosition,
    orientation: {
        heading: initialOrientation.heading,
        pitch: initialOrientation.pitch,
        roll: initialOrientation.roll
    }
};
// Set the initial view
viewer.scene.camera.setView(homeCameraView);

    var pinBuilder = new Cesium.PinBuilder();

    //function addFriendPin(long, lat, pic) {
    //    var pin = viewer.entities.add({
    //        name: 'pin_friends',
    //        //position: Cesium.Cartesian3.fromDegrees(121.54847, 31.175974, 0),
    //        position: Cesium.Cartesian3.fromDegrees(long,lat, 0),
    //        label: {
    //            text: 'Jing',
    //            verticalOrigin: Cesium.VerticalOrigin.TOP,
    //            scale: 0.8
    //        },
    //        billboard: {
    //            image: pinBuilder.fromMakiIconId(pic, Cesium.Color.RED, 48),
    //            //image: pinBuilder.fromMakiIconId('marker-stroked', Cesium.Color.RED, 48),
    //            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    //            scale: 1.0
    //        }
    //    });
    //}
var addFriendPin = function (name, lon,lat, pic) {
    console.log('Add friend');
    var pin = viewer.entities.add({
        name: 'pin_friends',
        //position: Cesium.Cartesian3.fromDegrees(121.54847, 31.175974, 0),
        position: Cesium.Cartesian3.fromDegrees(lon, lat, 0),
        label: {
            text: name,
            verticalOrigin: Cesium.VerticalOrigin.TOP,
            scale: 0.8
        },
        billboard: {
            image: pinBuilder.fromMakiIconId(pic, Cesium.Color.RED, 48),
            //image: pinBuilder.fromMakiIconId('marker-stroked', Cesium.Color.RED, 48),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            scale: 1.0
        }
    });
}

var addMyPin = function (name,lon, lat, pic) {
    console.log('Add Me');
    var pin = viewer.entities.add({
        name: 'pin_friends',
        //position: Cesium.Cartesian3.fromDegrees(121.54847, 31.175974, 0),
        position: Cesium.Cartesian3.fromDegrees(lon, lat, 0),
        label: {
            text: name,
            verticalOrigin: Cesium.VerticalOrigin.TOP,
            scale: 0.8
        },
        billboard: {
            image: pinBuilder.fromMakiIconId(pic, Cesium.Color.GREEN, 48),
            //image: pinBuilder.fromMakiIconId('marker-stroked', Cesium.Color.RED, 48),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            scale: 1.0
        }
    });
}

var getCameraPosition = function() {
    var camera = viewer.scene.camera;
    var store = {
        position: camera.position.clone(),
        direction: camera.direction.clone(),
        up: camera.up.clone(),
        right: camera.right.clone(),
        transform: camera.transform.clone(),
        frustum: camera.frustum.clone()
    };
    console.log("Camera: ", camera);
    console.log("Store: ", store);
}
