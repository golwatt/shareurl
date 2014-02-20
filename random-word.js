var lettersArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
    'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
    'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

exports.generate = function () {
	var w = '';
	for (var i = 0; i < 4; i++) {
		var index = Math.round(Math.random() * 26);
		index = (index == 26) ? 25 : index;
        w += lettersArray[index];
	}
	
    return w;
}