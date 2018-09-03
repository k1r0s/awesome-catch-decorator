### Awesome @Catch Decorator

`$ npm install awesome-catch-decorator`

### Signature

`Catch(ErrorType: Error, handler: (e) => any)`

> handler result value will replace method's return if exception is raised.

### Usage

```js
import Catch from "awesome-catch-decorator"

class AnyES6Class {
  @Catch(SyntaxError, () => ({}))
  static parseResponse(unvalidatedInputValue) {
    return JSON.parse(unvalidatedInputValue)
  }
}

// will always return an object
AnyES6Class.parseResponse()
AnyES6Class.parseResponse(",,,s,ds,sd,")
AnyES6Class.parseResponse('{ "message": "Okay, I get it" }')
```

### I just want to catch all errors!

```js
import Catch from "awesome-catch-decorator"

// create a new decorator
const CatchAll = Catch(Error, e => console.warn("catched exception: ", e))

class Dummy {
  @CatchAll
  doSomething() {
    undefinedFunction();
  }
}

// no exception will be raised
```

### I just want to catch errors and trigger different actions for each one!

```js
import Catch from "awesome-catch-decorator"

import { CustomError1, CustomError2 } from "./my-errors"

class VerySeriousClass {

  @Catch(CustomError1, handleError1)
  @Catch(CustomError2, handleError2)
  async fetch() {
    await this.mayThrowCustomError1();
    await this.mayRejectCustomError2();
    await this.mayThrowAnyError();
  }
}
```

code above do the following:

- if `mayThrowCustomError1` throws a `CustomError1`, then `handleError1` will be executed

- if `mayRejectCustomError2` returns a promise which rejects with `CustomError2`, then `handleError2` will be executed

- if another kind of exception is raised, lets say a `TypeError`, then __exception will be thrown__.

### How

This library was easily made with [kaop-ts](https://github.com/k1r0s/kaop-ts) with provides hooks to attach behaviors on ES6 classes.

### Credits

[@lukeed](https://twitter.com/lukeed05/status/1035212237957263360) for improving the initial idea.
