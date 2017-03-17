module.exports= function(stat,msg){
  console.log(`耗时：${(new Date().getTime() - stat)/1000}s`)
  console.log(`文件数：${msg.file}`);
  console.log(`搜索路径数：${msg.dir + 1}`);
}
