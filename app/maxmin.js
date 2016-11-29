function maxmin(tab) {
	var min = Number.MAX_VALUE;
	var max = Number.MIN_VALUE;

	for(var i = 0; i < tab.length; i++) {
		min = Math.min(min, tab[i]);
		max = Math.max(max, tab[i])
	};

	var result = [min];

	if(min != max)
		result.push(max);

	return result;
}

module.exports = maxmin;