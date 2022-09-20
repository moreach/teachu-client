import { TogetherUserProfileDTO } from "./TogetherUserProfileDTO";

export interface TogetherAskOverviewDTO {
  openAsks: TogetherUserProfileDTO[];
  sentAsks: TogetherUserProfileDTO[];
}