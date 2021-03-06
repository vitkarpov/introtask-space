/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
  this.name = (name) ? "Корабль «" + name + "»" : "Грузовой корабль";
  if (!position && !position.length) {
    throw new Error('Местоположение корабля «' + this.name + '» должно быть определено');
  }
  this.position = position;
  this.capacity = capacity;
  this.cargo = 0;
}


/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
  var report;

  report = new utils.Report();

  report.add(this.name)
        .add('Местоположение', this.position)
        .add('Занято', this.cargo + ' из ' + this.capacity + 'т');

  report = report.get();        

  utils.log(report);
  return report;
}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
  utils.log(this.capacity - this.cargo);
  return this.capacity;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
  utils.log(this.cargo);
  return this.cargo;
}

/**
 * Загружает корабль
 *
 * @param {Number} cargo Количество загружаемого груза
 * @name Vessel.loadCargo
 * @return {Number} количество груза, которое поместилось.
 */
Vessel.prototype.loadCargo = function (cargo) {
  cargo = (cargo < this.capacity - this.cargo) ? cargo : this.capacity - this.cargo
  this.cargo += cargo;

  return this.cargo;
}

/**
 * Выгружает корабль
 *
 * @param {Number} cargo Количество выгружаемого груза
 * @name Vessel.unloadCargo
 */
Vessel.prototype.unloadCargo = function (cargo) {
  cargo = (cargo < this.cargo) ? cargo : this.cargo;
  this.cargo -= cargo;

  //количество выгруженного груза
  return cargo;
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.flyTo
 */
Vessel.prototype.flyTo = function (newPosition) {
  var constructor = newPosition.constructor.name;

  this.position = (constructor == 'Planet') ? newPosition.position : newPosition;
}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
  this.name = name || "Untitled"
  if (!position || !position.length) {
    throw new Error('Местоположение планеты «' + this.name + '» должно быть определено');
  }
  this.position = position;
  this.availableAmountOfCargo = availableAmountOfCargo;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
  var report;

  report = new utils.Report()
                  .add('Планета', this.name)
                  .add('Местоположение', this.position);

  if (this.availableAmountOfCargo > 0) {
    report.add('Доступно груза', this.availableAmountOfCargo + 'т');
  } else {
    report.add('Грузов нет')
  }

  report = report.get();

  utils.log(report);
  return report;
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
  utils.log(this.availableAmountOfCargo);
  return this.availableAmountOfCargo;
}

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
  var constructor = vessel.constructor.name,
      loaded = 0,
      report = new utils.Report();

  if (constructor != 'Vessel') {
    throw new Error(vessel + " должен быть экземпляром космического корабля")
  }

  if (this.position != vessel.position) {
    return utils.log(report.add('Внимание! Корабль не находится на планете').get())
  }

  this.availableAmountOfCargo -= vessel.loadCargo(cargoWeight);
}

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
  var constructor = vessel.constructor.name,
      unloaded;

  if (constructor != 'Vessel') {
    throw new Error(vessel + " должен быть экземпляром космического корабля")
  }

  if (this.position != vessel.position) {
    return utils.log(report.add('Внимание! Корабль не находится на планете').get())
  }

  uloaded = vessel.unloadCargo(cargoWeight);
  this.availableAmountOfCargo += uloaded;
}
