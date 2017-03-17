const main = require("../app/main.js")
const remote = require('electron').remote
// const win = remote.getCurrentWindow()
const { dialog } = remote
let select = document.getElementById('select')
let isSelect = false
select.addEventListener('click',function(){
  if(isSelect){return}
  isSelect = true
  dialog.showOpenDialog({properties: ['openDirectory']},function(dir){
    isSelect = false
    if(dir){
      let tree = main(dir[0])
      
    }
  })
})
