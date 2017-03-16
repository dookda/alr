


   var imageMapType0 = new google.maps.ImageMapType({
     getTileUrl: function(coord, zoom) {
       return "http://map.nu.ac.th/gs-alr2/gwc/service/gmaps?layers=alr:alr_parcel&" +
        "zoom=" + zoom + "&x=" + coord.x + "&y=" + coord.y + "&format=image/png";
     },
     tileSize: new google.maps.Size(256, 256),
     isPng: true,
     opacity: 0.25
   });
 





    //var josefov = new google.maps.LatLng(49.3119, 16.67029);
    //Define OSM as base layer in addition to the default Google layers
    var imageMapType1 = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            return "http://tile.openstreetmap.org/" +
                zoom + "/" + coord.x + "/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: true,
        alt: "OpenStreetMap",
        name: "OSM",
        maxZoom: 19
    });


                     

    var imageMapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {

        var vm = this;
        NgMap.getMap().then(function(map) {
            vm.map = map;
            //var bounds = new google.maps.LatLngBounds(southWest,northEast);
            //var ne = vm.map.getBounds().getNorthEast();
            //var sw = vm.map.getBounds().getSouthWest();
            var proj = vm.map.getProjection();
            var zfactor = Math.pow(2, zoom);

            // type 1
/*            var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 256 / zfactor, coord.y * 256 / zfactor));
            var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 256 / zfactor, (coord.y + 1) * 256 / zfactor));
            var deltaX = 0.0013;
            var deltaY = 0.00058;
            $scope.bbox = (top.lng() + deltaX) + "," +(bot.lat() + deltaY) + "," +(bot.lng() + deltaX) + "," +(top.lat() + deltaY);*/

            // type 2
/*            var ul = new google.maps.Point(coord.x * 256.0 / zfactor , (coord.y + 1) * 256.0 / zfactor );
            var lr = new google.maps.Point((coord.x + 1) * 256.0 / zfactor , (coord.y) * 256.0 / zfactor );
            var ulw = proj.fromPointToLatLng(ul);
            var lrw = proj.fromPointToLatLng(lr);                                  
            $scope.bbox = ulw.lng() + "," + ulw.lat() + "," + lrw.lng() + "," + lrw.lat();*/

            
            var twidth = 256;
            var theight = 256;
     
            //latlng bounds of the 4 corners of the google tile
            //Note the coord passed in represents the top left hand (NW) corner of the tile.
            var gBl = map.getProjection().fromPointToLatLng(
              new google.maps.Point(coord.x * twidth / zfactor, (coord.y + 1) * theight / zfactor)); // bottom left / SW
            var gTr = map.getProjection().fromPointToLatLng(
              new google.maps.Point((coord.x + 1) * twidth / zfactor, coord.y * theight / zfactor)); // top right / NE
     
            // Bounding box coords for tile in WMS pre-1.3 format (x,y)
            $scope.bbox = gBl.lng() + "," + gBl.lat() + "," + gTr.lng() + "," + gTr.lat();

        });





//"&width=742"
//"&height=768"


            var url = "http://map.nu.ac.th/gs-alr2/alr/wms?service=WMS";
            url += "&request=GetMap"; //WMS operation
            url += "&SERVICE=WMS"; //WMS service
            url += "&version=1.1.0"; //WMS version  
            url += "&layers=alr:alr_parcel"; //WMS layers
            url += "&format=image/png"; //WMS format
            url += "&BGCOLOR=0xFFFFFF";
            url += "&TRANSPARENT=TRUE";
            url += "&srs=EPSG:4326"; //set WGS84 
            url += "&bbox=" + $scope.bbox; // set bounding box
            url += "&WIDTH=256"; //tile size in google
            url += "&HEIGHT=256";

            console.log($scope.bbox);
            return url;
            // return URL for the tile


        },
        tileSize: new google.maps.Size(256, 256),
        isPng: true
    });




    




    //$rootScope.imageMapType = imageMapType;








