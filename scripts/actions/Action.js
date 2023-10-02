const {sellPlayer} = require('./sellPlayer');
const {signPlayer} = require('./signPlayer');
const {setLineup} = require('./setLineup');
const {handleOffer} = require('./handleOffer');

const Action = (type, props) => {
    if(type === 'sell'){ return ({execute: async () => {console.log(`Selling ${props.name}`); await sellPlayer(props.driver, props.name )}, log: () => {console.log(`Selling ${props.name}`);}});}
    // else if(type === 'substitute'){ return ({execute: () => {console.log(`Substitute  ${props.main} for ${props.sub}`)}, log: () => {console.log(`Substitute  ${props.main} for ${props.sub}`)}});}
    else if(type === 'sign'){ return ({execute:async () => {console.log(`Sign ${props.name} for ${props.price}`); await signPlayer(props.driver, props.name, props.price )}, log: () => {console.log(`Sign ${props.name} for ${props.price}`)}});}
    else if(type === 'acceptOffer'){ return ({execute: async () => {console.log(`Accept offer ${props.name}`); await handleOffer(props.driver, props.offer) }, log: () => {console.log(`Accept offer ${props.name}`)}});}
    else if(type === 'rejectOffer'){ return ({execute: () => {console.log(`Reject offer ${props.name}`)}, log: () => {console.log(`Reject offer ${props.name}`)}});}
    else if(type === 'setLineup'){ return ({execute: async () => {console.log(`Set lineup`); await setLineup(props.driver, props.lineup)}, log: () => {console.log(`Set lineup`)}});}
};

module.exports = {Action}
