import $ from 'jquery'
import arr from './greeter'
import '../css/main.css'

$('h1').css({backgroundColor: '#fa0'})

const box2 = $('.box2')
class Dog {
  constructor(name){
    this.name = name
  }
  sayName(){
    return this.name
  }
}
const dog = new Dog('旺财22')
const dogName = dog.sayName()
$('button').on('click', function () {
  box2.text(dogName)
})

console.log(arr);