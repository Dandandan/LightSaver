
// request new data every 10 seconds
Meteor.startup(function(){
  Meteor.setInterval(requestUser1, 10000)
  Meteor.setInterval(requestUser2, 10000)
  Meteor.setInterval(requestUser5, 10000)
  Meteor.setInterval(historyUser1, 10000)
});


// instantaneous power and gas usage for user 1
var requestUser1 = function(){

  try {
     var livedata = HTTP.get("https://live.mpare.net/live.json?user=1").data;
     var p1_power
     var P1_Gas

    _.each(livedata.livedata, function(v,i) {
        if (v.internalName == "p1_power") {
            p1_power= v.value
            return;
        }
    });

    _.each(livedata.livedata, function(v,i) {
        if (v.internalName == "P1_Gas") {
            P1_Gas= v.value
            return;
        }
    });

    // Energy.update({
    //  userid:  1
    //     },{
     // $set: {content: livedata}},
     //    {upsert:true});

        Energy.update({
      userid:  1 , internalName: "p1_power"
         },{
      $set: {content: p1_power}},
         {upsert:true});

         Energy.update({
      userid:  1 , internalName: "P1_Gas"
         },{
      $set: {content: P1_Gas}},
         {upsert:true});

  } catch(e) {
    console.log('mpare not available')
  }

} 

//average power for user 2

var requestUser2 = function(){

  try {
     var livedata = HTTP.get("https://live.mpare.net/live.json?user=2").data;
     var p1_power
     var p2_power
     var p3_power
     var p4_power
     var p5_power

    _.each(livedata.livedata, function(v,i) {
        if (v.internalName == "imm_p_1") {
            p1_power= v.value
            return;
        }
    });

    _.each(livedata.livedata, function(v,i) {
        if (v.internalName == "imm_p_2") {
            p2_power= v.value
            return;
        }
    });

    _.each(livedata.livedata, function(v,i) {
        if (v.internalName == "imm_p_3") {
            p3_power= v.value
            return;
        }
    });

    _.each(livedata.livedata, function(v,i) {
        if (v.internalName == "imm_p_4") {
            p4_power= v.value
            return;
        }
    });

    _.each(livedata.livedata, function(v,i) {
        if (v.internalName == "imm_p_5") {
            p5_power= v.value
            return;
        }
    });


    // p1_power=Float.valueOf(p1_power)+Float.valueOf(p2_power)+Float.valueOf(p3_power)+Float.valueOf(p4_power)+Float.valueOf(p5_power);
    console.log(p1_power)
    // Energy.update({
    //  userid:  2
    //     },{
    //  $set: {content: livedata}},
    //     {upsert:true});

        Energy.update({
      userid:  2 , internalName: "p1_power"
         },{
      $set: {content: p1_power}},
         {upsert:true});

  } catch(e) {
    console.log('mpare not available')
  }

}



// instantaneous power of user 5

var requestUser5 = function() {

  try {

    var livedata = HTTP.get("https://live.mpare.net/live.json?user=5").data;

    _.each(livedata.livedata, function(v,i) {
        if (v.internalName == "p1_power") {
            p1_power= v.value
            return;
        }
    });

    // Energy.update({
    //  userid:  5
    //     },{
    //  $set: {content: livedata}},
    //     {upsert:true});

     Energy.update({
       userid:  5 , internalName: "p1_power"
         },{
        $set: {content: p1_power}},
         {upsert:true});

  } catch(e) {
    console.log('mpare not available')
  }

};

//historical data of user 1

var historyUser1 = function(){
 
  try {
    var histdata = HTTP.get("https://live.mpare.net/data.json?source=539").data;

         Energy.update({
    userid:  1 , historicaldata : true
       },{
    $set: {content: histdata}},
       {upsert:true});

  } catch(e) {
    console.log('mpare not available')
  }

};




