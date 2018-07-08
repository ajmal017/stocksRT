app.controller('MainController', ['$scope', 'stocks', function($scope, stocks) {
    stocks.success(function(data) {
        $scope.fiveDay = data;
    });
}]);