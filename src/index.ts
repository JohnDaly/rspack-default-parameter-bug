import { Constants } from './constants';

export class Example {
  async someFunction(first, second, third = Constants.Hello) {
    console.log(first, second, third);
  }
}

const A = new Example();
A.someFunction(1, 2);
