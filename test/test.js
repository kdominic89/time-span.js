const assert = require('assert');

const TimeSpan = require('../time-span');


describe('TimeSpan', function() {
    describe('.parse(new TimeSpan())', function() {
        const ts = new TimeSpan();
        it(`should return ${ts.milliseconds}`, function() {
            assert.equal(ts, 0);
        });
    });

    describe('.parse(new Date())', function() {
        const date = new Date();
        it(`should return ${date.getTime()}`, function() {
            assert.equal(TimeSpan.parse(date), date.getTime());
        });
    });

    describe('.parse(42)', function() {
        it('should return 42', function() {
            assert.equal(TimeSpan.parse(42), 42);
        });
    });

    describe(`.parse('1d 2h 3min 4s 5ms')`, function() {
        it('should return 93784005 (1*24*60*60*1000 2*60*60*1000 + 3*60*1000 + 4*1000 + 5)', function() {
            assert.equal(TimeSpan.parse('1d 2h 3min 4s 5ms'), 93784005);
        });
    });
    
    describe(`.parse({ d: 1, h: 2, min: 3, s: 4, ms: 5 })`, function() {
        it('should return 93784005 (1*24*60*60*1000 2*60*60*1000 + 3*60*1000 + 4*1000 + 5)', function() {
            assert.equal(TimeSpan.parse({ d: 1, h: 2, min: 3, s: 4, ms: 5 }), 93784005);
        });
    });

    
    describe(`.parse()`, function() {
        it(`should throw an error (Parameter 'timeSpan' could not be parsed to a Number.)`, function() {
            assert.throws(() => TimeSpan.parse(), Error);
        });
    });
    
    describe(`.parse(null)`, function() {
        it(`should throw an error (Parameter 'timeSpan' could not be parsed to a Number.)`, function() {
            assert.throws(() => TimeSpan.parse(null), Error);
        });
    });
    
    describe(`.parse('something wrong')`, function() {
        it(`should throw an error [Parameter 'timeSpan' must be a String like '0d 0h 0min 0s 0ms' (parts are optional)]`, function() {
            assert.throws(() => TimeSpan.parse('something wrong'), Error);
        });
    });
    

    describe('.TO_SECOND', function() {
        it('should return 1000', function() {
            assert.equal(TimeSpan.TO_SECOND, 1000);
        });
    });

    describe('.TO_MINUTE', function() {
        it('should return 60000 (60*1000)', function() {
            assert.equal(TimeSpan.TO_MINUTE, 60*1000);
        });
    });

    describe('.TO_HOUR', function() {
        it('should return 3600000 (60*60*1000)', function() {
            assert.equal(TimeSpan.TO_HOUR, 60*60*1000);
        });
    });

    describe('.TO_DAY', function() {
        it('should return 86400000 (24*60*60*1000)', function() {
            assert.equal(TimeSpan.TO_DAY, 24*60*60*1000);
        });
    });
});


describe(`new TimeSpan('42min')`, function() {
    const ts = new TimeSpan('42min');

    describe(`.milliseconds`, function() {
        it('should return 2520000', function() {
            assert.equal(ts.milliseconds, 2520000);
        });
    });

    describe(`.seconds`, function() {
        it('should return 2520', function() {
            assert.equal(ts.seconds, 2520);
        });
    });

    describe(`.minutes`, function() {
        it('should return 42', function() {
            assert.equal(ts.minutes, 42);
        });
    });

    describe(`.hours`, function() {
        it('should return 0.7', function() {
            assert.equal(ts.hours, 0.7);
        });
    });

    describe(`.days`, function() {
        it('should return 0.029166666666666667', function() {
            assert.equal(ts.days, 0.029166666666666667);
        });
    });

    describe(`.object`, function() {
        it('should return { d: 0, h: 0, min: 42, s: 0, ms: 0 }', function() {
            assert.deepEqual(ts.object, { d: 0, h: 0, min: 42, s: 0, ms: 0 });
        });
    });


    describe(`.add('42min')`, function() {
        it('should return this (.minutes == 84)', function() {
            assert.equal(ts.add('42min').minutes, 84);
        });
    });
    
    describe(`.sub('42 min')`, function() {
        it('should return this (.minutes == 42)', function() {
            assert.equal(ts.sub('42 min').minutes, 42);
        });
    });

    
    describe(`.inRange('1h')`, function() {
        it(`should return true (0 <= <this->'42min'> <= '1h')`, function() {
            assert.equal(ts.inRange('1h'), true);
        });
    });
    
    describe(`.inRange('1h', '30min')`, function() {
        it(`should return true ('30min' <= <this->'42min'> <= '1h')`, function() {
            assert.equal(ts.inRange('1h', '30min'), true);
        });
    });
    
    describe(`.inRange('30min')`, function() {
        it(`should return false (0 <= <this->'42min'> <= '30min')`, function() {
            assert.equal(ts.inRange('30min'), false);
        });
    });
    
    describe(`.inRange('1h', '45min')`, function() {
        it(`should return false ('45min' <= <this->'42min'> <= '1h')`, function() {
            assert.equal(ts.inRange('1h', '45min'), false);
        });
    });


    describe(`.valueOf()`, function() {
        it('should return 2520000', function() {
            assert.equal(ts.valueOf(), 2520000);
        });
    });

    describe(`.toString()`, function() {
        it(`should return '0d 0h 42min 0s 0ms'`, function() {
            assert.equal(ts.toString(), '0d 0h 42min 0s 0ms');
        });
    });

    describe(`.toJSON()`, function() {
        it(`should return '0d 0h 42min 0s 0ms'`, function() {
            assert.equal(ts.toJSON(), '0d 0h 42min 0s 0ms');
        });
    });
});


describe(`new TimeSpan('1d 2h 3min 4s 5ms')`, function() {
    const ts = new TimeSpan('1d 2h 3min 4s 5ms');

    describe(`.milliseconds`, function() {
        it('should return 93784005', function() {
            assert.equal(ts.milliseconds, 93784005);
        });
    });

    describe(`.seconds`, function() {
        it('should return 93784.005', function() {
            assert.equal(ts.seconds, 93784.005);
        });
    });

    describe(`.minutes`, function() {
        it('should return 1563.06675', function() {
            assert.equal(ts.minutes, 1563.06675);
        });
    });

    describe(`.hours`, function() {
        it('should return 26.0511125', function() {
            assert.equal(ts.hours, 26.0511125);
        });
    });

    describe(`.days`, function() {
        it('should return 1.0854630208333333', function() {
            assert.equal(ts.days, 1.0854630208333333);
        });
    });

    describe(`.object`, function() {
        it('should return { d: 1, h: 2, min: 3, s: 4, ms: 5 }', function() {
            assert.deepEqual(ts.object, { d: 1, h: 2, min: 3, s: 4, ms: 5 });
        });
    });


    describe(`.add('1d 2h 3min 4s 5ms')`, function() {
        it('should return this (.object == { d: 2, h: 4, min: 6, s: 8, ms: 10 })', function() {
            assert.deepEqual(ts.add('1d 2h 3min 4s 5ms').object, { d: 2, h: 4, min: 6, s: 8, ms: 10 });
        });
    });
    
    describe(`.sub({ d: 1, h: 2, min: 3, s: 4, ms: 5 })`, function() {
        it('should return this (.object == { d: 1, h: 2, min: 3, s: 4, ms: 5 })', function() {
            assert.deepEqual(ts.sub({ d: 1, h: 2, min: 3, s: 4, ms: 5 }).object, { d: 1, h: 2, min: 3, s: 4, ms: 5 });
        });
    });

    
    describe(`.inRange('2d')`, function() {
        it(`should return true (0 <= <this->'1d 2h 3min 4s 5ms'> <= '2d')`, function() {
            assert.equal(ts.inRange('2d'), true);
        });
    });
    
    describe(`.inRange('2d', '1d')`, function() {
        it(`should return true ('1d' <= <this->'1d 2h 3min 4s 5ms'> <= '2d)'`, function() {
            assert.equal(ts.inRange('2d', '1d'), true);
        });
    });
    
    describe(`.inRange('1d')`, function() {
        it(`should return false (0' <= <this->'1d 2h 3min 4s 5ms'> <= '1d')`, function() {
            assert.equal(ts.inRange('1d'), false);
        });
    });
    
    describe(`.inRange('2d', '1d 12h')`, function() {
        it(`should return false ('1d 12h' <= <this->'1d 2h 3min 4s 5ms'> <= '2d')`, function() {
            assert.equal(ts.inRange('2d', '1d 12h'), false);
        });
    });


    describe(`.valueOf()`, function() {
        it('should return 93784005', function() {
            assert.equal(ts.valueOf(), 93784005);
        });
    });

    describe(`.toString()`, function() {
        it(`should return '1d 2h 3min 4s 5ms'`, function() {
            assert.equal(ts.toString(), '1d 2h 3min 4s 5ms');
        });
    });

    describe(`.toJSON()`, function() {
        it(`should return '1d 2h 3min 4s 5ms'`, function() {
            assert.equal(ts.toJSON(), '1d 2h 3min 4s 5ms');
        });
    });
});
