test("Новый корабль «Яндекс»: new Vessel ('Яндекс', [0,0], 1000)", function() {
  var name = "Яндекс",
      position = [0,0],
      capacity = 1000,
      vessel = new Vessel(name, position, capacity)

  equal(vessel.name, "Корабль «" + name + "»", "Имя корабля: " + name);
  equal(vessel.position, "" + position, "Местоположение корабля: " + position);
  equal(vessel.capacity, capacity, "Грузоподъемность: " + capacity);
  equal(vessel.getFreeSpace(), capacity, "Количество свободного места равно грузоподъемности");
  equal(vessel.getOccupiedSpace(), 0, "Количество занятого места равно нулю");
});

test("Новая планета: new Planet('A', [0,0], 0)", function() {
	var name = "A",
			position = [0,0],
			availableAmountOfCargo = 0,
			planetA = new Planet(name, position, availableAmountOfCargo);

	equal(planetA.name, name, "Название планеты: " + name);
	equal(planetA.position, position, "Местоположение планеты: " + position);
	equal(planetA.availableAmountOfCargo, availableAmountOfCargo, "Грузов нет");
});

test("Полет корабля на планету", function() {
	var vessel = new Vessel("Яндекс", [0,0], 1000),
			planetA = new Planet("B", [100,100], 5000);

	//летим на планету A		
	vessel.flyTo(planetA);

	equal(vessel.position, planetA.position, "Местоположение корабля и планеты совпадают");
});

test("Загрузка корабля", function() {
	var capacity = 1000,
			availableAmountOfCargo = 5000,
			vessel = new Vessel("Яндекс", [0,0], capacity),
			planetB = new Planet("B", [100,100], availableAmountOfCargo);

	planetB.loadCargoTo(vessel);
	notEqual(vessel.cargo, vessel.capacity, "Корабль не был загружен — он не прилетел на планету");

	vessel.flyTo(planetB);
	planetB.loadCargoTo(vessel);
	equal(vessel.cargo, capacity, "Корабль полностью загружен");
	equal(planetB.availableAmountOfCargo, availableAmountOfCargo - capacity, "Корабль выгрузил с планеты " + capacity + "т. груза");
});

var vessel = new Vessel('Яндекс', [0,0], 1000);
var planetA = new Planet('A', [0,0], 0);
var planetB = new Planet('B', [100, 100], 5000);

// Проверка текущего состояния
vessel.report(); // Корабль "Яндекс". Местоположение: 0,0. Занято: 0 из 1000т.
planetA.report(); // Планета "A". Местоположение: 0,0. Грузов нет.
planetB.report(); // Планета "B". Местоположение: 100,100. Доступно груза: 5000т.

vessel.flyTo(planetB);
planetB.loadCargoTo(vessel, 1000);
vessel.report(); // Корабль "Яндекс". Местоположение: 100,100. Занято: 1000 из 1000т.

vessel.flyTo(planetA);
planetA.unloadCargoFrom(vessel, 500);
vessel.report(); // Корабль "Яндекс". Местоположение: 0,0. Занято: 500 из 1000т.
planetA.report(); // Планета "A". Местоположение: 0,0. Доступно груза: 500т.
planetB.report(); // Планета "B". Местоположение: 100,100. Доступно груза: 4000т.