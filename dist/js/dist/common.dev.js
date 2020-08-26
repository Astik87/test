"use strict";

var menu = $("#menu");
var menuToggler = $("#menu-toggler");
console.log(menuToggler);
menuToggler.click(function () {
  menu.slideToggle();
});