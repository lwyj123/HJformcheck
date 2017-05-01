# HJformcheck
华击工程表单检验组件，现代码已升级到es6

# Install

```javascript
<script src="HJformcheck.js"></script>
```

# Usage
### HJformcheck.add(dom, rules)

`dom` dom element or jQuery element of input.

`rules` a array of rule.


Example

```js
var validataFunc = function() {

    var validator = new HJformcheck();
    validator.add(email, [{
        strategy: 'isNonEmpty',
        errorMsg: '邮箱不能为空'
    }, {
        strategy: 'minLength:6',
        errorMsg: '邮箱长度不能小于10 位'
    }]);

    validator.add(phone, [{
        custom: '(val) => /[a-z0-9]/.test(val)',
        errorMsg: '不许有小写字母或数字'
    }]);


    var errorMsg = validator.start();
    return errorMsg;
}
registerForm.onsubmit = function() {
    var errorMsg = validataFunc();
    if (errorMsg) {
        alert(errorMsg);
        return false;
    }

};
```
