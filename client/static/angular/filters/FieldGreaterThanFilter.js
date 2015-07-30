var FieldGreaterThanFilter = function () {
    return function (input, field, greaterThan) {
        var filtered = [];
        for (var i in input) {
            if (input[i][field] > 0) {
                filtered.push(input[i]);
            }
        }
        return filtered;
    };
}
