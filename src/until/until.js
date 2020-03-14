
export default function getCurrentPart(id, items) {
    let result;
    for (var i in items) {
        let item = items[i];
        if (item.id == id) {
            result = item;
            break;
        } else if (item.children) {
            result = getCurrentPart(id, item.children);
        }
    }
    return result;
}
