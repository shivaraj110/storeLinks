const inputEl = document.getElementById("input-el")
const saveBtn = document.getElementById("save-btn")
const saveTabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
let myArray = []
const thingsFromLocalStorage = JSON.parse(localStorage.getItem("myArray"))
if (thingsFromLocalStorage){
    myArray = thingsFromLocalStorage
    render(myArray)
}
saveBtn.addEventListener("click",function(){
    if (inputEl.value !== ""){
        myArray.push(inputEl.value)
    }
    localStorage.setItem("myArray",JSON.stringify(myArray))
    render(myArray)
    inputEl.value = ""
})
function render(array){
    let listItems = ""
    for ( let i = 0 ; i < array.length ; i++){
        listItems += `<li>
                       <a href="${array[i]}" target="_blank">
                       ${array[i]}
                       </a>
                       </li>`
    }
    ulEl.innerHTML = listItems
}
function deleteArr(){
    localStorage.clear()
    myArray = []
    render(myArray)
}
deleteBtn.addEventListener("dblclick",function(){
    deleteArr()
})
saveTabBtn.addEventListener("click",function(){
    chrome.tabs.query({ active : true, currentWindow : true},function(tabs){
      myArray.push(tabs[0].url) 
      localStorage.setItem("myArray", JSON.stringify(myArray));
    render(myArray)
    })
  })