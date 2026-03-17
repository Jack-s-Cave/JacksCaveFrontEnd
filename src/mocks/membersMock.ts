import { Member } from "types/members";

export const currentMembersMock: Member[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: `Miembro ${index + 1}`,
  image: null,
  description: "Descripción del miembro que se cargará desde la base de datos..."
}))

export const previousMembersMock: Member[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: `Miembro Anterior ${index + 1}`,
  image: null,
  description: "Descripción del miembro anterior que se cargará desde la base de datos..."
}))
