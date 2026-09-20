// Credits shown in the site footer.
//
// Hardcoded on purpose: these are not managed through the CMS, so they can
// only change through a code change.

// Ordered by number of commits on `develop` across the frontend and backend
// repositories (merge commits excluded, each commit resolved to its GitHub
// account), as of 2026-09-19. Re-count and reorder if this needs refreshing.
// Accounts without a known real name are listed by their GitHub handle
// (currently only MEN-GUE). Francis Aguilar (GitHub: faguilarleal) is listed
// here for their commits and is also named in SPECIAL_THANKS below.
export const DEVELOPERS: string[] = [
  'Nils Muralles',
  'Gustavo Gonzalez',
  'Sebastian Huertas',
  'Diego Duarte Slowing',
  'Diego Leiva',
  'María Marta Ramírez Gil',
  'Majo Villafuerte',
  'Francis Aguilar',
  'MEN-GUE',
];

export interface SpecialThanks {
  name: string;
  note: string;
}

export const SPECIAL_THANKS: SpecialThanks[] = [
  {
    name: 'Daniel Rayo',
    note: 'quien diseñó el sitio',
  },
  {
    name: 'Francis Aguilar',
    note: 'presidenta de la asociación de estudiantes durante el ciclo académico 2024, quien impulsó y respaldó el proyecto',
  },
];
