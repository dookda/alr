angular.module('starter.services', [])

.service('NewsService', function($http){
 return{
    selectedLocation:{}, 
    loadNews: function(tamcode){
        var rain30y ='http://202.29.52.232:8081/news/group74.xml';                    
        return $http.get(rain30y);
    }      
  }
})

.service('MapService', function($http){
  return{
    bboxService: 'da', 
    selectedLocation:{}, 
    selectedParcel:{},
    //endPointUrl: 'http://localhost/myapi/news',
    //endPointUrl: alrMap,

    loadParcel: function(long, lat){
      var alrMap ='http://map.nu.ac.th/gs-alr2/alr/ows?service=WFS&version=1.0.0';
              alrMap += '&request=getfeature';
              alrMap += '&typename=alr:alr_parcels';
              alrMap += '&cql_filter=INTERSECTS(geom,POINT('+long+'%20'+lat+'))';
              alrMap += '&outputformat=application/json';                    
      return $http.get(alrMap);
    }, 
    loadCroptype: function(){
        var alrCWR ='http://map.nu.ac.th/alr-map/api/k';                    
        return $http.get(alrCWR);
    }

  }
})

.service('ChartService', function($http){
  return{
    selectedLocation:{}, 
    selectedParcel:{},
    //endPointUrl: 'http://localhost/myapi/news',
    //endPointUrl: alrMap,

    loadRain30y: function(tamcode){
        var rain30y ='http://map.nu.ac.th/alr-map/api/rain30y/'+tamcode;                    
        return $http.get(rain30y);
    },
    loadEvap30y: function(tamcode){
        var evap30y ='http://map.nu.ac.th/alr-map/api/evap30y/'+tamcode;                    
        return $http.get(evap30y);
    },
    loadCWR: function(alrcode){
        var cwr ='http://map.nu.ac.th/alr-map/api/cwr/'+alrcode;                    
        return $http.get(cwr);
    },
    loadCWR2: function(alrcode){
        var cwr2 ='http://map.nu.ac.th/alr-map/api/cwr2/'+alrcode;                    
        return $http.get(cwr2);
    },
    loadCWR3: function(alrcode){
        var cwr3 ='http://map.nu.ac.th/alr-map/api/cwr3/'+alrcode;                    
        return $http.get(cwr3);
    }    
  }
})

.factory('QuestionService', function() {

  var q_gmp_water = [{
    id: 0,
    question: 'แหล่งน้ำที่ใช้ไม่มีความเสี่ยงต่อการปนเปื้อนของอันตรายทางเคมี ชีวภาพ'
  }, {
    id: 1,
    question: 'ถ้าแหล่งน้ำมีความเสี่ยงต่อการปนเปื้อนเกษตรกรมีมาตรการลดการปนเปื้อน'
  }, {
    id: 2,
    question: 'แหล่งน้ำที่ใช้สัมผัสกับส่วนบริโภคสด เช่น น้ำที่ใช้ล้างผลผลิต มีการจัดการ เพื่อให้เป็นน้ำสะอาด'
  }, {
    id: 3,
    question: 'มีบันทึกการวิเคราะห์น้ำ'
  }];

  var q_gmp_land = [{
    id: 0,
    question: 'พื้นที่ปลูกไม่มีความเสี่ยงต่อการปนเปื้อนของอันตรายทางเคมี ชีวภาพ'
  }, {
    id: 1,
    question: 'มีแผนผังการปลูกพืช สถานที่เก็บรักษาสารเคมี ปุ๋ย และสารที่เติมในดิน สถานที่เก็บผลผลิตและบริเวณใกล้เคียงแปลงปลูก'
  }, {
    id: 2,
    question: 'มีผลการวิเคราะห์ดิน'
  }];

  var q_gmp_chem_use = [{
    id: 0,
    question: 'เข้ารับการอบรม GAP หรือ IPM ตามกระบวนการโรงเรียนเกษตรกร'
  }, {
    id: 1,
    question: 'สำรวจศัตรูพืชก่อนตัดสินใจป้องกันกำจัดศัตรูพืช'
  }, {
    id: 2,
    question: 'มีการใช้วิธีการป้องกันกำจัดศัตรูพืชแบบผสมผสาน'
  }, {
    id: 3,
    question: 'มีการใช้สารเคมีที่ขึ้นทะเบียนถูกต้องตามกฏหมาย'
  }, {
    id: 4,
    question: 'ไม่ใช้สารเคมีต้องห้ามหรือห้ามจำหน่าย'
  }, {
    id: 5,
    question: 'อ่านฉลากก่อนใช้สารเคมี'
  }, {
    id: 6,
    question: 'มีการทำลายหรือเก็บภาชนะบรรจุสารเคมีฯ เมื่อใช้หมด'
  }, {
    id: 7,
    question: 'ใช้อุปกรณ์ป้องกันตนเองขณะฉีดพ่นสารเคมี'
  }];

  var q_gmp_chem_storage = [{
    id: 0,
    question: 'มีถสานที่เก็บวัตถุอันตรายมิดชิดป้องกันแดดและฝนได้ มีอากาศถ่ายเทสะดวก'
  }, {
    id: 1,
    question: 'มีสถานที่เก็บวัตถุอันตรายห่างจากแหล่งน้ำ หรือน้ำท่วมถึงได้'
  }, {
    id: 2,
    question: 'มีป้ายแสดงวัตถุอันตรายแยกเป็นหมวดหมู่ ไม่ปะปนกับปุ๋ย สารควบคุมการเจริญเติบโต/อาหารเสริม'
  }, {
    id: 3,
    question: 'เก็บวัตถุอันตรายแยกจากคลอรีน ปุ๋ยแอมโมเนีย โปแทสเซียมไนเตรด โซเดียมไนเตรด'
  }, {
    id: 4,
    question: 'มีการจัดเก็บภาชนะบรรจุวัตถุอันตรายที่ใช้หมดแล้วในสถานที่จัดเก็บหรือภาชนะบรรจุเขียนป้ายบอกชัดเจน หรือนำไปทำลาย/ฝังห่างจากแหล่งน้ำและฝังลึกพอสมควร'
  }];


  var q_gmp_record = [{
    id: 0,
    question: 'เกษตรกรมีการบันทึกข้อมูลในสมุดบันทึกข้อมูลประจำแปลง'
  }, {
    id: 1,
    question: 'เกษตรกรมีการเก็บเอกสารแหล่งที่ซื้อปัจจัยการผลิต'
  }, {
    id: 2,
    question: 'เกษตรกรมีการเก็บเอกสารผลการวิเคราะห์ดิน'
  }, {
    id: 3,
    question: 'เกษตรกรมีการเก็บเอกสารผลการวิเคราะห์น้ำ'
  }];

  var q_gmp_justify = [{
    id: 0,
    question: 'เกษตรกรสามารถอธิบายการจัดการขบวนการผลิตให้ได้คุณภาพตามคำแนะนำรายพืช เช่น การจัดการดิน การจัดการปัจจัยการผลิต การให้น้ำ การจัดการศัตรูพช การเก็บเกี่หยว'
  }];

  var q_gmp_harvest = [{
    id: 0,
    question: 'เว้นระยะเวลาเก็บเกี่ยวให้อยู่ในระยะปลอดภัยจากการตกค้างของสารเคมี ที่เป็นพิษต่อผู้บริโภค'
  }, {
    id: 1,
    question: 'มีเครื่องมือเก็บเกี่ยวเฉพาะและเหมาะสม และเก็บรักษาเครื่องมือเก็บเกี่ยวในที่แห้งและสะอาด'
  }, {
    id: 2,
    question: 'บรรจุภัณฑท์ไว้บรรจุผลผลิตมีความสะอาด แยกจากปุ๋ยและสารเคมี'
  }, {
    id: 3,
    question: 'ส่วนพักผลผลิต มีวัสดุรองพื้นป้องกันการปนเปื้อนจุลินทรีย์ได้ และอยู่ห่าง จากที่เก็บวัสดุการเกษตร, สารเคมี, น้ำมัน, เชื้อเพลิง'
  }, {  
    id: 4,
    question: 'มีน้ำสะอาดในการชำระสิ่งปนเปื้อนผลผลตหลังเก็บเกี่ยว'
  }, {
    id: 5,
    question: 'มีการคัดแยกผลผลิตที่มีศัตรูพืชออกไว้ต่างหาก'
  }];

  return {
      gmpWater: function() {
        return q_gmp_water;
      },
      gmpLand: function() {
        return q_gmp_land;
      },
      gmpChem_use: function() {
        return q_gmp_chem_use;
      },
      gmpChem_stor: function() {
        return q_gmp_chem_storage;
      },
      gmpRecord: function() {
        return q_gmp_record;
      },
      gmpHarvest: function() {
        return q_gmp_harvest;
      },
      gmpJustify: function() {
        return q_gmp_justify;
      }
  };
})


.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };

})


