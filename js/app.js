(function($) {

  'use strict';

  var app = (function() {
    var $informationSite = $('[data-js="site-information"]');
    var $form = $('[data-js="form"]');
    var $tableBody = $('[data-js="body-table"]');
    var $fragment = document.createDocumentFragment('tr');
    var ajax = new XMLHttpRequest();

    $informationSite.on('load', handleInformationSite);
    $form.on('submit', handleFormCar);

    function handleFormCar(event) {
      event.preventDefault();
      $tableBody.get().appendChild(createDataTableFragment());
      clearForm();
    }

    function handleInformationSite() {
      ajax.open('GET', '/js/company.json');
      ajax.send();
      ajax.addEventListener('readystatechange', handleReadyStateChange);
    }

    function handleReadyStateChange() {
      if (isRequestOk()) {
        var data = loadData();
        $informationSite.get()[0].textContent = data.name;
        $informationSite.get()[1].textContent = data.phone;      
      }
    }

    function createDataTableFragment() {
      $fragment.appendChild(handleDataTable());
      return $fragment;
    }

    function handleDataTable() {
      var $tr = createElement('tr');
      var $tdImage = createElement('td');
      var $tdBrand = createElement('td');
      var $tdYear = createElement('td');
      var $tdPlate = createElement('td');
      var $tdColor = createElement('td');
      var $image = createElement('img');

      $image.setAttribute('src', $form.get()[1].value);
      $tdImage.appendChild($image);
      $tdBrand.textContent = $form.get()[2].value;
      $tdYear.textContent = clearAge();
      $tdPlate.textContent = $form.get()[4].value;
      $tdColor.textContent = $form.get()[5].value;

      $tr.appendChild($tdImage);
      $tr.appendChild($tdBrand);
      $tr.appendChild($tdYear);
      $tr.appendChild($tdPlate);
      $tr.appendChild($tdColor);

      return $tr;
    }

    function clearForm() {
      $form.get()[1].value = '';
      $form.get()[2].value = '';
      $form.get()[3].value = '';
      $form.get()[4].value = '';
      $form.get()[5].value = '';
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

    function isRequestOk() {
      return ajax.readyState == 4 && ajax.status == 200;
    }

    return {
      init: handleInformationSite
    }
  })();

  app.init();

})(window.DOM);
