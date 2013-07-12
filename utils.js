utils = {}

/**
 * Создает новый отчет
 * 
 * @param  {sting} report Другой отчет или описание. Будет добавлено в начало нового отчета.							 
 */
utils.Report = function(report) {
	this.report = report || "";

	/**
	 * Добавляет отчет
	 * 
	 * @param  {string} term Термин, например, "Название корабля"
	 * @param  {string} value Значение, например, "Яндекс", необязательный
 	 * @return {Report} Текущий отчет
	 */
	this.add = function(term, value) {
		var value = (value) ? ": " + value : "";

		this.report += term + value + ". ";
		return this;
	}

	/**
	 * Возвращает строку с отчетом
	 * 
	 * @return {string} Строка отчета
	 */
	this.get = function() {
		return this.report;
	}
}

/**
 * Обертка для console.log
 */
utils.log = function(message) {
	if (typeof console == 'undefined') {
		return;
	}

	console.log(message);
}