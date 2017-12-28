var ViewModel = function () {
    var self = this;
    var infowindow;

    self.pointList = ko.observableArray([]);
    self.hasItem = ko.observable(false);

    //Populate initialPointsList with google map makers
    self.initPointlist = function (initialPointsList) {

        if(self.map){
            var pointM;

            infowindow = new google.maps.InfoWindow();

            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });

            initialPointsList.forEach(function (item) {
                pointM = new Point(item);
                pointM.show = true;
                pointM.marker = new google.maps.Marker({
                    position: pointM.position(),
                    title: pointM.title(),
                    animation: google.maps.Animation.DROP
                });

                //Changes the maker animation and image when clicked on the menu or marker
                pointM.highlightMarker = function (point) {
                    return function () {
                        if(!self.clickedPoint || self.clickedPoint.id !== point.id){
                            //Reset the clicked marker to default
                            if( self.clickedPoint){
                                self.clickedPoint.clicked(false);
                                self.clickedPoint.marker.setIcon(null);
                                self.clickedPoint.marker.setAnimation(null);
                            }

                            point.clicked(true);
                            point.marker.setIcon('img/green-dot.png');
                            point.marker.setAnimation(google.maps.Animation.BOUNCE);
                            self.clickedPoint = point;
                            infowindow.marker = point.marker;

                            var content = '<div style="max-height: 100vh;"> <h3>'+ point.marker.title +'</h3> <h4>Tips</h4> <ul class="list-unstyled components">';

                            for(var i = 0; i < point.tips.length; i++){
                                content = content + '<li>'+point.tips[i].text+'</li>';
                            }

                            content = content + '</ui></div>';

                            infowindow.setContent(content);
                            infowindow.open(self.map, point.marker);
                        }
                    }
                }(pointM);

                pointM.marker.addListener('click', pointM.highlightMarker);

                self.pointList.push(pointM);
            })
        }
    };

    self.currentFilter = ko.observable();

    var activeList = ko.observableArray([]);
    //Array built with the filtered venues
    self.activePointList = ko.computed(function () {

        var list = self.pointList(),
            filter = self.currentFilter();

        if(filter !== undefined && (filter.length > 2 || filter.length === 0)){

            if( self.clickedPoint){
                self.clickedPoint.clicked(false);
                self.clickedPoint.marker.setIcon(null);
                self.clickedPoint.marker.setAnimation(null);

                infowindow.marker = null;
            }

            list.forEach(function (point) {
                point.show = filter.length === 0 ? true : point.title().toUpperCase().search(filter.toUpperCase()) >= 0;
            });
        }

        activeList.removeAll();

        for(var i = 0;  i < list.length; i++){

            list[i].marker.setMap(null);
            if(list[i].show){
                list[i].marker.setMap(self.map);
                activeList.push(list[i]);
            }
        }

        self.hasItem(activeList().length > 0);

        return activeList();
        
    }, self);

};