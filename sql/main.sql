create database taller;
use taller;
-- ROLES Y PERMISOS
create table Permiso(
	ID integer primary key auto_increment,
    Nombre varchar(30) not null
);

create table Rol(
	ID integer primary key auto_increment,
    Nombre varchar(30) not null
);

create table RolPermiso(
	ID_Rol integer not null,
    ID_Permiso integer not null,
    NivelAcceso tinyint not null,
	constraint RolPermiso_ID_Rol foreign key (ID_Rol) references Rol(ID)
		on delete cascade
        on update cascade,
	constraint Rol_Permiso_ID_Permiso foreign key (ID_Permiso) references Permiso(ID)
		on delete cascade
        on update cascade
);

-- USUARIO
 
create table Usuario(
	ID integer primary key auto_increment,
    ID_Rol integer, 
    Usuario varchar(30) not null,
    Nombre varchar(50),
    Apellido varchar(50),
    Contrasena varchar(100) not null,
    constraint Usuario_ID_Rol foreign key (ID_Rol) references Rol(ID)
        on delete set null
        on update cascade
    
);


-- CLIENTE
create table cliente(
    ID integer primary key auto_increment,
    Nombre varchar(50) not null,
    Apellido varchar(50) ,
    Direccion varchar(100),
    TipoCliente enum('Persona', 'Empresa') not null,
    fechaRegistro datetime
);

create table telefono(
    ID_Cliente integer,
    telefono varchar(20) not null,
    constraint foreign key (ID_Cliente) references cliente(ID),
    primary key (ID_Cliente, telefono)
);



-- Servicios

create table Categoria(
	ID integer primary key auto_increment,
    nombre varchar(50)
);




create table Servicios(
	ID integer primary key auto_increment,
    ID_Clasificacion integer,
    Nombre varchar(50),
    Descripcion varchar(255),
    constraint Servicios_ID_Clasificacion foreign key (ID_Clasificacion) references Categoria(ID)
        on delete set null
        on update cascade
)

