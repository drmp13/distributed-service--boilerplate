SET search_path TO public;

create table users
(
username varchar primary key,
password varchar
);

insert into users values ('toster','toster');
