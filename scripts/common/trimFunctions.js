
function trimName(name) {
    name = name.replace(/(\r\n|\n|\r)/gm, "").trim().split('svg>');
    name = name[1] ? name[1].trim() : name[0];
    return name;
}

module.exports = {trimName}
