export interface MenuTreeDTO {
    tree: MenuTreeItemDTO[];
}

export interface MenuTreeItemDTO {
    titleTranslationKey?: string;
    translatedTitle?: string;
    icon: string;
    leave: boolean;
    level?: number; // default is 0, used as index in tree depth
    url?: string;
    children?: MenuTreeItemDTO[];
    data?: any; // used for custom data
    isTeachu: boolean;
}