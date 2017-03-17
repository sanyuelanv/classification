module.exports= function(path){
  // console.log(path);
  var root = path.split('/')
  return root[root.length - 1]
}
