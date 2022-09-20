import { FileFrontendDTO } from "../File/FileFrontendDTO";
import { GroupInfoMemberDTO } from "./GroupInfoMemberDTO";

export interface GroupInfoDTO {
  groupId: string;
  name: string;
  description: string;
  profileImage: FileFrontendDTO;
  members: GroupInfoMemberDTO[];
  isUserAdmin: boolean;
}