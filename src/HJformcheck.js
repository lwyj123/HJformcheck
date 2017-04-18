class HJformcheck {

    constructor() {
        this.cache = [];
    }

    add(dom, rules) {
        //兼容jquery
        let mydom = dom;
        if(jQuery && dom instanceof jQuery) {
            mydom = dom[0];
        }

        let self = this;
        for (let i = 0, rule; rule = rules[i++];) {
            (function(rule) {
                let strategyAry = rule.strategy.split(':');
                let errorMsg = rule.errorMsg;
                self.cache.push(function() {
                    let strategy = strategyAry.shift();

                    strategyAry.unshift(mydom.value);
                    strategyAry.push(errorMsg);
                    return HJformcheck.strategies[strategy].apply(mydom, strategyAry);
                });
            })(rule)
        }
    }
    start() {
        for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
            let errorMsg = validatorFunc();
            if (errorMsg) {
                return errorMsg;
            }
        }        
    }
    /**
     * extend strategies
     * @param  {String} strategyName    the name of this strategy
     * @param  {Function} strategy      the strategy
     * @return {Boolean} add strategy successed or not(already have or bad format)
     */
    extend(strategyName, strategy) {
        HJformcheck.strategies[strategyName] = strategy;
    }

}


HJformcheck.version = "0.1";
HJformcheck.strategies = {
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
    maxLength: function(value, length, errorMsg) {
        if (value.length > length) {
            return errorMsg;
        }
    },
    isMobile: function(value, errorMsg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg;
        }
    },
    isEmail: function(value, errorMsg) {
        if(!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value)){
            return errorMsg;
        }
    },
    isSame: function(value, value2, errorMsg) {
        if (value != length) {
            return errorMsg;
        }
    },        

};


export default HJformcheck;
