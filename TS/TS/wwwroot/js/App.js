(function () {
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

    var billboards = viewer.scene.primitives.add(new Cesium.BillboardCollection());
    billboards.add({
        position: new Cesium.Cartesian3.fromDegrees(-71.089621, 42.335433, 0),
        image: '../src/cesium/assets/textures/maki/square-stroked.png',
        color: Cesium.Color.BLUE,
        scale: 0.2
    });
    billboards.add({
        position: new Cesium.Cartesian3.fromDegrees(121.54847, 31.175974, 0),
        image: '../src/cesium/assets/textures/maki/square-stroked.png',
        color: Cesium.Color.RED,
        scale: 0.2
    });

    //var pinBuilder = new Cesium.PinBuilder();

    //var url = Cesium.buildModuleUrl('../src/Cesium/Assets/Textures/maki/square-stroked.png');
    //var groceryPin = Cesium.when(pinBuilder.fromUrl(url, Cesium.Color.GREEN, 48), function (canvas) {
    //    return viewer.entities.add({
    //        name: 'Grocery store',
    //        position: Cesium.Cartesian3.fromDegrees(-71.089621, 42.335433, 100),
    //        billboard: {
    //            image: canvas.toDataURL(),
    //            verticalOrigin: Cesium.VerticalOrigin.BOTTOM
    //        }
    //    });
    //});
}());