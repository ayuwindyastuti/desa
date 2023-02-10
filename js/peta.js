function peta_map()
{
   
    var lat = -6.1785876
    var lng = 106.53510427;

    // var cities = L.layerGroup();

    map = L.map('map-main', {
        center: [lat, lng],
        minZoom: 3,
        zoom: 11,
        scrollWheelZoom: false,
        // zoomControl: false
    });
  
    var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';


  var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
	var	streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr}).addTo(map);
	var	satteliteStreet  = L.tileLayer(mbUrl, {id: 'mapbox/satellite-streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
	var	dark  = L.tileLayer(mbUrl, {id: 'mapbox/navigation-night-v1', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

    var baseLayers = {
		"Streets": streets,
		"Grayscale": grayscale,
		"Satelite": satteliteStreet,
		"Dark Map": dark,
	};
    //------Pane Batas Kecamatan
    map.createPane("batas_kecamatan");
    map.getPane("batas_kecamatan").style.zIndex = 402;

    var batasKecamatan = L.geoJSON(null, {
      pane: "batas_kecamatan",
      style: function(feature) {
        
        warna = '#989797';
       

        return {
            fillColor: warna,
            color: '#262626',
            weight: 0.5,
            opacity: 1,
            fillOpacity: 1.0
          };
      },
      /* Highlight & Popup */
      onEachFeature: onEachFeature
    }).addTo(map);

    $.getJSON('js/BatasKecamatan.geojson', function(data) {
      if (jQuery.isEmptyObject(data)) {
        console.log("no data");
      } else {
        batasKecamatan.addData(data);
      }
    });

    //------Pane Label Kecamatan

    map.createPane("label_kecamatan");
    map.getPane("label_kecamatan").style.zIndex = 403;
    var labelkecamatan = L.geoJSON(null, {
      pane: "label_kecamatan",
      style: function(feature) {
        return {
          fillColor: '#000',
          color: "#123123",
          weight: 0,
          opacity: 1,
        };
      },
      onEachFeature: labelKecamatan,
      pointToLayer: markerKecamatan,
    }).addTo(map);

    $.getJSON('js/KecamatanLabel.geojson', function(data) {
      if (jQuery.isEmptyObject(data)) {
        console.log("no data");
      } else {
        labelkecamatan.addData(data);
      }
    });

    var overlays = {
		"Batas Kecamatan": batasKecamatan,
        "Nama Kecamatan": labelkecamatan,
    }
	L.control.layers(baseLayers, overlays).addTo(map);

}

function onEachFeature(feature, layer) {
    var popupContent = "";
    $.ajax({
        url : 'list-desa/'+feature.properties.name.toLowerCase()+'.html',
        success : function(res){
            

            popupContent = res;
            
            if(feature.properties.WARNA == "")
                warna = '#ebebeb';
            else
                warna = feature.properties.WARNA;
    
            layer.on({
                mouseover: function () {
                    this.setStyle({
                        'fillColor': '#ffffff',
                        fillOpacity: 1,
                    });
                },
                mouseout: function () {
                    this.setStyle({
                        'fillColor': '#989797',
                        fillOpacity: 1,
                    });
                },
                click: function () {
                    // alert('/Clicked on ' + feature.properties.kecamatan)
                }
            });
            layer.bindPopup(popupContent, {
                maxWidth: 510
            });
        }
    });

}

function labelKecamatan(feature, layer) {
    var kec=feature.properties.kecamatan
        layer.bindTooltip(kec, {
            permanent: true,
            direction: 'center',
            className: 'countryLabelKecamatan'
        });
}

function markerKecamatan(feature, latlng) {
    // Change the values of these options to change the symbol's appearance
    let options = {
        radius: 0,
        weight: 0,
        opacity: 1,
        fillOpacity: 1.0
    }
    return L.circleMarker(latlng, options);
}