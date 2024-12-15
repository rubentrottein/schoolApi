<?php
// Exécuter des commandes système via PHP
echo shell_exec('php bin/console cache:clear --env=prod');
echo shell_exec('composer install --no-dev --optimize-autoloader');
?>
