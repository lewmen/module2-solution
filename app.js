(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var TBC = this;

  TBC.addItem = function (name, quantity, itemIndex) {
    ShoppingListCheckOffService.addItem(name, quantity, itemIndex);
    TBC.listBuyEmpty = ShoppingListCheckOffService.listBuyEmpty();
  };

  TBC.listToBuy = ShoppingListCheckOffService.getItemsToBuy();
  TBC.listBuyEmpty = false;

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var ABC = this;

  ABC.chklistBoughtEmpty = function (){
    ABC.listBoughtEmpty = ShoppingListCheckOffService.listBoughtEmpty();
    return ABC.listBoughtEmpty; 
  };  

  ABC.listBought = ShoppingListCheckOffService.getItemsBought();
  ABC.listBoughtEmpty = true;
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var listTobuy =[];
  var listBought =[];

  listTobuy.push({name:"Milk", quantity:"5"});
  listTobuy.push({name:"Donuts", quantity:"85"});
  listTobuy.push({name:"Cookies", quantity:"75"});
  listTobuy.push({name:"Chocolate", quantity:"5"});
  listTobuy.push({name:"Pepto", quantity:"55"});

  service.addItem = function (itemName, quantity, itemIndex) {
    var item = {
      name: itemName,
      quantity: quantity
    };
  	listBought.push(item);
    listTobuy.splice(itemIndex, 1);  
  };

  service.getItemsToBuy = function () {
    return listTobuy;
  };

  service.getItemsBought = function () {
    return listBought;
  };

  service.listBoughtEmpty = function (){
    return (typeof listBought != "undefined" && listBought != null && listBought.length > 0)?false:true;
  };

  service.listBuyEmpty = function (){
    return (typeof listTobuy != "undefined" && listTobuy != null && listTobuy.length > 0)?false:true;
  };

}

})();