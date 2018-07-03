// import _ from 'lodash';
import './style.css';
import {
    cube
} from './main.js'
// import printMe from './print.js'

function component() {
    // var element = document.createElement('div');
    // var btn = document.createElement('button');
    // btn.innerHTML = 'Click me and check the console';
    // btn.onclick = printMe;
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    // element.classList.add('hello');
    // const myIcon = new Image();
    // myIcon.src = Icon;
    // element.appendChild(myIcon);
    // element.appendChild(btn);
    // console.log(Data);
    var element = document.createElement('pre');
    element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n');
    return element;
}
document.body.appendChild(component());
// let element = component();
// document.body.appendChild(element);
// console.log(module.hot);
// if (module.hot) {
//     module.hot.accept('./print.js', function () {
//         console.log('Accepting the updated printMe module!');
//         printMe();
//         document.body.removeChild(element);
//         element = component();
//         document.body.appendChild(element);
//     })
// }