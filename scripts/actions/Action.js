const {sellPlayer} = require('./sellPlayer');
const {signPlayer} = require('./signPlayer');
const {setLineup} = require('./setLineup');

const Action = (type, props) => {
    if(type === 'sell'){ return ({execute: () => {console.log(`Selling ${props.name}`); sellPlayer(props.driver, props.name )}});}
    else if(type === 'substitute'){ return ({execute: () => {console.log(`Substitute  ${props.main} for ${props.sub}`)}});}
    else if(type === 'sign'){ return ({execute: () => {console.log(`Sign ${props.name} for ${props.price}`); signPlayer(props.driver, props.name, props.price )}});}
    else if(type === 'acceptOffer'){ return ({execute: () => {console.log(`Accept offer ${props.name}`)}});}
    else if(type === 'rejectOffer'){ return ({execute: () => {console.log(`Reject offer ${props.name}`)}});}
    else if(type === 'setLineup'){ return ({execute: () => {console.log(`Reject offer ${props.name}`); setLineup(props.driver, props.lineup)}});}
};

module.exports = {Action}
