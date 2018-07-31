
    "use strict";
    var viewer = new Cesium.Viewer('cesiumContainer');

    //var points = viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection());
    //points.add({
    //    position: new Cesium.Cartesian3.fromDegrees(-71.089621, 42.335433,0),
    //    color: Cesium.Color.YELLOW
    //});
    //points.add({
    //    position: new Cesium.Cartesian3(121.54847,31.175974,0),
    //    color: Cesium.Color.CYAN
    //});

    //var billboards = viewer.scene.primitives.add(new Cesium.BillboardCollection());
    //billboards.add({
    //    position: new Cesium.Cartesian3.fromDegrees(-71.089621, 42.335433, 0),
    //    image: '../src/cesium/assets/textures/maki/square-stroked.png',
    //    color: Cesium.Color.BLUE,
    //    scale: 0.2
    //});
    //billboards.add({
    //    position: new Cesium.Cartesian3.fromDegrees(121.54847, 31.175974, 0),
    //    image: '../src/cesium/assets/textures/maki/square-stroked.png',
    //    color: Cesium.Color.RED,
    //    scale: 0.2
    //});

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
