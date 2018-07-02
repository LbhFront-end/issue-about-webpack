import _ from 'lodash';
import './style.css';
import Icon from './yeoman.png';
import Data from './data.xml';
import printMe from './print.js'
function component(){
    var element = document.createElement('div');
    var btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console';
    btn.onclick = printMe;
    element.innerHTML = _.join(['Hello','webpack'],' ');
    element.classList.add('hello');
    const myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);
    element.appendChild(btn);
    console.log(Data);
    return element;
}
document.body.appendChild(component());