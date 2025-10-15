export const updateObjectInArray = (items: any, itemId: any, objPropName: any, objNewProps: any) => {
    return items.map(i => {
            if (i[objPropName] === itemId) {
                return {...i, ...objNewProps};
            }
            return i;
        }
    )
}