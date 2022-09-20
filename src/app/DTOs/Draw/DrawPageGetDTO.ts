export interface DrawPageGetDTO {
    pageId: string;
    dataUrl: string;
    editable: boolean;
    deletable: boolean;
    editingPersonProfileImagePath: string | null;
    editingPersonName: string | null;
    isEmpty: boolean;
}