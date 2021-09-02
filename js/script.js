//Submitting data
let tableInfo=[];
function submitData(event){
    event.preventDefault();
   let textInputs=document.querySelectorAll('input[type="text"]');
   let textAreaInput=document.querySelector('textarea');
   let radioInputs=document.querySelectorAll('input[type="radio"]');
   let checkedInputs=document.querySelectorAll('input[type="checkbox"]');
   let obj={
       FirstName:textInputs[0].value,
       LastName:textInputs[1].value,
       Address:textAreaInput.value,
       Pincode:textInputs[2].value,
       Gender:radioInputs[0].checked?radioInputs[0].value:radioInputs[1].checked?radioInputs[1].value:'',
       FoodChoices: (FoodChoices(checkedInputs).length<2)?confirm('Please select at least two food options'):FoodChoices(checkedInputs),
       State:textInputs[3].value,
       Country:textInputs[4].value
    };
   if(tableInfo.findIndex((element)=>JSON.stringify(element)===JSON.stringify(obj))!==-1){
   alert('Data already exists');
   }
   else if(obj.FoodChoices!==true&&obj.FoodChoices!==false) {
    tableInfo.push(obj);
    addTableRow(obj);
    document.querySelector('form').reset();
   }
}
//Getting the food choices
function FoodChoices(inputs){
let foodChoiceArr=[];
inputs.forEach((element)=>{
    if(element.checked){
        foodChoiceArr.push(element.value);
    }
});
return foodChoiceArr;
}
//Adding the Table Row
function addTableRow(rowObj){
 let tableRow=document.createElement('tr');
 for(var key in rowObj){
     let tableData=document.createElement('td');
     if(key==='FoodChoices'){
        let List=document.createElement('ul');
        List.style="display:inline;padding:0px;list-style-type:none;";
        rowObj[key].forEach((element)=>{
           let item=document.createElement('li');
           item.appendChild(document.createTextNode(element));
           List.appendChild(item);
        });
        tableData.appendChild(List);
     }
     else{
     tableData.appendChild(document.createTextNode(rowObj[key]));
     }
     tableRow.appendChild(tableData);
 }
 document.getElementById('data-table').appendChild(tableRow);    

}