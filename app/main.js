const fs = require('fs')
const path = require('path')
const ignore = ['node_modules','.DS_Store','npm-debug.log']
const getRootName = require("../config/getname")
// const mylog = require("./config/log")

// var app = express()

module.exports = function main(PATH){
  // const PATH = '/Users/songhang/project'
  var hasGitIgnore = false
  var gitignore = []
  var dirNumber = 0
  var filesNumber = 0
  var startTime = new Date().getTime()

  var tree =  {
    name:getRootName(PATH),
    children:[]
  }
  var readDir = function(obj,src){
    try {
      var files = fs.readdirSync(path.join(src,obj.name))
      dirNumber ++
      files = files.filter((item,index)=>{
        for(var i=0;i<gitignore.length;i++){
          if(item == gitignore[i]){
            return false
            break
          }
        }
        if(item.indexOf('.') == '0'){return false}
        // 处理tree的信息
        var itemObject = {
          name:item,
          children:[],
        }
        readDir(itemObject,path.join(src,obj.name))
        obj.children.push(itemObject)
        return true
      })
    }
    catch (err) {
      if(err.code == 'ENOTDIR'){
        filesNumber ++
        obj.children = null
      }
      else {console.log(err)}
    }

  }
  // 读当前目录
  try {var files = fs.readdirSync(PATH)}
  catch (e) {console.log(e)}
  // 过滤files，如果存在gitignore就提取，去除所有'.'开头的文件
  files = files.filter((item,index)=>{
    if(item == '.gitignore'){hasGitIgnore = true}
    if(item.indexOf('.') == '0'){return false}
    else {return true}
  })
  if(hasGitIgnore){
    try {var fileText = fs.readFileSync(path.join(PATH,'.gitignore'),'utf8')}
    catch (e) {console.log(e)}
    gitignore = fileText.split('\n')
    gitignore = gitignore.filter((item,index)=>{
      for(var i=0;i<ignore.length;i++){
        if(item == ignore[i]){
          return false
          break
        }
      }
      if(item == ''){return false}
      return true
    })
    gitignore = gitignore.concat(ignore)
  }
  // 再过滤files，去除gitignore指定文件，并且开始排列tree
  files = files.filter((item,index)=>{
    for(var i=0;i<gitignore.length;i++){
      if(item == gitignore[i]){
        return false
        break
      }
    }
    // 处理tree的信息
    var itemObject = {
      name:item,
      children:[],
    }
    // 把每一个当作路径来读。
    readDir(itemObject,PATH)
    tree.children.push(itemObject)
    return true
  })
  return tree
  // mylog(startTime,{file:filesNumber,dir:dirNumber})
}

// main()
