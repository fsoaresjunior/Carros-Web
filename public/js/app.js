(function($, document) {
  'use strict';

  var app = (function() {
    var $informationSite = $('[data-js="site-information"]');
    var $form = $('[data-js="form"]');
    var $tableBody = $('[data-js="body-table"]');
    var $tdRemove = '';
    var ajax = new getXmlHttpRequest();
    var post = new getXmlHttpRequest();
    var get = new getXmlHttpRequest();

    $informationSite.on('load', handleInformationSite);
    $form.on('submit', handleFormCar);
    
    function handleInformationSite() {
      sendRequest(ajax, 'GET', '/js/company.json');
      ajax.addEventListener('readystatechange', handleReadyStateChange);
    }

    function handleFormCar(event) {
      event.preventDefault();
      saveData();
      getData();
      clearForm();
    }

    function saveData() {
      post.open('POST', 'http://localhost:3000/car');
      post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      var image = 'image=' + $form.get()[1].value; 
      var brandModel = '&brandModel='  + $form.get()[2].value;
      var year = '&year=' + clearYear()
      var plate = '&plate=' + $form.get()[4].value;
      var color = '&color=' + $form.get()[5].value;
      post.send(image + brandModel + year + plate + color);
    }

    function getData() {
      sendRequest(get, 'GET', 'http://localhost:3000/car');
      get.addEventListener('readystatechange', handleTable);
    }
    
    function createLineTable() {
      var $trs = '';
      Array.prototype.forEach.call(parseData(get), function(item, index) {
        $trs += '<tr>';
        $trs += '<td><img src="' + item.image + '"></td>';
        $trs += '<td>' + item.brandModel + '</td>';
        $trs += '<td>' + item.year + '</td>';
        $trs += '<td>' + item.plate + '</td>';
        $trs += '<td>' + item.color + '</td>';
        $trs += '<td><a href="#" data-js="tdRemove">X</a></td>';
        $trs += '</tr>';
      });
      return $trs;
    }
    
    function removeLineTable(event) {
      event.preventDefault();
      var $lineTable = this.parentNode.parentNode;
      $lineTable.parentNode.removeChild($lineTable);
    }

    function getXmlHttpRequest() {
      return new XMLHttpRequest();
    }
    
    function handleTable() {
      if (isRequestOk(get)) {
        $tableBody.get().innerHTML = createLineTable();
        handleLineTable();
      }
    }

    function handleLineTable() {
      $tdRemove = $('[data-js="tdRemove"]');
      $tdRemove.on('click', removeLineTable);
    }

    function handleReadyStateChange() {
      if (isRequestOk(ajax)) {
        var data = parseData(ajax);
        $informationSite.get()[0].textContent = data.name;
        $informationSite.get()[1].textContent = data.phone;      
      }
    }

    function isRequestOk(request) {
      return request.readyState == 4 && request.status == 200;
    }

    function sendRequest(request, type, url) {
      request.open(type, url);
      request.send();
    }

    function parseData(response) {
      return JSON.parse(response.responseText);
    }

    function clearForm() {
      $form.forEach(function(item) {
        item.value = '';
      });
    }

    function clearYear() {
      return $form.get()[3].value.replace(/\D/g, '');
    }

    return {
      init: handleInformationSite
    }
  })();

  app.init();

})(window.DOM, document);