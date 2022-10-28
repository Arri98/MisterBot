const Action = (type, props) => {
    if(type === 'sell'){ return ({execute: () => {console.log(`Selling ${props.name}`)}});}
    else if(type === 'substitute'){ return ({execute: () => {console.log(`Substitute  ${props.main} for ${props.sub}`)}});}
    else if(type === 'sign'){ return ({execute: () => {console.log(`Sign ${props.name} for ${props.price}`)}});}
    else if(type === 'putToMain'){ return ({execute: () => {console.log(`Put to main ${props.name}`)}});}
    else if(type === 'acceptOffer'){ return ({execute: () => {console.log(`Accept offer ${props.name}`)}});}
    else if(type === 'rejectOffer'){ return ({execute: () => {console.log(`Reject offer ${props.name}`)}});}
};

module.exports = {Action}
