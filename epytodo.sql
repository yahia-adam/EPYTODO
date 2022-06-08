CREATE DATABASE epytodo;

use epytodo;

CREATE TABLE `epytodo`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `firstname` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE `epytodo`.`todo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `due_time` DATETIME NOT NULL,
  `status` VARCHAR(45) NULL DEFAULT '\"not started\"',
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `epytodo`.`todo`
ADD INDEX `users_id_idx` (`user_id` ASC) VISIBLE;
ALTER TABLE `epytodo`.`todo`
ADD CONSTRAINT `users_id`
  FOREIGN KEY (`user_id`)
  REFERENCES `epytodo`.`user` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
