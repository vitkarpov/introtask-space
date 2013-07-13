test("Корабль", function() {
  var name = "Яндекс",
      position = [0,0],
      capacity = 1000,
      vessel = new Vessel(name, position, capacity)

  equal(vessel.name, "Корабль «" + name + "»", "Имя корабля");
  equal(vessel.position, "" + position, "Местоположение корабля");
  equal(vessel.capacity, capacity, "Грузоподъемность")

  equal(vessel.getFreeSpace(), capacity, "Количество свободного места равно грузоподъмности")
  equal(vessel.getOccupiedSpace(), 0, "Количество занятого места равно нулю")
});