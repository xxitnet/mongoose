var mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/blog");
mongoose.connection.on('error',function(){
    console.log('连接失败')
})
mongoose.connection.on('open',function(){
    console.log('连接成功')
})

var userSchema=new mongoose.Schema({
     _id:{type:Number},
    name:{type:String},
    age:{type:Number,default:15},
    gender:{type:Boolean,default:true},
    time:{type:Date,default:new Date()}
},{collection:"user"});

var UserModel =mongoose.connection.model('user',userSchema);

/*var userEntity = new userModel({
    _id:2,
    name:"星星"
})
userEntity.gender=true;
var promise=userEntity.save(function(err){
    console.log(err)
})*/
/*UserModel.create({
    _id:7,
    name:'abc',
    password:'123456'
},function(err,doc){
    if(!err)console.log(doc)
})*/


// UserModel.update({name:'abc2'},{$set:{age:18}},{multi:false,upsert:false}, function (err,result){
// if(!err) console.log(result)
//     else console.log(err)
// } )



// UserModel.find({name:'abc'},{},{count},function(err,docs){
//  console.log(docs)
//  })


// UserModel.remove({_id:8,name:'jim'},function(err,result){
//     console.log(result.result.n)
// })


// UserModel.findById(6,{},function(err,docs){
//  console.log(docs)
//  })

// UserModel.find({name:'abc'}).count().exec(function(err,docs){
// console.log(docs)
// })



// UserModel.find({$or:[{age:{$lt:18}},{age:{$gt:60}}]},function(err,docs){
// console.log(docs)
// })

// UserModel.count({age:28},function(err,count){
// console.log(count)
// })


// UserModel.distinct('age',function(err,count){
// console.log(count)
// })


// UserModel.where('age').lte(18).exec(function(){
//     console.log(arguments)
// })

//var query1= UserModel.find({age:{$gte:18,$lte:60}})
//  UserModel.where('age').gte(18).lte(70).sort({'age':-1}).exec(function(err,docs){
// console.log(docs)
// })

//var query1= UserModel.find({age:{$gte:18,$lte:60}})
//  UserModel.where('age').gte(38).or({age:{$lte:70}}).exec(function(err,docs){
// console.log(docs)
// })



// UserModel.find({},{},{limit:2},function(err,docs){
// console.log(docs)
// })

// UserModel.find({}).limit(2).exec(function(err,docs){
// console.log(docs)
// })


// UserModel.find({},{},{sort:{age:-1}},function(err,docs){
// console.log(docs)
// })

// UserModel.find({}).sort({age:-1}).exec(function(err,docs){
// console.log(docs)
// })


// UserModel.find({$where:'this.age==18'},function(err,docs){
// console.log(docs)
// })


// UserModel.$where("this.age==18").exec(function(err,docs){
// console.log(docs)
// })


// UserModel.where('age').equals(18).exec(function(err,docs){
// console.log(docs)
// })

