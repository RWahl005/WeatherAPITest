var o = getData();
var data = `https:\\\\api.weather.gov/points/${o[0][1]},${o[1][1]}`;
clickToday();

fetch(`https:\\\\api.weather.gov/points/${o[0][1]},${o[1][1]}`).then(e => {
    return e.json();
}).then(r =>{
    console.log(r);
    getCounty(r);
    document.getElementById("city").innerHTML = r.properties.relativeLocation.properties.city + ", " + r.properties.relativeLocation.properties.state
});

function getCounty(r){
    fetch(r.properties.county).then(e => {
        return e.json();
    }).then(r =>{
        document.getElementById("county").innerHTML = r.properties.name + " County";
    });
}

function displayToday(){
    fetch(data).then(e =>{
        return e.json();
    }).then(r => {
        fetch(r.properties.forecast).then(e =>{return e.json();}).then(r => {
            document.querySelector("#today > h3").innerHTML = new Date().toDateString();
            for(var i = 0; i < 3; i++){
                document.getElementById("t" + (i + 1)).innerHTML = r.properties.periods[i].name;
                document.getElementById("t" + (i + 1) + "symbol").innerHTML = getSymbol(r.properties.periods[i].shortForecast);
                document.getElementById("t" +  (i + 1) + "forecast").innerHTML = r.properties.periods[i].shortForecast;
                document.getElementById("t" + (i + 1) + "temp").innerHTML = "Temperature: " + r.properties.periods[i].temperature + r.properties.periods[i].temperatureUnit;
                document.getElementById("t" + (i + 1) + "wind").innerHTML = "Wind: " + r.properties.periods[i].windSpeed  + " " + r.properties.periods[i].windDirection;
                document.getElementById("t" + (i + 1) + "desc").innerHTML = r.properties.periods[i].detailedForecast;
                console.log(i);
            }
        });
    });
}

function getSymbol(shortForecast){
    if(shortForecast.toLowerCase().includes("thunderstorm")) return "&#x26C8;&#xFE0E;";
    if(shortForecast.toLowerCase().includes("showers")&& shortForecast.toLowerCase().includes("chance")) return "🌦&#xFE0E;";
    if(shortForecast.toLowerCase().includes("showers")) return "🌧";
    if(shortForecast.toLowerCase().includes("cloudy") && shortForecast.toLowerCase().includes("partly")) return "⛅";
    if(shortForecast.toLowerCase().includes("cloudy")) return "☁";

    return "☀";

}

function clickToday(){
    document.getElementById("today").style.display = "block";
    document.getElementById("hourly").style.display = "none";
    document.getElementById("weekly").style.display = "none";
    displayToday();
}

function clickWeekly(){

}

function getData(){
    var b = window.location.search.replace("?", "").split("&");
    var c = [];
    for(var i in b){
        var d = b[i].split("=");
        c.push([d[0], d[1]]);
    }
    return c;
}