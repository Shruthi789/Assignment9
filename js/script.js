
 /*Including the HTML Elements in the DOM*/
 document.body.insertAdjacentHTML('afterbegin',`<div id="overall-container" class="container-fluid mt-2"><header class="row justify-content-center text-center"><div class="col-sm-9"><div class="row justify-content-center"><div class="col-sm-4 p-2"><img src="images/PokemonImage1.png" width="80" height="80" alt="PokemonImage1"></div><div class="col-sm-4 p-2" id="InfoBox"><h3>POKEMON INFORMATION</h3><h4 id="message">Let's go!!</h4></div><div class="col-sm-4 p-2"><img src="images/PokemonImage2.png" width="80" height="80" alt="PokemonImage2"></div></div></div></header><br><table class="table table-bordered table-striped"><thead class="text-center"><tr><th>NO</th><th>NAME</th><th>ABILITIES</th><th>MOVES</th><th>WEIGHT</th></tr><thead><tbody></tbody></table></div>`);
 /*Saving the Table Object in a variable*/
 const DataTable=document.querySelector('table tbody');
 /*Retrieving the Pokemon data from the API */
 const PokemonData=async()=>{
                     try{
                     const response=await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
                     const data=await response.json();
                     return data.results;
                     }catch(error){
                       errorMessage(error);
                     }
                  };
/*Retrieving more Pokemon Data from the individual APIs*/
const morePokemonData=async(url)=>{
                     try{
                     const responseData=await fetch(`${url}`);
                     const data=await responseData.json();
                     return data;
                     }catch(error){
                      errorMessage(error);
                     }
                     };
/*Adding the Pokemon Data to the table*/
const addPokemonData=async()=>{
                      try{
                       const results=await PokemonData();
                       results.forEach(addLogic);
                       }catch(error){
                        errorMessage(error);
                      }
                    };
 const addLogic=async(element,index)=>{
                try{
                 const values=await morePokemonData(element.url);
                 DataTable.insertAdjacentHTML('beforeend',`<tr><td>${DataTable.rows.length+1}</td><td>${element.name}</td><td>${getAbilities(values.abilities)}</td><td>${getMoves(values.moves)}</td><td>${values.weight}</td></tr>`);
                }catch(error){
                  errorMessage(error);
                }
                };
/*Getting the abilities and moves as a comma-separated List */
const getAbilities=(abilities)=>{
                     const abilityList=abilities.map((element)=>{
                       if(element.ability!==undefined){
                          return element.ability.name;
                       }
                     });
                     return abilityList.toString();
                   };
const getMoves=(moves)=>{
                    let movesList=moves.map((element)=>{
                     return element.move.name;
                    });
                   return movesList.toString();
                  };
/*Error Scenario */
const errorMessage=(error)=>{
                   document.getElementById('message').innerHTML=error;
                   document.getElementById('message').style.color="red";
                    };
/*Calling the add Pokemon Data function*/
addPokemonData();