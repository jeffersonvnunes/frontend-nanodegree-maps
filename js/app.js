$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

var map,
    keyGoogleAPI = 'XXX',
    clientIDFoursquare = 'XXX',
    keyFoursquare = 'XXX',
    initialPointsList = [],
    neighLat = -23.5590687,
    neighLng = -46.6499476,
    pointVM = new ViewModel();

//Call Foursquare API and build the venues menu with the response
$.getJSON('https://api.foursquare.com/v2/venues/explore?ll='+neighLat+'+,'+neighLng+'&intent=match&v=20170801&section=topPicks&client_id='+clientIDFoursquare+'&client_secret='+keyFoursquare)
    .done(function(data) {
        pointVM.foursquareErrorMessage('');

        var items = data.response.groups[0] ? data.response.groups[0].items : [];

        var item;
        for (var i = 0; i < items.length; i++) {
            item = items[i];

            initialPointsList.push({
                title: item.venue.name,
                id: item.venue.id,
                lat: item.venue.location.lat,
                lng: item.venue.location.lng,
                tips: item.tips
            });
        }

        initialPointsList = initialPointsList.sort(function (a, b) {
            if (a.title > b.title) {
                return 1;
            }
            if (a.title < b.title) {
                return -1;
            }
            return 0;
        });

        pointVM.initPointlist(initialPointsList);

    }).fail(function (error) {
        pointVM.foursquareErrorMessage('Foursquare data could not be loaded');
    });

//Function for callback on the load of google map
function initMap() {
    pointVM.googleErrorMessage('');

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: neighLat, lng: neighLng},
        zoom: 15
    });
    pointVM.map = map;
    pointVM.initPointlist(initialPointsList);

    var script = document.getElementById('MAP');
    document.body.removeChild(script);
}

//Insert a script element on the body to call google maps API
function dynamicallyLoadScript() {
    var script = document.createElement("script");
    script.setAttribute('async', '');
    script.id = 'MAP';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + keyGoogleAPI + '&v=3&callback=initMap';
    script.onerror  = function () {
        pointVM.googleErrorMessage('Google map could not be loaded');
    };

    document.body.appendChild(script);
}

dynamicallyLoadScript();


ko.applyBindings(pointVM);

