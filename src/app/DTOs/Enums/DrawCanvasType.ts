import { KeyValue } from "@angular/common";
import { getCanvasStandardColor } from "src/app/Framework/Helpers/CanvasHelper";

export type DrawCanvasType = 'Draw' | 'Line' | 'Text' | 'Erase';

export function getDrawCanvasType() {
    let types: KeyValue<DrawCanvasType, number>[] = [
        { key: 'Draw', value: 1 },
        { key: 'Line', value: 2 },
        // { key: 'Text', value: 3 },
        { key: 'Erase', value: 4 }
    ];
    return types;
}

export function getDrawCanvasTypeWithIcons() {
    let types: KeyValue<DrawCanvasType, string>[] = [
        { key: 'Draw', value: 'edit' },
        { key: 'Line', value: 'minimize' },
        // { key: 'Text', value: 'text_fields' },
        { key: 'Erase', value: 'delete' }
    ];
    return types;
}

export function getDrawCanvasTypeByValue(value: number) {
    let types = getDrawCanvasType();
    let type = types.find(x => x.value == value);
    return type ? type.key : null;
}

export function getDrawCanvasColors() {
    const standard = getCanvasStandardColor();
    return [
        { key: 'Standard', value: standard },
        { key: 'White', value: 'white' },
        { key: 'Grey', value: 'grey' },
        { key: 'Yellow', value: 'yellow' },
        { key: 'Orange', value: 'orange' },
        { key: 'Red', value: 'red' },
        { key: 'Pink', value: 'pink' },
        { key: 'Purple', value: 'purple' },
        { key: 'Green', value: 'green' },
        { key: 'Blue', value: 'blue' },
        { key: 'Brown', value: 'brown' },
        { key: 'Black', value: 'black' },
    ] as KeyValue<string, string>[];
}