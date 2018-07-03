import './style.css';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

async function getComponent() {
    var element = document.createElement('div');
    const _ = await
    import ( /* webpackChunkName: "lodash" */ 'lodash');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}
getComponent().then(component => {
    document.body.appendChild(component);
})