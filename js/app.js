$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

var map;
var pointVM = new ViewModel();

function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -23.5590687, lng: -46.6499476},
        zoom: 16
    });
    pointVM.map = map;
    pointVM.initPointlist(initialPointsList);
}

var initialPointsList = [];

initialPointsList.push({
    title: 'Master Supermercados',
    type: 'market',
    lat: -23.5582031,
    lng: -46.6495399
});

initialPointsList.push({
    title: 'Carrefour Express Brigadeiro Bela Vista',
    type: 'market',
    lat: -23.5643845,
    lng: -46.6508478
});

initialPointsList.push({
    title: 'Supermercado Dia',
    type: 'market',
    lat: -23.5589905,
    lng: -46.6524734
});

initialPointsList.push({
    title: 'Outback Steakhouse',
    type: 'restaurant',
    lat: -23.55371,
    lng: -46.655274
});

initialPointsList.push({
    title: 'Rancho Nordestino',
    type: 'restaurant',
    lat: -23.5554258,
    lng: -46.6479601
});

initialPointsList.push({
    title: 'Itália Mia',
    type: 'restaurant',
    lat: -23.5586049,
    lng: -46.6477909
});


ko.applyBindings(pointVM);

