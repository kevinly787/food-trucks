"use strict";

var itemsUrl = 'https://api.parse.com/1/classes/items';

//create new angular module
angular.module('FoodApp', [])
	.config(function($httpProvider) {
        //Parse required two extra headers sent with every HTTP request: X-Parse-Application-Id, X-Parse-REST-API-Key
        //the first needs to be set to your application's ID value
        //the second needs to be set to your application's REST API key
        //both of these are generated by Parse when you create your application via their web site
        //the following lines will add these as default headers so that they are sent with every
        //HTTP request we make in this application
        $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'bAO3og2I0SZxhlE7N1TC0yTNGjEYx677VvlKXmRh';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'rIN4tjOwmDQlyeJHn6L8CQhhpzv6OECF81ZVKEWo';
    })
    .controller('FoodController', function($scope, $http) {
        $scope.siganos = siganos;
        $scope.hotdawgs = hotdawgs;
        $scope.motosurf = motosurf;
        $scope.redsquarebbq = redsquarebbq;

        $scope.additem = function (item) {
            $scope.loading = true;
            $http.post(itemsUrl, item)
                .success(function (responseData) {
                    $scope.item.objectId = responseData.objectId;
                    $scope.items.push($scope.item);
                })
                .error(function (err) {
                    $scope.errorMessage = err;
                })
                .finally(function () {
                    $scope.loading = false;
                });
        };

        $scope.refreshItems = function () {
            $scope.loading = true;
            $http.get(itemsUrl)
                .success(function (data) {
                    $scope.items = data.results;
                    var cost = 0;
                    console.log(data.results);
                    data.results.forEach( function (item) {
                        cost += item.price;
                        cost = Math.ceil(cost * 100) / 100;
                    });
                    console.log(cost);
                    var total = Math.ceil(cost * 1.10 * 100) / 100;
                    document.getElementById('subtotal').innerHTML = '$' + cost;
                    document.getElementById('total').innerHTML = '$' + total;
                })
                .error(function (err) {
                    $scope.errorMessage = err;
                })
                .finally(function () {
                    $scope.loading = false;
                });
        };

        //document.getElementById('submit-order').addEventListener('click', function() {
        //    document.getElementById('success-order').style.display = 'block';
        //});

        $scope.deleteitem = function (item) {
            $http.delete(itemsUrl + '/' + item.objectId)
                .success(function (responseData) {
                    $scope.refreshItems();
                })
                .error(function (err) {
                    console.log(err);
                })
                .finally(function () {
                    //nothing needed
                })
        };

        $scope.refreshItems();

    });

//scroll to each section 
$(document).ready(function() {
    $('nav a, p a[href ="#header"]').click(function(eventObject) { ///need to fix this line 
        console.log(this.hash);
        var targetElement = jQuery(this.hash); //#about #how-it-works
        $('html, body').animate({
            scrollTop: targetElement.offset().top - navHeight
        }, 700);
        eventObject.preventDefault(); //tells page not to do default behavior b/c we are going to animate it ourselves
    });

    var nav = $('nav');
    var navTop = nav.offset().top;
    var navHeight = nav.outerHeight();

});
