
//дженерик определяется при вызове, сейчас это массив
export const updateObjectInArray = <T>(
    items: T[],
    itemId: any,
    objPropName: keyof T,
    objNewProps: Partial<T>): T[] => {
    return items.map(item => {
            if (item[objPropName] === itemId) {
                return {...item, ...objNewProps};
            }
            return item;
        }
    )
}