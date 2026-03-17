import { currentMembersMock, previousMembersMock } from "mocks/membersMock";
import { Member } from "types/members";

export const membersService = {
  getCurrentMembers: async (): Promise<Member[]> => {
    return currentMembersMock
  },
  getPreviousMembers: async (): Promise<Member[]> => {
    return previousMembersMock
  }
}
