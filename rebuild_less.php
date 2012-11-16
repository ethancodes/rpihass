<?php

$cmd = 'lessc less/rpihass.less > css/rpihass.css';
$output = shell_exec($cmd);
echo $output;
echo chr(10).chr(10);

?>