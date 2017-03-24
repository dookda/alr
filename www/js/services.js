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
    selectedLatlon:{}, 
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
    loadRainNow: function(tamcode){
        var rainNow ='http://map.nu.ac.th/alr-map/api/rain_now/'+tamcode;                    
        return $http.get(rainNow);
    },
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


.service('questService', function($http){
 return{
    selectedLocation:{}, 
    loadQuest: function(){
        var quest ='http://map.nu.ac.th/alr-map/api/question';                    
        return $http.get(quest);
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

  var questAuth1 = [{
    id: 0,
    question: 'ลักษณะการถือครองที่ดินแปลงนี้'
  },{
    id: 1,
    question: 'เป็นของตนเอง'
    },{
    id: 2,
    question: 'เช่า (จ่ายค่าเช่าในรูปตัวเงิน/อื่นๆ)'
    },{
    id: 3,
    question: 'ใช้ได้ฟรีไม่มีค่าเช่า'
  }]

  var questAuth2 = [{
    id: 0,
    question: 'ประเภทแหล่งน้ำที่ใช้ในแปลงนี้'
  },{
    id: 1,
    question: 'น้ำผิวดิน'
    },{
    id: 2,
    question: 'น้ำใต้ดิน'
  }]

  var questPro1 = [{
    id: 0,
    question: 'แปลงนี้ได้รับการส่งเสริมเรียนรู้จาก ส.ป.ก. การเป็นศูนย์เครือข่าย ศพก. ด้านใดบ้าง'
  },{
    id: 1,
    question: 'ศูนย์เรียนรู้ด้านการเกษตร'
    },{
    id: 2,
    question: 'การเพิ่มประสิทธิภาพการผลิตสินค้าต้นแบบ'
  }]

  var questPro2 = [{
    id: 0,
    question: 'แปลงนี้ทำการเกษตรยั่งยืนแบบใด'
  },{
    id: 1,
    question: 'เกษตรอินทรีย์'
    },{
    id: 2,
    question: 'เกษตรทฤษฎีใหม่'
    },{
    id: 3,
    question: 'เกษตรผสมผสาน'
    },{
    id: 4,
    question: 'เกษตรธรรมชาติ'
    },{
    id: 5,
    question: 'อื่นๆ'
  }]

  var questPro2 = [{
    id: 0,
    question: 'แปลงนี้เป็นเกษตรต้นแบบแบบใด'
  },{
    id: 1,
    question: 'เกษตรแม่นยำ'
    },{
    id: 2,
    question: 'เกษตรอัจฉริยะ'
    },{
    id: 3,
    question: 'เกษตรปราณีต'
    },{
    id: 4,
    question: 'อื่นๆ'
  }]

  var questCost = [{
    id: 0,
    question: 'ราคาซื้อขายหรือเช่าที่ดินในละแวกแปลงนี้'
  },{
    id: 1,
    question: 'ราคาขาย: ที่ดิน ส.ป.ก. (บาท/ปี)'
    },{
    id: 2,
    question: 'ราคาขาย: ที่ดินเอกสารสิทธิ์อื่นๆ (บาท/ไร่/ปี)'
    },{
    id: 3,
    question: 'ราคาเช่า: ที่ดิน ส.ป.ก. (บาท/ปี)'
    },{
    id: 4,
    question: 'ราคาเช่า: ที่ดินเอกสารสิทธิ์อื่นๆ (บาท/ไร่/ปี)'
  }]

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




