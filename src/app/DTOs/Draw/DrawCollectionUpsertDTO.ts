export interface DrawCollectionUpsertDTO {
  collectionId: string;
  firstPageId: string | null;
  name: string;
  groupId: string | null;
  drawGroupPolicy: number | null;
}