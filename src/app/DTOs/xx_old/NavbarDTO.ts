export interface NavbarDTO {
    rootElements: NavbarItemDTO[];
}


export interface NavbarItemDTO {
    url: string;
    translationKey?: string;
    translation?: string;
    children?: NavbarItemDTO[];
}