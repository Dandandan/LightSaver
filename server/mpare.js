Meteor.startup(function(){

// instantaneous power and gas usage for user 1
Meteor.setInterval( function(){
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
} ,1000)

//average power for user 2

Meteor.setInterval( function(){
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

p1_power=p1_power+p2_power+p3_power+p4_power+p5_power;

//console.log(p2_power)
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
} ,1000)

// instantaneous power of user 5

Meteor.setInterval( function(){
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

},1000);

//historical data of user 1

Meteor.setInterval( function(){
 var histdata = HTTP.get("https://live.mpare.net/data.json?source=539").data;
console.log(histdata)
    
       Energy.update({
  userid:  1 , historicaldata : true
     },{
  $set: {content: histdata}},
     {upsert:true});
    
} ,10000); 

});