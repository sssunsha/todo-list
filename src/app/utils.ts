import {Md5} from "ts-md5";

export function generateMd5Hash(data: string): string {
    return Md5.hashStr(data).toString();
}

export function generateCreatedAt(): string {
    const date = new Date();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

}

export function updateArrayData(array: Array<any>, data: any, isAdd: boolean): void {
    if (isAdd) {
        array.push(data);
    } else {
        array = array.map(d => {
            if (d !== data) {
                return d;
            }
        })
    }
    array =  Array.from(new Set(array));
}