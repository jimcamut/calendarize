/* Author: Jim Camut */


function Calendarize() {
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

	return {

    // Return the days in a month - given a year and the month number
    getDaysInMonth: function(month, year) {
    	var date = new Date(year, month, 1);
    	var days = [];
    	while (date.getMonth() === month) {
    		days.push(new Date(date));
    		date.setDate(date.getDate() + 1);
    	}
    	return days;
    },

    // return an array of the first day of each month for a given year
    getMonthsInYear: function(year) {
    	var date = new Date(year, 0, 1);
    	var months = [];
    	var monthCount = 0;
    	while (monthCount < 12) {
    		months.push(new Date(date));
    		date.setMonth(date.getMonth() + 1);
    		monthCount++;
    	}
    	return months;
    },

    // Create a full 12-month calendar
    buildYearCalendar: function(el, year) {
    	var _this = this;
    	var months = _this.getMonthsInYear(year);

    	var opts = {
    		showMonth: true,
    		showDaysOfWeek: true,
    		showYear: true,
    		clickHandler: function(e) {
    			var day = e.target.getAttribute("data-date");
    			alert(day);
    		}
    	};

    	months.forEach(function(a, b) {
    		var $monthNode = _this.buildMonth(b, year, opts);
    		if (b == 0) console.log($monthNode);
    		el.appendChild($monthNode);
    	});
    },

    // Add days and place fillers for a given month
    // This function and the one above needs consolidated
    buildMonth: function(monthNum, year, opts) {
      //if (monthNum === undefined || year === undefined) return "something is missing";
      var _this = this;
      var dtm = new Date(year, monthNum, 1);
      var dtmMonth = dtm.getMonth();
      var prevM = new Date(dtm.setMonth(dtmMonth - 1));
      var nextM = new Date(dtm.setMonth(dtmMonth + 1));
      var daysInMonth = _this.getDaysInMonth(monthNum, year);
      var daysPrevMonth = _this.getDaysInMonth(prevM.getMonth(), prevM.getFullYear());
      var daysNextMonth = _this.getDaysInMonth(nextM.getMonth(), nextM.getFullYear());
      var $monthNode = document.createElement('div');
      var $titleNode = document.createElement('h3');
      var skipLength = daysInMonth[0].getDay();
      var preLength = daysInMonth.length + skipLength;
      var postLength = function() {
      	if (preLength % 7 === 0) {
      		return 0;
      	} else {
      		if (preLength < 35) {
      			return 35 - preLength;
      		} else {
      			return 42 - preLength;
      		}
      	}
      }

      $monthNode.classList.add('month');

      // Add a Title to the month
      if (opts.showMonth) {
      	$titleNode.innerText = monthNames[monthNum] + (opts.showYear ? " " + year : '');
      	$monthNode.appendChild($titleNode);
      }


      // Add Days of week to the top row
      if (opts.showDaysOfWeek) {
      	dayNames.forEach(function(a, b) {
      		var $dayNode = document.createElement('div');
      		$dayNode.classList.add('dow');
      		$dayNode.innerHTML = dayNames[b];
      		$monthNode.appendChild($dayNode);
      	});
      }


      // Add blank days to fill in before first day
      for (var i = 0; i < skipLength; i++) {
      	var $dayNode = document.createElement('div');
      	$dayNode.classList.add('dummy-day');
      	$dayNode.innerText = daysPrevMonth.length - (skipLength - (i + 1));
      	$monthNode.appendChild($dayNode);
      }


      // Place a day for each day of the month
      daysInMonth.forEach(function(c, d) {
      	var $dayNode = document.createElement('div');
      	$dayNode.classList.add('day');
      	$dayNode.setAttribute("data-date", c);
      	$dayNode.innerHTML = (d + 1);
      	var dow = new Date(c).getDay();
      	if (dow === 0 || dow === 6) $dayNode.classList.add('weekend');
      	if (opts.clickHandler) {
      		$dayNode.addEventListener("click", opts.clickHandler);
      	}
      	$monthNode.appendChild($dayNode);
      });

      // Add in the dummy filler days to make an even block
      for (var j = 0; j < postLength(); j++) {
      	var $dayNode = document.createElement('div');
      	$dayNode.classList.add('dummy-day');
      	$dayNode.innerText = j + 1;
      	$monthNode.appendChild($dayNode);
      }

      return $monthNode;

    }
  }
}
