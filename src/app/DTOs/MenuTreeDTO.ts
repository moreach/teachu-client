export interface MenuTreeDTO {
    tree: MenuTreeItemDTO[];
}

export interface MenuTreeItemDTO {
    titleTranslationKey?: string;
    translatedTitle?: string;
    icon: string;
    leave: boolean;
    url?: string;
    children?: MenuTreeItemDTO[];
}