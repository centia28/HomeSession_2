function maxmin(tab) {
	var min = Number.MAX_VALUE;
	var max = Number.MIN_VALUE;

	min = Math.min.apply(null, tab);
	max = Math.max.apply(null, tab);
	var result = [min];

	if(min != max){
		result.push(max);
	}
	return result;
}

module.exports = maxmin;