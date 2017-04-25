require(['N/search'], function(search) {
	console.log('test');
	var paymentsByMonthSearch = search.load({
		id: 'customsearch_payments_by_month'
	}).run();
	console.log('search: ' + paymentsByMonthSearch);
	console.log('length: ' + paymentsByMonthSearch.columns.length)
	var resultsArray = getDataOnly(paymentsByMonthSearch);
	log.debug(resultsArray);
	
//	paymentsByMonthSearch.each(function(result) {
//		//var serviceDate = result.getValue(paymentsByMonthSearch.columns[1]);
//		console.log(paymentsByMonthSearch.columns[11]);
//		var insuranceCollections = result.getValue({
//			name: 'custrecord_svcdate'
//		});
//		//console.log(serviceDate);
//		console.log(insuranceCollections);
//		data.push(insuranceCollections);
//	});
//	
//	console.log('past search');
//	var paymentsByMonth = new Chartist.Line('#chart1', {
//		labels: ['Jan', 'Feb'],
//		series: [ data ]
//	}, {
//		height: '200px',
//		width: '300px'
//	});

	function getDataOnly(searchResults) { // accepts search.ResultSet object		
		// gets the search results and stores the pieces in an array as strings
		// then stores the array in another array
		// returns array of arrays containing data pieces for each result
		var dataArray = [];
		var tempResult = [];
		var batch; // will store arrays returned from the getRange() call
		var batchSize = 1000; // ask for batches of 1000 (maximum for getRange)

		// get the data from each column for each record returned by the search
		var startIndex = 0,
			endIndex = batchSize;
		do {
			batch = searchResults.getRange(startIndex, endIndex);
			startIndex = endIndex;
			endIndex += batchSize;

			for (var i = 0; i < batch.length; i++) { // cycles over records in current batch array
				for (var j = 0; j < searchResults.columns.length; j++) { // cycles through each column
					var tempString = getDataItem(batch[i], j);
					tempResult.push(tempString);
				}
				dataArray.push(tempResult);
				tempResult = [];
			}
		} while (batch.length == endIndex - startIndex); // NEED TO TEST numRecords % 1000 = 0

		return dataArray;
	}

	function getDataItem(result, columnNum) { // accepts search.Result, integer
		// when using getValue(), some search results are returned as IDs - getText() grabs the text behind the IDs
		// but returns null when the result is not an ID. Then getValue() is called on the result instead.
		var tempString = result.getText({
			name: result.columns[columnNum]
		});
		if (tempString == null) {
			return result.getValue({
				name: result.columns[columnNum]
			});
		};
		return tempString;
	}
	
});


var chart = new Chartist.Line('#chart2', {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  series: [
    [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
    [4,  5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
    [5,  3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
    [3,  4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3]
  ]
}, {
	height: '200px',
	width: '300px',
  low: 0
});

// Let's put a sequence number aside so we can use it in the event callbacks
var seq = 0,
  delays = 80,
  durations = 200;

// Once the chart is fully created we reset the sequence
chart.on('created', function() {
  seq = seq;
});

// On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
chart.on('draw', function(data) {
  seq++;

  if(data.type === 'line') {
    // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
    data.element.animate({
      opacity: {
        // The delay when we like to start the animation
        begin: seq * delays + 1000,
        // Duration of the animation
        dur: durations,
        // The value where the animation should start
        from: 0,
        // The value where it should end
        to: 1
      }
    });
  } else if(data.type === 'label' && data.axis === 'x') {
    data.element.animate({
      y: {
        begin: seq * delays,
        dur: durations,
        from: data.y + 100,
        to: data.y,
        // We can specify an easing function from Chartist.Svg.Easing
        easing: 'easeOutQuart'
      }
    });
  } else if(data.type === 'label' && data.axis === 'y') {
    data.element.animate({
      x: {
        begin: seq * delays,
        dur: durations,
        from: data.x - 100,
        to: data.x,
        easing: 'easeOutQuart'
      }
    });
  } else if(data.type === 'point') {
    data.element.animate({
      x1: {
        begin: seq * delays,
        dur: durations,
        from: data.x - 10,
        to: data.x,
        easing: 'easeOutQuart'
      },
      x2: {
        begin: seq * delays,
        dur: durations,
        from: data.x - 10,
        to: data.x,
        easing: 'easeOutQuart'
      },
      opacity: {
        begin: seq * delays,
        dur: durations,
        from: 0,
        to: 1,
        easing: 'easeOutQuart'
      }
    });
  } else if(data.type === 'grid') {
    // Using data.axis we get x or y which we can use to construct our animation definition objects
    var pos1Animation = {
      begin: seq * delays,
      dur: durations,
      from: data[data.axis.units.pos + '1'] - 30,
      to: data[data.axis.units.pos + '1'],
      easing: 'easeOutQuart'
    };

    var pos2Animation = {
      begin: seq * delays,
      dur: durations,
      from: data[data.axis.units.pos + '2'] - 100,
      to: data[data.axis.units.pos + '2'],
      easing: 'easeOutQuart'
    };

    var animations = {};
    animations[data.axis.units.pos + '1'] = pos1Animation;
    animations[data.axis.units.pos + '2'] = pos2Animation;
    animations['opacity'] = {
      begin: seq * delays,
      dur: durations,
      from: 0,
      to: 1,
      easing: 'easeOutQuart'
    };

    data.element.animate(animations);
  }
});

// For the sake of the example we update the chart every time it's created with a delay of 10 seconds
chart.on('created', function() {
  if(window.__exampleAnimateTimeout) {
    clearTimeout(window.__exampleAnimateTimeout);
    window.__exampleAnimateTimeout = null;
  }
  window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 12000);
});

