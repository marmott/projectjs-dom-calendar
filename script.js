
(function () {    
	var panel = panda('#container');
	var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	var months =  ["January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"];
    var objDate = new Date();
    var selectedMonth = objDate.getMonth();
    var selectedYear = objDate.getFullYear();

	var initCalendar = (function(element, options) {
		var date = typeof options.date == 'undefined' ? new Date() : options.date;
		var dayWeekNumber = date.getDay();

		var objCurrentDate = new Date();
		var currentDayString = formatDate(objCurrentDate);

		var objMonthLastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

		var html = '<table class="table-calendar"  cellpadding="14">';

		html += '<tr class="yearLine">';
		html += '<td align="center" colspan="7">';
		html += '<button class= "rightbtn" id="prevYear" type="button">&#10094&#10094';
		html +='</button>';
		html += '<button class= "rightbtn" id="prevMonth" type="button">&#10094';
		html +='</button>';
		html += '<select id="selectYear">';
		for (var i = date.getFullYear() - 30; i < date.getFullYear() + 20; i++) {
			html += '<option value='+i+' '+(i == date.getFullYear() ? 'selected' : '')+'>'+i+'</option>';
		}
		html += '</select>&ensp;';

		html += '<select id="selectMonth">';
		for (key in months) {
			html += '<option value='+key+' '+(key == date.getMonth() ? 'selected' : '')+'>'+months[key]+'</option>';
		}
		html += '</select>';
		html += '<button class ="leftbtn" id="nextYear" type="button">&#10095&#10095';
		html +='</button>';
		html += '<button class ="leftbtn" id="nextMonth" type="button">&#10095';
		html +='</button>';
		html += '</td>';
		html += '</tr>';

		html += '<tr >';
		for (key in days) {
			html += '<td class="dayweeks">'+days[key]+'</td>';
		}
		html += '</tr>';
		var workDayIndex = 1;
		var startWriting = false;
		for (var i = 0; i < 5; i++) {
			html += '<tr class="daycell">';

				for (var c = 1; c <= 7; c++) {
					var tmpWorkDate = new Date(date.getFullYear(), date.getMonth(), workDayIndex);
					var tmpDayString = formatDate(tmpWorkDate);
					var dayOfWeek = tmpWorkDate.getDay();
					if (dayOfWeek == 0) {
						dayOfWeek = 7;
					}

					if (
						(tmpWorkDate.getDay() > c && i == 0) ||
						date.getMonth() != tmpWorkDate.getMonth()
					) {
						html += '<td></td>';
						continue;
					}

					html += '<td class="'+(currentDayString == tmpDayString ? 'current-date' : '')+'" data-date="'+tmpDayString+'">';

					html += tmpWorkDate.getDate();				
					html += '</td>';
					workDayIndex++;
				}

			html += '</tr>';
		}

		html += '</table>';

		element.html(html);
		element.find('#selectMonth').change(function() {
			selectedMonth = parseInt(this.value);
			refreshCalendar();
		});
		element.find('#selectYear').change(function() {
			selectedYear = parseInt(this.value);
			refreshCalendar();
		});
		element.find('#prevYear').click(function() {
			selectedYear--;
			refreshCalendar();
		});
		element.find('#nextYear').click(function() {
			selectedYear++;
			refreshCalendar();
		});
		element.find('#prevMonth').click(function() {
			selectedMonth--;
			if (selectedMonth < 0) {
				selectedMonth = 11;
				selectedYear--;
			}
			refreshCalendar();
		});
		element.find('#nextMonth').click(function() {
			selectedMonth++;
			if (selectedMonth > 11) {
				selectedMonth = 0;
				selectedYear++;
			}
			refreshCalendar();
		});
		
		function refreshCalendar()
		{
			var newDate = new Date(selectedYear, selectedMonth);
			initCalendar(element, {
				date: newDate,
			});
		}
	});

	initCalendar(panel, {
		date: objDate,
	});

	function formatDate(date) {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;

	    return [year, month, day].join('-');
	}
})();