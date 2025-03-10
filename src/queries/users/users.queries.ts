
export const findUserByEmailQuery = `
  SELECT * FROM usuario WHERE email = $1
`;

export const findUserByEmailQueryRol = `
   SELECT usuario.*, rol.rol
  FROM usuario 
  LEFT JOIN rol ON usuario.id_rol = rol.id_rol
  WHERE usuario.email = $1
`;
export const updatePassword = `
UPDATE usuario 
SET contrasena = $1 
WHERE id_usuario = $2 
RETURNING *;
`;

export const findUserByIdQuery = `
  SELECT * FROM usuario WHERE id_usuario = $1
`;

export const createUser = `
  INSERT INTO usuario (
    nombre,
    primer_apellido,
    segundo_apellido,
    movil,
    email,
    id_multimedia,
    id_rol,
    codigo_activacion,
    id_colegio,
    id_estado,
    contrasena
  )
  VALUES (
    $1,   -- nombre
    $2,   -- primer_apellido
    $3,   -- segundo_apellido
    $4,   -- movil
    $5,   -- email
    $6,   -- id_multimedia
    $7,   -- id_rol
    $8,   -- codigo_activacion
    $9,   -- id_colegio
    $10,  -- id_estado
    $11   -- contrasena
  );
`;


