;
! function(window, undefined) {

    /**
     * 默认策略
     * @type {Object}
     */
    var strategies = {
        isNonEmpty: function(value, errorMsg) {
            if (value === '') {
                return errorMsg;
            }
        },
        minLength: function(value, length, errorMsg) {
            if (value.length < length) {
                return errorMsg;
            }
        },
        isMobile: function(value, errorMsg) {
            if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
                return errorMsg;
            }
        }
    };


    var HJformcheck = {
        version: '0.0.1',
        cache: [],
        add: function() {
            var self = this;
            for (var i = 0, rule; rule = rules[i++];) {
                (function(rule) {
                    var strategyAry = rule.strategy.split(':');
                    var errorMsg = rule.errorMsg;
                    self.cache.push(function() {
                        var strategy = strategyAry.shift();

                        strategyAry.unshift(dom.value);
                        strategyAry.push(errorMsg);
                        return strategies[strategy].apply(dom, strategyAry);
                    });
                })(rule)
            }
        },
        start: function() {
            for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
                var errorMsg = validatorFunc();
                if (errorMsg) {
                    return errorMsg;
                }
            }
        }

    };



    window.HJformcheck = HJformcheck;
}(window);