var Point = function (data) {
    var self = this;
    self.title = ko.observable(data.title);
    self.type = ko.observable(data.type);
    self.lat = ko.observable(data.lat);
    self.lng = ko.observable(data.lng);
    self.clicked = ko.observable(false);
    self.tips = data.tips;
    self.id = data.id;

    self.position = function () {
        return {
            lat: self.lat(),
            lng: self.lng()
        }
    };
};