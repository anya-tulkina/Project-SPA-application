export const updateObjectInArray = (items, itemId, objPropName, objNewProps) => {
    return items.map(i => {
            if (i[objPropName] === itemId) {
                return {...i, ...objNewProps};
            }
            return i;
        }
    )
}