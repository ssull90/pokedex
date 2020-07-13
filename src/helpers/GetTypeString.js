const getTypeString = (type) => {
    let typeString = ''
    let typeLength = type.length;
    type.forEach((type, i) => {
        if (i + 1 === typeLength) {
            typeString = `${typeString} ${type}`;
        } else {
            typeString = `${typeString} ${type}, `;
        }
    })
    return typeString;
}

export default getTypeString;