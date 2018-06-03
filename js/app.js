(function($, document) {

  'use strict';

  var app = (function() {
    var $informationSite = $('[data-js="site-information"]');
    var $form = $('[data-js="form"]');
    var $tableBody = $('[data-js="body-table"]');
    var $tdRemove = '';
    var $th = $('[data-js="th-table"]');
    var $fragment = document.createDocumentFragment('tr');
    var ajax = new XMLHttpRequest();

    $informationSite.on('load', handleInformationSite);
    $form.on('submit', handleFormCar);
    
    function handleInformationSite() {
      ajax.open('GET', '/js/company.json');
      ajax.send();
      ajax.addEventListener('readystatechange', handleReadyStateChange);
    }

    function handleFormCar(event) {
      event.preventDefault();
      $tableBody.get().appendChild(createDataTableFragment());
      handleLineTable();
      clearForm();
    }
    
    function handleLineTable() {
      $tdRemove = $('[data-js="tdRemove"]');
      $tdRemove.on('click', removeLineTable);
    }

    function removeLineTable(event) {
      event.preventDefault();
      var $lineTable = this.parentNode.parentNode;
      $lineTable.parentNode.removeChild($lineTable);
    }

    function createDataTableFragment() {
      $fragment.appendChild(handleDataTable());
      return $fragment;
    }

    function handleDataTable() {
      var $tr = createElement('tr');
      $tr.innerHTML = createTds();
      return $tr;
    }

    function createTds() {
      var $tds = '';
      var $inputsForm = filterForm();
      $th.forEach(function(item, index){
        if (!$inputsForm[index]) {
          $tds += '<td><a href="#" data-js="tdRemove">X</a></td>';
          return;
        }
        $tds += $inputsForm[index].type === 'url' 
        ? '<td><img src="' + $inputsForm[index].value + '"></td>'
        : '<td>' + $inputsForm[index].value + '</td>';
      });
      return $tds;
    }
    
    function filterForm() {
      return $form.filter(function(item) {
        return item.nodeName == 'INPUT';
      });
    }

    function handleReadyStateChange() {
      if (isRequestOk()) {
        var data = loadData();
        $informationSite.get()[0].textContent = data.name;
        $informationSite.get()[1].textContent = data.phone;      
      }
    }

    function isRequestOk() {
      return ajax.readyState == 4 && ajax.status == 200;
    }

    function clearForm() {
      $form.forEach(function(item) {
        item.value = '';
      });
    }

    function clearAge() {
      return $form.get()[3].value.replace(/\D/g, '');
    }

    function createElement(element) {
      return document.createElement(element);
    }

    function loadData() {
      return JSON.parse(ajax.responseText);
    }

    return {
      init: handleInformationSite
    }
  })();

  app.init();

})(window.DOM, document);