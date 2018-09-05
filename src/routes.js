import React from 'react';
function isLogin(nextState, replace) {
    // console.log(nextState);
    // replace('/')
}
const routerConfig = [{
    path: '/',
    onEnter: isLogin,
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./routes/index/home_layout').default)
        }, 'home_layoutJs')
    },
    indexRoute: {
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('./routes/index/home').default)
            }, 'homeJs')
        },
    }
}, {
  path: '/chatBoxLogo',
  getComponent(nextState, cb){
    require.ensure([], (require) => {
      cb(null, require('./routes/chatBoxLogo/chatBoxLogo').default)
    }, "chatBoxLogoJs")
  }
}, {
    path: '*',
    getComponent(nextState, cb){
        require.ensure([], (require) => {
            cb(null, require('./routes/not_found').default)
        }, "notFound")
    }
}];

export default routerConfig;