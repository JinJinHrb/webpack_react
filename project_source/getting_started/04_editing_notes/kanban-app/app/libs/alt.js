import Alt from 'alt';
//import chromeDebug from 'alt-utils/lib/chromeDebug';

const alt = new Alt();
//chromeDebug(alt);
alt.dispatcher.register(console.log.bind(console));

export default alt;