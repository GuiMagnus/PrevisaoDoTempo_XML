var lat, long

function consultaTempo() { 
    cidade = document.getElementById('cidade');
      
    $.ajax({
        type: 'GET',
        url: "http://api.openweathermap.org/data/2.5/weather?q="+ cidade.value +"&units=metric&&mode=xml&appid=79aa3da87f11a8aa061aeabb03e9e984",
        success: function(resposta) {  
            $("#tituloTabela").html(cidade.value),
            $("#grauAtual").html(resposta.getElementsByTagName('temperature')[0].getAttribute('value')),
            $("#grauMax").html(resposta.getElementsByTagName('temperature')[0].getAttribute('max')),
            $("#grauMin").html(resposta.getElementsByTagName('temperature')[0].getAttribute('min')),
            


            nascerPorSol = resposta.getElementsByTagName('sun')[0];
            
            let nSol = new Date(new Date(nascerPorSol.getAttribute('rise') + "+0000"));
            
            let pSol = new Date(new Date(nascerPorSol.getAttribute('set') + "+0000"));

            
            $("#nSol").html(nSol.getHours() + ":" + nSol.getMinutes()),
            
            
            $("#pSol").html(pSol.getHours() + ":" + pSol.getMinutes())
            
           
           latELong = resposta.getElementsByTagName('coord')[0];
          
            $("#long").html(latELong.getAttribute('lon')),
            
            $("#lat").html(latELong.getAttribute('lat'));
            
            
            var iconcode = resposta.getElementsByTagName('weather')[0].getAttribute('icon');
			var iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
			$('#cond').attr("src", iconurl);
			
            initMap(latELong.getAttribute('lat'),latELong.getAttribute('lon'));   
        },
         error: function(resposta){
            $("#tituloTabela").html("Dados Meteorológicos:"),
            alert("Cidade não encontrada! Verifique o nome e tente novamente");
        }
    });

}  

let map;
function initMap(lat, long) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: Number(lat), lng: Number(long) },
        zoom: 8,
    });
}