export const getAllRols = `
  SELECT * FROM rol;
`;
export const getMultimediaById = `
  SELECT * FROM multimedia where id_multimedia=?;
`;
export const insertIntoMultimedia = `
INSERT INTO multimedia (
  enlace,
  tipo,
  nombre
) 
VALUES ($1, $2, $3)
RETURNING id_multimedia;
`;

