/*Weather Image Data */
const WeatherImageData={
   sun: "images/SunImage.png",
   clear: "images/clearWeather.png",
   cloud:"images/CloudIcon.png",
   thunderstorm:"images/Thunderstorms.png",
   showers:"images/Rain.png",
   cool:"images/cool.png",
   wind:"images/wind.png",
  dreary:"images/autumn.png",
  rain:"images/Rain.png",
  ice: "images/icy.png",
  snow:"images/Snow.png",
  fog:"images/fog.png"
};

/*Api Key */
const apiKey="x04IPgPVkErmAKXgztU4M2P7jdndCCm9";
/*Getting the locationKey based on city*/
const getLocationKey=async(city)=>{
                                   try{
                                   const cityResponse=await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`);
                                   const cityData=await cityResponse.json();
                                   const cityIndex=cityData.findIndex((c)=>c.EnglishName===city);
                                   if(cityIndex!==-1){
                                   return cityData[cityIndex].Key;
                                   }
                                   else{
                                     return confirm('City not found');
                                   }
                                   }catch(error){
                                      document.querySelector('.error-message').innerHTML=error;
                                   }
                                  };
/*Getting the data based on the Forecast type*/
const forecastData=async(value,key,city)=>{
    try{
        let forecastResponse;
        let forecastData;
        if(value==="Forecast for 5 days"){
            forecastResponse=await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${apiKey}`);
            forecastData=await forecastResponse.json();
            dailyForecast(city,forecastData);
        }
        else if(value==="Current Conditions"){
          forecastResponse=await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${apiKey}`);
          forecastData=await forecastResponse.json();
          currentconditions(city,forecastData);
        }
        else{
          forecastResponse=await fetch(`http://dataservice.accuweather.com/alarms/v1/1day/${key}?apikey=${apiKey}`);
          forecastData=await forecastResponse.json();
          weatherAlarms(city,forecastData);
        }

    }catch(error){
      document.querySelector('.error-message').innerHTML=error;
       }

   };
/*Getting the weather data based on locationKey*/
const weatherData=async()=>{
                             try{
                                const city=document.querySelector('.cityName').value;
                                const Key=await getLocationKey(city);
                                const forecastTypes=document.querySelectorAll('.Forecast');
                                for(let i=0;i<forecastTypes.length;i++){
                                    if(forecastTypes[i].checked && typeof(Key)!=='boolean'){
                                        forecastData(forecastTypes[i].value,Key,city);
                                    }
                                }
                                document.querySelector('.weatherForm').reset();
                                }catch(error){
                                  document.querySelector('.error-message').innerHTML=error;
                            }
                       
                            };

/*Daily Forecast For 5 days*/
const dailyForecast=(city,data)=>{
                                document.querySelector('.weatherHeading').innerHTML=`Forecast for 5 days in ${city}`;
                                const WeatherBoxes=data.DailyForecasts.map((element)=>{
                                                            const date=new Date(element.Date);
                                                            const PrecipitationDayValue=element.Day.HasPrecipitation?`${element.Day.PrecipitationIntensity} ${element.Day.PrecipitationType}`:"No Precipitation";
                                                            const PrecipitationNightValue=element.Night.HasPrecipitation?`${element.Night.PrecipitationIntensity} ${element.Night.PrecipitationType}`:"No Precipitation";
                                                            const WeatherBox=document.createElement('div');
                                                            WeatherBox.className="WeatherBox";
                                                            WeatherBox.insertAdjacentHTML('beforeend',`<div class="card CardItem">
                                                                                                       <div class="row">
                                                                                                       <div class="col-md-8">
                                                                                                       <div class="card-body">
                                                                                                       <p class="card-text text-center">
                                                                                                        Date:${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}<br><br>
                                                                                                         Day Time:<br>
                                                                                                         Prediction:${element.Day.IconPhrase}<br>
                                                                                                         Precipitation:${PrecipitationDayValue}<br><br>
                                                                                                         Night Time:<br>
                                                                                                         Prediction:${element.Night.IconPhrase}<br>
                                                                                                         Precipitation:${PrecipitationNightValue}<br><br>
                                                                                                         Temperature:<br>
                                                                                                         Maximum:${element.Temperature.Maximum.Value}${element.Temperature.Maximum.Unit}<br>
                                                                                                         Minimum:${element.Temperature.Minimum.Value}${element.Temperature.Minimum.Unit}<br><br>
                                                                                                         Sources:${element.Sources[0]}<br>
                                                                                                         <a target="_blank" class="card-link" href="${element.Link}">Link</a><br>
                                                                                                         <a target="_blank" class="card-link" href="${element.MobileLink}">Mobile Link</a>
                                                                                                         </p>
                                                                                                         </div>
                                                                                                         </div>
                                                                                                         <div class="col-md-4">
                                                                                                         <div class="p-2 weatherImage">
                                                                                                         <img src="${getImgSrc(element.Day.IconPhrase)}" width="120" height="120" alt="Weather Image"><br>
                                                                                                         </div>
                                                                                                         <div class="p-2 weatherImage">
                                                                                                         <img src="${getImgSrc(element.Night.IconPhrase)}" width="120" height="120" alt="Weather Image">
                                                                                                         </div>                                                                                                         </div>
                                                                                                         </div>
                                                                                                         </div>`);
                                                              return WeatherBox;
                                                            });
                               document.querySelector('.weatherInfo').replaceChildren(...WeatherBoxes);
                               document.querySelector('.weatherInfo').insertAdjacentHTML('afterbegin',`<h4 class="text-center">${data.Headline.Text}</h4>
                                                                                         <p class="text-center">Severity Level:${data.Headline.Severity}</p>`);
                           };
/*Current Conditions*/
const currentconditions=(city,data)=>{
                                      document.querySelector('.weatherHeading').innerHTML=`Current Conditions in ${city}`;
                                      const WeatherBoxes=data.map((element)=>{
                                                                                const date=new Date(element.LocalObservationDateTime);
                                                                                const PrecipitationValue=element.HasPrecipitation?`${element.PrecipitationType}`:"No Precipitation";
                                                                                const WeatherBox=document.createElement('div');
                                                                                 WeatherBox.className="WeatherBox";
                                                                                 WeatherBox.insertAdjacentHTML('beforeend',`<div class="card CardItem">
                                                                                                                            <div class="row">
                                                                                                                            <div class="col-md-8">
                                                                                                                            <div class="card-body">
                                                                                                                            <p class="card-text text-center"> 
                                                                                                                            Date:${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}<br><br>
                                                                                                                            Weather Prediction:${element.WeatherText}<br>
                                                                                                                               Precipitation:${PrecipitationValue}<br><br>
                                                                                                                               Day Time:${element.IsDayTime}<br>
                                                                                                                               Temperature:<br>
                                                                                                                               Imperial:${element.Temperature.Imperial.Value}${element.Temperature.Imperial.Unit}<br>
                                                                                                                               Metric:${element.Temperature.Metric.Value}${element.Temperature.Metric.Unit}<br><br>
                                                                                                                              <a target="_blank" class="card-link" href="${element.Link}">Link</a><br>
                                                                                                                              <a target="_blank" class="card-link" href="${element.MobileLink}">Mobile Link</a>
                                                                                                                              </p>
                                                                                                                              </div>
                                                                                                                              </div>
                                                                                                                              <div class="col-md-4">
                                                                                                                              <div class="weatherImage p-2">
                                                                                                                              <img src="${getImgSrc(element.WeatherText)}" width="120" height="120" alt="Weather Image">
                                                                                                                              </div>
                                                                                                                              </div>
                                                                                                                              </div>
                                                                                                                              </div>`);
                                                                                   return WeatherBox;
                                                                                  });
                                    document.querySelector('.weatherInfo').replaceChildren(...WeatherBoxes);
                                     };
/*Weather Alarms */
const weatherAlarms=(city,data)=>{                                   
                                      document.querySelector('.weatherHeading').innerHTML=`Weather Alarms for 1 Day in ${city}`;
                                      const WeatherBox=document.createElement('div');
                                      WeatherBox.className="WeatherBox";
                                      if(data.length!==0){
                                       const WeatherBoxes=data.map((element)=>{
                                            const date=new Date(element.Date);
                                            const Alarms=element.Alarms;
                                            WeatherBox.insertAdjacentHTML('beforeend',`<header class="text-center">Date:${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</header>`);
                                            AlarmData(Alarms,WeatherBox);
                                             WeatherBox.insertAdjacentHTML('beforeend',`<footer class="text-center"><a target="_blank" class="card-link" href="${element.Link}">Link</a><br>
                                                                                   <a target="_blank" class="card-link" href="${element.MobileLink}">Mobile Link</a></footer>`);
                                            return WeatherBox;
                                            });
                                              document.querySelector('.weatherInfo').replaceChildren(...WeatherBoxes);
                                      }
                                       else{
                                         WeatherBox.innerHTML="<br>No Weather Alarms for the day!";
                                         WeatherBox.style="color:green;text-align:center";
                                         document.querySelector('.weatherInfo').replaceChildren(WeatherBox);
                                       }
                

                                      };
/*Alarm Data */
function AlarmData(Alarms,Box){
Alarms.forEach((value)=>{
  Box.insertAdjacentHTML('beforeend',`<div class="card CardItem">
                                             <div class="row">
                                             <div class="col-md-8">
                                             <div class="card-body">
                                             <p class="card-text text-center">
                                             Alarm Type:${value.AlarmType}<br>
                                             Day-<br>
                                             Imperial:${value.Day.Imperial.Value}${value.Day.Imperial.Unit}<br>
                                             Metric:${value.Day.Metric.Value}${value.Day.Metric.Unit}<br>
                                             Night-<br>
                                             Imperial:${value.Night.Imperial.Value}${value.Night.Imperial.Unit}<br>
                                             Metric:${value.Night.Metric.Value}${value.Night.Metric.Unit}<br>
                                             Value-<br>
                                             Imperial:${value.Value.Imperial.Value}${value.Value.Imperial.Unit}<br>
                                             Metric:${value.Value.Metric.Value}${value.Value.Metric.Unit}<br>
                                             </p>
                                             </div>
                                             </div>
                                             <div class="col-md-4">
                                             <div class="p-2 weatherImage">
                                             <img src="${getImgSrc(value.AlarmType)}" width="120" height="120" alt="Weather Image">
                                             </div>
                                             </div>
                                             </div>
                                             </div>`);
});
}

/*Setting the correct image*/
let getImgSrc=(imageData)=>{
                               let imageSrc='';
                               for(key in WeatherImageData){
                                 if(imageData.toLowerCase().includes(key)){
                                   imageSrc=WeatherImageData[key];
                                 }
                               }
                               if(imageSrc===''){
                                 imageSrc="images/clearWeather.png";
                               }
                                return imageSrc;
                               };
