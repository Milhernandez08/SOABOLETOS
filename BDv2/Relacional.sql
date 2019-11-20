CREATE TABLE public.usuario
(
    id serial NOT NULL,
    img_perfil varchar,
    nombre varchar NOT NULL,
    ape_pat varchar NOT NULL,
    ape_mat varchar NOT NULL,
    correo varchar NOT NULL,
    contrasena varchar NOT NULL,
    id_pais integer NOT NULL,
    id_estado integer NOT NULL,
    id_municipio integer NOT NULL,
    direccion varchar NOT NULL,
    telefono varchar NOT NULL,
    rol integer NOT NULL,
    id_lider integer NOT NULL,
    activo integer NOT NULL,
    eliminado integer NOT NULL,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.usuario
    OWNER to admin;

CREATE TABLE public.pais
(
    id serial NOT NULL,
    nombre varchar NOT NULL,
    PRIMARY KEY (id)
    
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.pais
    OWNER to admin;

CREATE TABLE public.estado
(
    id serial NOT NULL,
    id_pais integer NOT NULL,
    nombre varchar NOT NULL,
    PRIMARY KEY (id)
    
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.estado
    OWNER to admin;

CREATE TABLE public.municipio
(
    id serial NOT NULL,
    id_estado integer NOT NULL,
    nombre varchar NOT NULL,
    PRIMARY KEY (id)
    
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.municipio
    OWNER to admin;

CREATE TABLE public.localizacion
(
    id serial NOT NULL,
    id_user integer NOT NULL,
    id_lote integer NOT NULL,
    nombre varchar NOT NULL,
    latitud varchar,
    longitud varchar,
    eliminado integer NOT NULL,
    PRIMARY KEY (id)
    
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.localizacion
    OWNER to admin;

CREATE TABLE public.lote
(
    id serial NOT NULL,
    id_user integer NOT NULL,
    id_pais integer NOT NULL,
    id_estado integer NOT NULL,
    id_municipio integer NOT NULL,
    longitud varchar,
    latitud varchar,
    nombre varchar NOT NULL,
    tipo_suelo varchar NOT NULL,
    uso_suelo varchar NOT NULL,
    eliminado integer NOT NULL,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.lote
    OWNER to admin;

CREATE TABLE public.muestra
(
    id serial NOT NULL,
    id_lote integer NOT NULL,
    id_localizacion integer NOT NULL,
    profundidad integer NOT NULL,
    fecha date NOT NULL,
    clima varchar NOT NULL,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.muestra
    OWNER to admin;

CREATE TABLE public.croma_nn
(
    id serial NOT NULL,
    id_muestra integer NOT NULL,
    ind_oxg integer NOT NULL,
    ind_mat_org integer NOT NULL,
    ind_trans_sust integer NOT NULL,
    ind_n_elem integer NOT NULL,
    ind_romp integer NOT NULL,
    ind_mat_viva integer NOT NULL,
    ind_bio integer NOT NULL,
    ind_pro_n integer NOT NULL,
    veri integer NOT NULL, 
    eliminado integer NOT NULL, 
    nom_img varchar NOT NULL,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.croma_nn
    OWNER to admin;

CREATE TABLE public.identificacion
(
    id serial NOT NULL,
    id_user integer NOT NULL,
    id_muestra integer NOT NULL,
    p_ind_oxg integer NOT NULL,
    p_ind_mat_org integer NOT NULL,
    p_ind_trans_sust integer NOT NULL,
    p_ind_n_elem integer NOT NULL,
    p_ind_romp integer NOT NULL,
    p_ind_mat_viva integer NOT NULL,
    p_ind_bio integer NOT NULL,
    p_ind_pro_n integer NOT NULL,
    c_ind_oxg integer NOT NULL,
    c_ind_mat_org integer NOT NULL,
    c_ind_trans_sust integer NOT NULL,
    c_ind_n_elem integer NOT NULL,
    c_ind_romp integer NOT NULL,
    c_ind_mat_viva integer NOT NULL,
    c_ind_bio integer NOT NULL,
    c_ind_pro_n integer NOT NULL,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.identificacion
    OWNER to admin;
