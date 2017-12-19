var ViewModel = function () {
    var self = this;

    self.pointList = ko.observableArray([]);

    self.initPointlist = function (initialPointsList) {
        var pointM;
        initialPointsList.forEach(function (item) {
            pointM = new Point(item);
            pointM.show = true;
            pointM.maker = new google.maps.Marker({
                position: pointM.position(),
                title: pointM.title()
            });

            self.pointList.push(pointM);
        })
    };

    self.currentFilter = ko.observable();

    var activeList = ko.observableArray([]);


    self.activePointList = ko.computed(function () {

        var list = self.pointList(),
            filter = self.currentFilter();


        if(filter !== undefined && (filter.length > 2 || filter.length === 0)){

            list.forEach(function (point) {
                point.show = filter.length === 0 ? true : point.title().toUpperCase().search(filter.toUpperCase()) >= 0;
            });
        }

        activeList.removeAll();

        for(var i = 0;  i < list.length; i++){

            list[i].maker.setMap(null);
            if(list[i].show){
                list[i].maker.setMap(self.map);
                activeList.push(list[i]);
            }
        }

        return activeList();
        
    }, self);

};