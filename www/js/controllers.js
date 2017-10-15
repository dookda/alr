angular.module('starter.controllers', ['chart.js', 'ngCordova', 'ui-leaflet'])

  .controller('MapCtrl', function ($scope,
    $ionicLoading,
    $ionicModal,
    $window,
    $state,
    MapService,
    PlaceService,
    $timeout,
    $http,
    $cordovaGeolocation
  ) {

    $scope.loading = function () {
      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner icon="android"></ion-spinner>'
      });
    };

    $scope.hide = function () {
      $ionicLoading.hide();
    };

    $scope.reload = function () {
      $window.location.reload();
    };

    $scope.loading();

    //update data
    $scope.updateData = function () {
      var lnk = url + '/alr-map/mobile_query_cwr_now.php';
      $http.post(lnk)
        .then(function (res) {
          $scope.hide();
          console.log(res.data);
        });
    };
    $timeout(function () {
      $scope.updateData();
    }, 550);

    //leaflet
    $scope.center = {
      lat: 16.426,
      lng: 99.760,
      zoom: 7
    };

    $scope.markers = {};

    $scope.layers = {
      baselayers: {
        googleTerrain: {
          name: 'Google Terrain',
          layerType: 'TERRAIN',
          type: 'google'
        },
        googleHybrid: {
          name: 'Google Hybrid',
          layerType: 'HYBRID',
          type: 'google'
        },
        googleRoadmap: {
          name: 'Google Streets',
          layerType: 'ROADMAP',
          type: 'google'
        }
      },
      overlays: {
        wms: {
          name: 'แปลงที่ดิน ส.ป.ก.',
          type: 'wms',
          visible: true,
          url: "http://map.nu.ac.th/gs-alr2/alr/ows?",
          layerParams: {
            layers: 'alr:alr_parcel_query',
            format: 'image/png',
            transparent: true
          }
        },
        tam: {
          name: 'ขอบเขตตำบล',
          type: 'wms',
          visible: true,
          url: "http://map.nu.ac.th/gs-alr2/alr/ows?",
          layerParams: {
            layers: 'alr:ln9p_tam',
            format: 'image/png',
            transparent: true
          }
        },
        amp: {
          name: 'ขอบเขตอำเภอ',
          type: 'wms',
          visible: true,
          url: "http://map.nu.ac.th/gs-alr2/alr/ows?",
          layerParams: {
            layers: 'alr:ln9p_amp',
            format: 'image/png',
            transparent: true
          }
        },
        prov: {
          name: 'ขอบเขตจังหวัด',
          type: 'wms',
          visible: true,
          url: "http://map.nu.ac.th/gs-alr2/alr/ows?",
          layerParams: {
            layers: 'alr:ln9p_prov',
            format: 'image/png',
            transparent: true
          }
        }
      }
    };

    // get everything
    $scope.dat = {
      prov: '',
      amp: '',
      tam: '',
      vill: ''
    };

    $scope.getProv = function () {
      PlaceService.getProv()
        .then(function (response) {
          $scope.province = response.data;
        })
    };
    $scope.getProv();

    $scope.getAmp = function () {
      PlaceService.getAmp($scope.dat.prov)
        .then(function (response) {
          $scope.amphoe = response.data;
          $scope.tambon = [];
          $scope.village = [];
        });
      $scope.findLocation("province", $scope.dat.prov, 8);
    };

    $scope.getTam = function () {
      PlaceService.getTam($scope.dat.amp)
        .then(function (response) {
          $scope.tambon = response.data;
          $scope.village = [];
        });
      $scope.findLocation("amphoe", $scope.dat.amp, 10);
    };

    $scope.getVill = function () {
      PlaceService.getVill($scope.dat.tam)
        .then(function (response) {
          $scope.village = response.data;
          console.log(response.data);
        })
      $scope.findLocation("tambon", $scope.dat.tam, 13);
    };

    $scope.getVillLocation = function () {
      $scope.findLocation("village", $scope.dat.vill, 15);
    };

    //////// find by rawang
    $scope.findRawang = function (xplang, xrawang) {
      PlaceService.getRawang(xplang, xrawang)
        .then(function (response) {
          lat = parseFloat(response.data[0].c_y);
          lng = parseFloat(response.data[0].c_x);
          $scope.loadParcel(lng, lat);
          $scope.calMarker(lng, lat);
          $scope.calCenter(lng, lat, parseInt(15));
          $scope.closeModal(2);
        })
    };

    $scope.findLocation = function (xplace, xcode, zoom) {
      PlaceService.getLocation(xplace, xcode)
        .then(function (response) {
          var lat = parseFloat(response.data[0].c_y);
          var lng = parseFloat(response.data[0].c_x);
          $scope.loadParcel(lng, lat);
          $scope.calMarker(lng, lat);
          $scope.calCenter(lng, lat, zoom);
        })
    };

    $scope.findXY = function (lng, lat) { 
      $scope.loadParcel(lng, lat);       
      $scope.calMarker(lng, lat);
      $scope.calCenter(lng, lat, parseInt(15));
      $scope.closeModal(2);
    }

    $scope.calCenter = function (lng, lat, zoom) {
      // set center 
      $scope.center.lat = lat;
      $scope.center.lng = lng;
      $scope.center.zoom = zoom;
    };

    $scope.calMarker = function (lng, lat) {
      $scope.markers = {};
      // set marker
      $scope.markers = {
        m1: {
          lat: lat,
          lng: lng,
          //message: "ตำแหน่งของคุณ",
          focus: true,
          draggable: true
        }
      }
      //console.log($scope.markers);
    };

    $scope.loadParcel = function (lng, lat) {
      //console.log(da);
      MapService.loadParcel(lng, lat)
        .success(function (data) {
          $scope.parcel = data.features[0].properties;
          $scope.alrcode = data.features[0].properties.alrcode;
          //console.log(data);

          if ($scope.alrcode != null) {
            //console.log($scope.alrcode);
            MapService.selectedParcel = data.features[0].properties;
          } else {
            console.log('wang')
          }
        })
    };

    // getCurrentLocation    
    $scope.locate = function () {
      var posOptions = {
        timeout: 10000,
        enableHighAccuracy: true
      };
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (pos) {

          $scope.calCenter(pos.coords.longitude, pos.coords.latitude, 15);
          $scope.calMarker(pos.coords.longitude, pos.coords.latitude);
          $scope.loadParcel(pos.coords.longitude, pos.coords.latitude);

          // share location & get feature data
          $scope.data = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          MapService.selectedLatlon = $scope.data;
        });
    };

    $scope.$on("leafletDirectiveMarker.dragend", function (event, args) {
      // share location & get feature data
      $scope.data = {
        lat: args.model.lat,
        lng: args.model.lng
      };
      MapService.selectedLatlon = $scope.data;
      $scope.loadParcel($scope.data.lng, $scope.data.lat);
      $scope.calCenter($scope.data.lng, $scope.data.lat, 15);
    });

    // modal
    $ionicModal.fromTemplateUrl('templates/modal.html', {
      id: 1,
      scope: $scope,
      backdropClickToClose: true,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal1 = modal;
    });

    $ionicModal.fromTemplateUrl('templates/modal-xy.html', {
      id: 2,
      scope: $scope,
      backdropClickToClose: true,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal2 = modal;
    });

    $ionicModal.fromTemplateUrl('templates/modal-rawang.html', {
      id: 3,
      scope: $scope,
      backdropClickToClose: true,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal3 = modal;
    });

    $scope.openModal = function (index) {
      if (index == 1) {
        $scope.modal1.show();
      } else if (index == 2) {
        $scope.modal2.show();
      } else {
        $scope.modal3.show()
      }
    };

    $scope.closeModal = function (index) {
      if (index == 1) {
        $scope.modal1.hide();
      } else {
        $scope.modal2.hide();
        $scope.modal3.hide();
      }
    };

    $scope.showDetail = function () {
      $timeout(function () {
        $state.go('tab.map-detail');
      }, 550);
    };

    $scope.showCWR = function () {
      $timeout(function () {
        $state.go('tab.map-cwr');
      }, 550);
    };

    $scope.showGMP = function () {
      $timeout(function () {
        $state.go('tab.map-gmp');
      }, 550);
    };

    $scope.showQuestion = function () {
      $timeout(function () {
        $state.go('tab.quest');
      }, 550);
    };

    $scope.showCWRchart = function () {
      $timeout(function () {
        $state.go('tab.map-cwrchart');
      }, 700);
    };
  })

  .controller('MapdetailCtrl', function ($scope, MapService) {
    $scope.mapData = MapService.selectedLatlon;
    $scope.pacelData = MapService.selectedParcel;
    $scope.parcel = $scope.pacelData;
  })

  .controller('CwrCtrl', function ($scope,
    MapService,
    $cordovaCamera,
    $cordovaFile,
    $cordovaFileTransfer,
    $cordovaDevice,
    $ionicPopup,
    $cordovaActionSheet
  ) {
    $scope.mapData = MapService.selectedLatlon;
    $scope.pacelData = MapService.selectedParcel;
    $scope.parcel = $scope.pacelData;

    /// add camera
    $scope.image = null;

    $scope.showAlert = function (title, msg) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: msg
      });
    };

    $scope.loadImage = function () {
      var options = {
        title: 'Select Image Source',
        buttonLabels: ['Load from Library', 'Use Camera'],
        addCancelButtonWithLabel: 'Cancel',
        androidEnableCancelButton: true,
      };
      $cordovaActionSheet.show(options).then(function (btnIndex) {
        var type = null;
        if (btnIndex === 1) {
          type = Camera.PictureSourceType.PHOTOLIBRARY;
        } else if (btnIndex === 2) {
          type = Camera.PictureSourceType.CAMERA;
        }
        if (type !== null) {
          $scope.selectPicture(type);
        }
      });
    };

    // Take image with the camera or from library and store it inside the app folder
    // Image will not be saved to users Library.
    $scope.selectPicture = function (sourceType) {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true //rotation picture
      };

      $cordovaCamera.getPicture(options).then(function (imagePath) {
          // Grab the file name of the photo in the temporary directory
          var currentName = imagePath.replace(/^.*[\\\/]/, '');
          //Create a new name for the photo
          var d = new Date(),
            n = d.getTime(),
            newFileName = n + ".jpg";
          // If you are trying to load image from the gallery on Android we need special treatment!
          if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
            window.FilePath.resolveNativePath(imagePath, function (entry) {
              window.resolveLocalFileSystemURL(entry, success, fail);

              function fail(e) {
                console.error('Error: ', e);
              }

              function success(fileEntry) {
                var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
                // Only copy because of access rights
                $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function (success) {
                  $scope.image = newFileName;
                }, function (error) {
                  $scope.showAlert('Error', error.exception);
                });
              };
            });
          } else {
            var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            // Move the file to permanent storage
            $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
              $scope.image = newFileName;
            }, function (error) {
              $scope.showAlert('Error', error.exception);
            });
          }
        },
        function (err) {
          // Not always an error, maybe cancel was pressed...
        })
    };

    // Returns the local path inside the app for an image
    $scope.pathForImage = function (image) {
      if (image === null) {
        return '';
      } else {
        return cordova.file.dataDirectory + image;
      }
    };

    $scope.uploadImage = function () {
      // Destination URL
      //var url = "http://202.29.52.232:8081/takeaphoto/upload.php";
      var lnk = url + "/alr-map/takeaphoto/upload.php?alrcode=" + $scope.pacelData.alrcode;

      // File for Upload
      var targetPath = $scope.pathForImage($scope.image);

      // File name only
      var filename = $scope.image;;

      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params: {
          'fileName': filename
        }
      };

      $cordovaFileTransfer.upload(lnk, targetPath, options).then(function (result) {
        $scope.showAlert('Success', 'Image upload finished.');
      });
    }

  })

  .controller('CwrchartCtrl', function ($scope, $stateParams, MapService, ChartService, $timeout) {
    $scope.mapData = MapService.selectedLatlon;
    $scope.pacelData = MapService.selectedParcel;
    $scope.parcel = $scope.pacelData;

    $scope.tamcode = $scope.pacelData.tam_code;

    $scope.rainNowArr = [];
    $scope.rainNowLabel = [];

    $scope.rain30Arr = [];
    $scope.rain30Label = [];

    $scope.evap30Arr = [];
    $scope.evap30Label = [];

    $scope.chart2Dat = [];
    $scope.chart2Ser = [];

    $scope.loadMeteo = function (tamcode) {
      // load rain now
      ChartService.loadRainNow(tamcode)
        .success(function (data) {
          for (var prop in data[0]) {
            for (var i = 1; i <= 52; i++) {
              var w = 'w' + i;
              if (prop == w) {
                if (Number(data[0][prop]) >= 0) {
                  $scope.rainNowArr.push((Number(data[0][prop])).toFixed(2));
                  //console.log('ok');
                } else {
                  $scope.rainNowArr.push(null);
                  //console.log('null')
                }
              }
            }
          }
          $scope.chart2Dat.push($scope.rainNowArr);
          $scope.chart2Ser.push('น้ำฝนปัจจุบัน');
        })
        .error(function (error) {
          console.error("error");
        });
      // load rain 30y
      ChartService.loadRain30y(tamcode)
        .success(function (data) {
          for (var prop in data[0]) {
            for (var i = 1; i <= 52; i++) {
              var w = 'w' + i;
              if (prop == w) {
                $scope.rain30Label.push(prop);

                if (Number(data[0][prop]) > 0) {
                  $scope.rain30Arr.push((Number(data[0][prop])).toFixed(2));
                  //console.log('ok');
                } else {
                  $scope.rain30Arr.push(null);
                  //console.log('null')
                }
              }
            }
          }
          $scope.chart2Dat.push($scope.rain30Arr);
          $scope.chart2Ser.push('น้ำฝนเฉลี่ย30ปี');
        })
        .error(function (error) {
          console.error("error");
        });
      // load evap
      ChartService.loadEvap30y(tamcode)
        .success(function (data) {
          for (var prop in data[0]) {
            for (var i = 1; i <= 52; i++) {
              var w = 'w' + i;
              if (prop == w) {
                //$scope.evap30Label.push(prop);  
                if (Number(data[0][prop]) > 0) {
                  $scope.evap30Arr.push((Number(data[0][prop])).toFixed(2));
                  //console.log('ok');
                } else {
                  $scope.evap30Arr.push(null);
                  //console.log('null')
                }
              }
            }
          }

          $scope.chart2Dat.push($scope.evap30Arr);
          $scope.chart2Ser.push('การระเหยเฉลี่ย30ปี');
        })
        .error(function (error) {
          console.error("error");
        });
    };

    $scope.alrcode = $scope.pacelData.alrcode;
    $scope.cwrArr = [];
    $scope.cwr2Arr = [];
    $scope.cwr3Arr = [];

    $scope.loadCWR = function (alrcode) {
      ChartService.loadCWR(alrcode)
        .success(function (data) {
          for (var prop in data[0]) {
            for (var i = 1; i <= 52; i++) {

              $scope.cwrType = data[0].crop_type;

              var w = 'w' + i;
              if (prop == w) {
                //$scope.cwrLabel.push(prop);
                //$scope.cwrArr.push(Number(data[0][prop]));
                if (Number(data[0][prop]) > 0) {
                  $scope.cwrArr.push((Number(data[0][prop])).toFixed(2));
                  //console.log('ok');
                } else {
                  $scope.cwrArr.push(null);
                  //console.log('null')
                }
              }
            }
          }
          $scope.chart2Dat.push($scope.cwrArr);
          $scope.chart2Ser.push($scope.cwrType);
        })
        .error(function (error) {
          console.error("error");
        });
      // load evap

      ChartService.loadCWR2(alrcode)
        .success(function (data) {
          for (var prop in data[0]) {
            for (var i = 1; i <= 52; i++) {

              $scope.cwr2Type = data[0].crop_type;

              var w = 'w' + i;
              if (prop == w) {
                //$scope.cwrLabel.push(prop);
                //$scope.cwrArr.push(Number(data[0][prop]));
                if (Number(data[0][prop]) > 0) {
                  $scope.cwr2Arr.push((Number(data[0][prop])).toFixed(2));
                  //console.log('ok');
                } else {
                  $scope.cwr2Arr.push(null);
                  //console.log('null')
                }
              }
            }
          }
          $scope.chart2Dat.push($scope.cwr2Arr);
          $scope.chart2Ser.push($scope.cwr2Type);
        })
        .error(function (error) {
          console.error("error");
        });
      // load evap

      ChartService.loadCWR3(alrcode)
        .success(function (data) {
          for (var prop in data[0]) {
            for (var i = 1; i <= 52; i++) {

              //if(data[0].crop_type != null){
              $scope.cwr3Type = data[0].crop_type;
              //}

              var w = 'w' + i;
              if (prop == w) {
                if (Number(data[0][prop]) > 0) {
                  $scope.cwr3Arr.push((Number(data[0][prop])).toFixed(2));
                  //console.log('ok');
                } else {
                  $scope.cwr3Arr.push(null);
                  //console.log('null')
                }
              }
            }
          }
          $scope.chart2Dat.push($scope.cwr3Arr);
          $scope.chart2Ser.push($scope.cwr3Type);
        })
        .error(function (error) {
          console.error("error");
        });
      // load evap
    };

    $scope.loadCWR($scope.alrcode);
    $scope.loadMeteo($scope.tamcode);
    //console.log($scope.cwr3Type);
    // chart 1

    $scope.chart1Labels = $scope.rain30Label;
    $scope.chart1Series = ['ฝนเฉลี่ย 30ปี', 'ระเหยเฉลี่ย 30ปี'];
    $scope.chart1Data = [$scope.rain30Arr, $scope.evap30Arr];

    // chart 2

    $scope.chart2Labels = $scope.rain30Label;
    //$scope.chart2Series = ['พืชชนิดที่ 1', 'พืชชนิดที่ 2', 'พืชชนิดที่ 3', 'น้ำฝนปัจจุบัน', 'ฝนเฉลี่ย 30ปี'];
    //$scope.chart2Data = [$scope.cwrArr, $scope.cwr2Arr, $scope.cwr3Arr, $scope.rainNowArr, $scope.rain30Arr]
    $scope.chart2Data = $scope.chart2Dat;
    $scope.chart2Series = $scope.chart2Ser;

    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B', 'Series c', 'Series d'];
    $scope.data = [
      [65, 59, 80, null, null, 55, 40],
      [28, 48, 40, 19, 86, 27, 90],
      [18, 28, 50, 29, 46, 37, 40],
      [68, 88, 40, 69, 26, 37, 70]
    ];
  })

  .controller('GmpCtrl', function ($scope, $stateParams, MapService, $http) {
    $scope.mapData = MapService.selectedLocation;
    $scope.pacelData = MapService.selectedParcel;
    $scope.parcel = $scope.pacelData;


  })

  .controller('GmpQuestionCtrl', function ($scope, $stateParams, MapService, questGapService) {
    $scope.mapData = MapService.selectedLatlon;
    $scope.pacelData = MapService.selectedParcel;
    $scope.parcel = $scope.pacelData;

    $scope.loadQuest = function () {
      //console.log(da);
      questGapService.loadQuest()
        .success(function (data) {
          //$scope.parcel = data.features[0].properties;
          $scope.q = data;
        })
        .error(function (error) {
          console.error("error");
        })
    };
    $scope.loadQuest();

    $scope.data = {
      alrcode: $scope.pacelData.alrcode
    };

    $scope.sendMessage = function () {
      var lnk = url + '/alr-map/mobileInsertGap.php';
      //$http.post(link, {username : $scope.data.farmer_fname})
      $http.post(lnk, $scope.data)
        .then(function (res) {
          $scope.response = res.data;

          delete $scope.data;
        });
    };

    var oriData = angular.copy($scope.data);
    $scope.isPersonChanged = function () {
      return !angular.equals($scope.data, oriData);
    };

    $scope.progressval = 10;

  })

  .controller('questionCtrl', function ($scope, $stateParams, MapService) {
    $scope.mapData = MapService.selectedLatlon;
    $scope.pacelData = MapService.selectedParcel;
    $scope.parcel = $scope.pacelData;
  })


  .controller('questionMobileCtrl', function ($scope, $stateParams, questService, MapService, $http) {
    $scope.mapData = MapService.selectedLatlon;
    $scope.pacelData = MapService.selectedParcel;
    $scope.parcel = $scope.pacelData;

    $scope.loadQuest = function () {
      //console.log(da);
      questService.loadQuest()
        .success(function (data) {
          //$scope.parcel = data.features[0].properties;
          $scope.q = data;
        })
        .error(function (error) {
          console.error("error");
        })
    };
    $scope.loadQuest();

    $scope.loadCWR = function () {
      questService.loadCroptype()
        .success(function (data) {
          $scope.alrCWR = data;
          //console.log($scope.alrData[0].gid);            
        })
        .error(function (error) {
          console.error("error");
        })
    };
    $scope.loadCWR();

    $scope.loadMobileAns = function () {
      questService.loadMobileAns()
        .success(function (data) {
          $scope.alrMobileAns = data;
          //console.log($scope.alrData[0].gid);            
        })
        .error(function (error) {
          console.error("error");
        })
    };
    $scope.loadMobileAns($scope.pacelData.alrcode);

    $scope.data = {
      alrcode: $scope.pacelData.alrcode
    };
    $scope.sendMessage = function () {
      //var link = 'http://map.nu.ac.th/alr-map/mobileInsertOuestion.php';
      var lnk = url + '/alr-map/mobileInsertOuestion.php';
      //$http.post(link, {username : $scope.data.farmer_fname})
      $http.post(lnk, $scope.data)
        .then(function (res) {
          $scope.response = res.data;

          delete $scope.data;
        });
    };

    var oriData = angular.copy($scope.data);
    $scope.isPersonChanged = function () {
      return !angular.equals($scope.data, oriData);
    };

    $scope.progressval = 10;
  })

  .controller('MapSumCtrl', function ($scope) {
    angular.extend($scope, {
      center: {
        lat: 39,
        lng: -100,
        zoom: 4
      },
      layers: {
        baselayers: {
          xyz: {
            name: 'OpenStreetMap (XYZ)',
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            type: 'xyz'
          },
          googleTerrain: {
            name: 'Google Terrain',
            layerType: 'TERRAIN',
            type: 'google'
          },
          googleHybrid: {
            name: 'Google Hybrid',
            layerType: 'HYBRID',
            type: 'google'
          },
          googleRoadmap: {
            name: 'Google Streets',
            layerType: 'ROADMAP',
            type: 'google'
          }
        },
        overlays: {
          wms: {
            name: 'แปลงที่ดิน ส.ป.ก.',
            type: 'wms',
            visible: true,
            url: url + "/gs-alr2/alr/ows?",
            layerParams: {
              layers: 'alr:ln9p_prov',
              format: 'image/png',
              transparent: true
            }
          }
        }
      }
    });

    // $scope.changeTiles = function (tiles) {
    //   $scope.tiles = tilesDict[tiles];
    // };
  });
