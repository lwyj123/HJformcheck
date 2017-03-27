# HJformcheck
华击工程表单检验组件

# Install

```javascript
<script src="HJformcheck.js"></script>
```

# Usage
### jwt.sign(payload, secretOrPrivateKey, [options, callback])

(Asynchronous) If a callback is supplied, callback is called with the `err` or the JWT.

(Synchronous) Returns the JsonWebToken as string

`payload` could be an object literal, buffer or string. *Please note that* `exp` is only set if the payload is an object literal.

`secretOrPrivateKey` is a string or buffer containing either the secret for HMAC algorithms, or the PEM
encoded private key for RSA and ECDSA.

`options`:

* `blank` (default: `null`)


Example

```js
var validataFunc = function() {
    var validator = HJformcheck;
    validator.add(email, [{
        strategy: 'isNonEmpty',
        errorMsg: '邮箱不能为空'
    }, {
        strategy: 'minLength:6',
        errorMsg: '邮箱长度不能小于10 位'
    }]);

    validator.add(phone, [{
        strategy: 'isNonEmpty',
        errorMsg: '电话不能为空'
    }, {
        strategy: 'minLength:6',
        errorMsg: '电话长度不能小于10 位'
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
