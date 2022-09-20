export interface CreateUpsertSetHeaderDTO {
    id: string;
    name: string;
    description: string;
    subjectMain: number;
    subjectSecond: number | null;
    setPolicy: number;
    isEditable: boolean;
    isPolicyEditable: boolean;
}