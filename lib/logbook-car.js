
var PRIVATE_CAR_REFUND = 0.183; // 0.183 € per 1 km
var AVG_FUEL_PRICE = require('./data/avgFuelPrice2014.json');

var getPrivateCarRefund = function(distance) {
  return (distance * PRIVATE_CAR_REFUND);
};

var getWeek = function(date) {
  var onejan = new Date(new Date().getFullYear(), 0, 1);
  return Math.ceil((((date - onejan) / (60 * 60 * 24 * 1000)) + onejan.getDay()) / 7);
};

var getAvgFuelPrice = function(avgFuelData, fuelType, date){
  var week = getWeek(new Date(date));
  var fuelDataForWeek = avgFuelData[week - 1];

  if (!fuelDataForWeek) {
    return 0;
  }
  else {
    return fuelDataForWeek[fuelType] || 0;
  }
};

var getFuelPrice = function(CAR, date, cb) {
  return getAvgFuelPrice(AVG_FUEL_PRICE, CAR.fuelType, date);
};

var getFuelRefund = function(CAR, distance, date, cb) {
  return (CAR.fuelEconomy * distance / 100) * getFuelPrice(CAR, date);
};

module.exports = {
  getPrivateCarRefund: getPrivateCarRefund,
  getFuelRefund: getFuelRefund
};
