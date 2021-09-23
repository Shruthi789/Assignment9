
 /*Getting the table*/
 let DataTable=document.querySelector('.data-table');
 /*Getting a Fox Image */
 async function getFoxImage(){
   try{
   const response=await fetch('https://randomfox.ca/floof/');
   const data=await response.json();
   return data;
   }
   catch(error){
     document.querySelector('.error-message').append(`${error}`);
   }
 }
 
 /*Add a Fox Image */
 document.querySelector('.displayButton').addEventListener('click',addFoxImage);
 async function addFoxImage(){
   try{
    let responseData=await getFoxImage();
    DataTable.insertAdjacentHTML('beforeend',`<tr><td>${getRowIndex()}</td><td><img src="${responseData.image}" alt="Fox Image" height="130" width="130"></td><td><button class="updateButton" onclick="updateFoxImage(this.parentNode.parentNode)">Update Image</button></td><td><button class="deleteButton" onclick="deleteFoxImage(this.parentNode.parentNode)">Delete Image</button></td></tr>`);
   }
   catch(error){
    document.querySelector('.error-message').append(`  ${error}`);
   }
  }
 /*Update a Fox Image */
 async function updateFoxImage(row){
   try{
  let responseData=await getFoxImage();
   row.childNodes[1].firstChild.src=responseData.image;
   }
   catch(error){
    document.querySelector('.error-message').append(`  ${error}`);
   }
 }
 /*Delete a Fox Image */
function deleteFoxImage(row){
   DataTable.deleteRow(row.rowIndex);
   if(DataTable.rows.length>=2){
   DataTable.rows[getRowIndex()-1].firstChild.innerHTML=getRowIndex()-1;
   }
}
/*Update the row Index value on the table*/
let getRowIndex=()=>DataTable.rows.length;