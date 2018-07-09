var app = angular.module('iexStocks', ['nvd3']);
app.controller('MainCtrl', ['$scope', 'services', function($scope, services) {

    services.getData().then(function successCb(data) {


        $scope.barData = [];

        var stock = {
            key: 'Product stock',
            values: []
        };

        stock.values = _.map(data.data, function(prod) {
            return {
                label: prod.date,
                value: prod.volume
            };
        });
        console.log(stock);
        $scope.barData.push(stock);
    });


    $scope.barOptions = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin: {
                top: 20,
                right: 20,
                bottom: 50,
                left: 175
            },
            x: function(d) { return d.label; },
            y: function(d) { return d.value; },
            showValues: true,
            valueFormat: function(d) {
                return d3.format(',.2f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: 'Trading Day'
            },
            yAxis: {
                axisLabel: 'Volume *',
                axisLabelDistance: -40
            }
        }
    };
}])

.factory('services', ['$http', function($http) {
    var serviceBase = 'services/'
    var object = {};
    object.getData = function() {
        return $http.get('https://api.iextrading.com/1.0/stats/historical/daily?last=5');
    };
    return object;
}]);