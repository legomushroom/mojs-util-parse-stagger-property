import parseStaggerProperty from '../src/parse-stagger-property.babel.js';

// TODO:
//  - refactor to `stagger.map`/`stagger.fucntion` when the `stagger` module is up

describe('`parseStaggerProperty` ->', function () {
  it('should parse `array` values', function () {
    var array = [11, 20, 13, 45, 25];
    var map = [array[0], array[1], array[2], array[3], array[4]];
    map.__mojs__isStaggerMap = true;

    for (var i = 0; i < 3 * array.length; i++) {
      expect(parseStaggerProperty(map, i)).toBeDefined();
      expect(parseStaggerProperty(map, i)).toBe(array[i % array.length]);
    }
  });

  it('should parse `function` values', function () {
    var coef = Math.random();

    var fun = function(index) {
      return index*coef;
    };

    fun.__mojs__isStaggerFunction = true;

    for (var i = 0; i < 22; i++) {
      expect(parseStaggerProperty(fun, i)).toBeDefined();
      expect(parseStaggerProperty(fun, i)).toBe(i*coef);
    }
  });

  it('should parse `function` values #totalItemsInStagger', function () {
    var coef = Math.random();

    var fun = function(index, total) {
      return (index * coef) / total;
    };

    fun.__mojs__isStaggerFunction = true;

    for (var i = 0; i < 22; i++) {
      expect(parseStaggerProperty(fun, i, 5)).toBeDefined();
      expect(parseStaggerProperty(fun, i, 5)).toBe((i * coef) / 5);
    }
  });

  it('should parse plain `function` values', function () {
    var coef = Math.random();

    var fun = function(index) {
      return index*coef;
    };

    for (var i = 0; i < 22; i++) {
      expect(parseStaggerProperty(fun, i)).toBe(fun);
    }
  });

  it('should parse `single` values', function () {
    for (var i = 0; i < 20; i++) {
      var prop = Math.random();
      expect(parseStaggerProperty(prop, i)).toBeDefined();
      expect(parseStaggerProperty(prop, i)).toBe(prop);
    }
  });

  it('should parse `stagger` values #in map', function () {
    const fun1 = (index) => {
      return index * 20;
    };

    const fun2 = (index) => {
      return index * 50;
    };

    fun1.__mojs__isStaggerFunction = true;
    fun2.__mojs__isStaggerFunction = true;

    var value = [fun1, fun2];

    value.__mojs__isStaggerMap = true;

    expect(parseStaggerProperty(value, 0)).toBe(0);
    expect(parseStaggerProperty(value, 1)).toBe(50);
    expect(parseStaggerProperty(value, 2)).toBe(40);
    expect(parseStaggerProperty(value, 3)).toBe(150);
  });

  it('should parse `stagger` values #in function', function () {
    const fun = (index) => {
      const map = [1, 2, 4, 5];
      map.__mojs__isStaggerMap = true;

      return map;
    };

    fun.__mojs__isStaggerFunction = true;

    expect(parseStaggerProperty(fun, 0)).toBe(1);
    expect(parseStaggerProperty(fun, 1)).toBe(2);
    expect(parseStaggerProperty(fun, 2)).toBe(4);
    expect(parseStaggerProperty(fun, 3)).toBe(5);
  });
});
