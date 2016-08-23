# mongoose使用教程

## 一、简介
mongoose是mongodb的对象模型工具，可以在node.js中操作mongodb

## 二、安装mongoose 
```
npm install mongoose --save
```

## 三、连接mongodb数据库
```
var mongoose = require('mongoose'); //引用mongoose模块
mongoose.connect('mongodb://127.0.0.1:12701/users')  //创建默认的数据库连接，返回一个mongoose对象
//mongoose.createConnection('mongodb://127.0.0.1:12701/users') 连接数据库，和connect区别是：创建的并非一个默认的数据库连接，
//是一个Connection对象，后续的model、entity都是基于这个Connection来创建的,否则会报错
mongoose.connection.on('err',function(err){
console,.log(err);
});

mongoose.connection('open',function(){
console.log('连接成功');
});
```

## 四、Schema

Schema可以理解为传统数据的"表结构"，在mongodb中就是集合的"骨架",定义了个集合中有哪些字段

```
var userSchema = new mongoose.Schema({
name:{type:String},
password:{type:String}
regTime:{type:Date,default:new Date()},
gender:{type:Boolean,default:true}
});
```

## 五、Model
Model是由Schema生成的模型，除了有集合的骨架外，还有操作数据库的能力

```
var UserModel = mongoose.model('users',userSchema);
//users:集合的名称  userSchema:Schema骨架
```

## 六、Entity
Entity可以理解为Model的一个实体，可以操作数据库，相比较Entity，Model操作数据库范围更广

```
var userEntity = new UserModel({name:'张三',password:'123456'})
userEntity.gender=false; 
userEntity.save(function(err,doc){
if(err)return;
console.log(doc);
})
```

## 七、添加数据
添加数据有2中方式：
> 1.通过Model.cretae方式

```
//第一个参数：要添加的文档，可以是一个文档，也可以是一个文档数组
UserModel.create({
name:'lisi',
password:'123456'
},function(err,doc){
if(!err)console.log(doc)
});
```

> 2.通过Entity实例的save方法

```
var userEntity = new UserModel({name:'张三',password:'123456'})
userEntity.save(function(err,doc){})
```

## 八、删除数据

```
//第一个参数为删除条件，删除所有匹配的结果
//result是一个对象：{ result: { ok: 1, n: 1 },..}，包含了一个result字段，该字段记录了删除的结果
UserModel.remove({name:'lisi'},function(err,result){
if(!err)console.log('add success')
})
```

## 九、更新数据

```
//第一个参数：更新的条件
//第二个参数：更新后的值
//第三个参数：multi:是否更新全部匹配的条件  upsert:没有匹配条件是否插入数据
//result:返回的是一个类似{ ok: 1, nModified: 3, n: 4 }对象，通过这个对象可以知道更新了多少数据
UserModel.update({name:'abc'},{$set:{password:'abcdefg'}},{multi:true},function(err,result){
if(!err)console.log(result)
)
```

## 十、数据库查询---精确匹配

### 1. 查询所有匹配
```
//第一个参数：查询的条件,默认值是{},查询所有
//第二个参数：需要显示的字段，默认是{},显示文档的所有字段,属性为1的字段会显示，其余的不会显示,_id默认会显示，可以设置_id:0
//docs:查询到的文档数组
UserModel.find({name:'lisi'}，{},function(err,docs){
    if(!err)console.log(docs);
})
```

### 2. 查询一条数据
```
//第一个参数：查询的条件,默认值是{},查询所有
//第二个参数：需要显示的字段，默认是{},显示文档的所有字段,属性为1的字段会显示，其余的不会显示,_id默认会显示，可以设置_id:0
//doc:查询到的文档
UserModel.findOne({name:'lisi'}，{},function(err,doc){
    if(!err)console.log(doc);
})
```

### 3. 根据id查询
```
//第一个参数：查询_id,js中没有ObjectId类型，可以传递一个字符串或者数字，是一个语法糖
//第二个参数：需要显示的字段，默认是{},显示文档的所有字段,属性为1的字段会显示，其余的不会显示,_id默认会显示，可以设置_id:0
//doc:查询到的文档
UserModel.findById(6,{},function(err,doc){
    if(!err)console.log(doc);
})
```

## 十一、条件查询

### 1. $gt、$gte   相当于>、>=
```
UserModel.find({age:{$gt:18}},function(err,docs){
console.log(docs)
})
```

### 2. $lt、$lte   相当于<、<=
```
UserModel.find({age:{$lt:18}},function(err,docs){
console.log(docs)
})
```

### 3. $ne   相当于!=
```
UserModel.find({age:{$ne:18}},function(err,docs){
console.log(docs)
})
```

### 3. $in、$nin   匹配在某个范围（不再某个范围）
```
UserModel.find({age:{$in:[15,68]}},function(err,docs){
console.log(docs)
})
```

### 4. $exists  匹配某个字段是否存在，长用来检测null
```
///由于{age:null}不仅会匹配age=null，还会匹配没有age字段的文档
UserModel.find({age:{$in:[null],$exists:true}},function(err,docs){
console.log(docs)
})
```

### 5. $or 满足其中一个条件
```
UserModel.find({$or:[{age:{$lt:18}},{age:{$gt:60}}]},function(err,docs){
console.log(docs)
})
```


## 十二、queryBuilder

当遇到比较复杂的查询时，可以把多个查询条件分成几个步骤来分开查询，类似于链式查询

```
///在执行exec前，前面的查询并没有开始，只有执行exec的时候才会执行
var UserModel.where('age').gte(18).lte(60).sort({age:-1}).exec(function(err,docs){
console.log(docs)
})

UserModel.where('age').gte(38).or({age:{$lte:70}}).exec(function(err,docs){
console.log(docs)
})

```



## 十三、聚合函数

### 1.  count   查询有多少个文档匹配

```
UserModel.count({age:18},function(err,count){
console.log(count)
})
```

### 2. distinct  查询满足条件的文件并根据键分组的结果返回键分组的数组
```
//查找age>=18的文档，然后根据age分组，并把存储分组后的所有age作为数组返回
UserModel.distinct('age',{age:{$gte:18}},function(err,ary){
console.log(ary)
})
```


## 十四、游标查询

### 1. limit(num)   从结果集中取出num条数据
```
UserModel.find({age:18},{},{limit:2},function(err,docs){
console.log(docs)
})

UserModel.find({age:18}).limit(2).exec(function(err,docs){
console.log(docs)
})
```

### 2. skip(num)   跳过结果集中的前num条

```
UserModel.find({age:18},{},{skip:2},function(err,docs){
console.log(docs)
})

UserModel.find({age:18}).skip(2).exec(function(err,docs){
console.log(docs)
})
```

### 3. sort({age:-1})
```
UserModel.find({age:18},{},{sort:{age:-1}},function(err,docs){
console.log(docs)
})

UserModel.find({age:18}).sort({age:-1}).exec(function(err,docs){
console.log(docs)
})
```


## 十五、$where

查询时，如果需要用javascript表达式好进行匹配，那么可以使用#where

```
UserModel.find({$where:'this.age==18'},function(err,docs){
console.log(docs)
})

UserModel.$where("this.age==18").exec(function(err,docs){
console.log(docs)
})

UserModel.where('age').equals(18).exec(function(err,docs){
console.log(docs)
})


```
