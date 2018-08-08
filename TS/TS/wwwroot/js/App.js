
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


viewer.infoBox.frame.setAttribute('sandbox', 'allow-same-origin allow-popups allow-forms allow-scripts allow-top-navigation');
viewer.infoBox.frame.addEventListener('load', function () {

    viewer.infoBox.frame.contentDocument.body.addEventListener('click', function (e) {

        if (e.target && e.target.className === "cesium-infoBox-button-vedio") {
            console.log("vedio clicked");
            document.getElementById("video-Container").style.visibility = 'visible';
            buildConnection();
        }
    }, false);
}, false);

var addFriendPin = function (name, lon,lat, pic) {
    console.log('Add friend');
    //var porperties = new Cesium.PropertyBag();
    //porperties.addProperty('Name ', name);
    //porperties.addProperty('Event ', 'No recently event');
    //porperties.addProperty('Picture ', '../images/logo.png');
    //console.log('properties', porperties);
    
    var dscpt = '<div class="cesium-infoBox-container"><img src="' + pic +
        '" class="cesium-infoBox-img"><table class="cesium-infoBox-defaultTable cesium-infoBox-defaultTable-lighter" style="position:absolute;top:130px;left:50px;width:300px;" ><tbody><tr><th>Longitude</th><td>'
        + lon + '</td ></tr > <tr><th>Latitude</th><td>' + lat + '</td></tr><tr><td><button class="cesium-infoBox-button-vedio"><i class="fa fa-video-camera" style="color:red"></i></button></td><td><button class="cesium-infoBox-button-message"><i class="fa fa-commenting" style="color:green"></i></button></td></tr></tbody ></table></div >';
    console.log('Description', dscpt);

    var pin = viewer.entities.add({
        name: name,
        //position: Cesium.Cartesian3.fromDegrees(121.54847, 31.175974, 0),
        position: Cesium.Cartesian3.fromDegrees(lon, lat, 0),
        label: {
            text: name,
            verticalOrigin: Cesium.VerticalOrigin.TOP,
            scale: 0.8
        },
        billboard: {
            image: pinBuilder.fromMakiIconId('marker-stroked', Cesium.Color.RED, 48),
            //image: pinBuilder.fromMakiIconId('marker-stroked', Cesium.Color.RED, 48),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            scale: 1.0
        },
        description: dscpt
    });

}



var addMyPin = function (name,lon, lat, pic) {
    console.log('Add Me');
    var pin = viewer.entities.add({
        name: name,
        //position: Cesium.Cartesian3.fromDegrees(121.54847, 31.175974, 0),
        position: Cesium.Cartesian3.fromDegrees(lon, lat, 0),
        label: {
            text: name,
            verticalOrigin: Cesium.VerticalOrigin.TOP,
            scale: 0.8
        },
        billboard: {
            image: pinBuilder.fromMakiIconId('marker-stroked', Cesium.Color.GREEN, 48),
            //image: pinBuilder.fromMakiIconId('marker-stroked', Cesium.Color.RED, 48),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            scale: 1.0
        }
    });

    //viewer.infoBox.frame.addEventListener('load', function () {
        
    //    viewer.infoBox.frame.contentDocument.body.addEventListener('click', function (e) {
           
    //        if (e.target && e.target.className === "cesium-infoBox-button-vedio") {
    //            console.log("vedio clicked");
    //        }
    //    }, false);
    //}, false);

    document.getElementById("loading").style.visibility = 'hidden';
    var homeView = {
        destination: new Cesium.Cartesian3.fromDegrees(lon,lat,11000000),
        orientation: {
            heading: 0.0,
            pitch: -Cesium.Math.PI_OVER_TWO,
            roll: 0.0
        }
    }
    viewer.scene.camera.flyTo(homeView);
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