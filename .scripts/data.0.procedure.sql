CREATE DEFINER = `user` @`%` PROCEDURE `$data`()
BEGIN DROP TABLE IF EXISTS $data;
CREATE TABLE $data ($columnList) ENGINE = InnoDB;

/**run-on-deploy call $data(); */
END