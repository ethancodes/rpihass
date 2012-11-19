<?php

$cmd = 'lessc less/rpihass.less > css/rpihass.css';
$output = shell_exec($cmd);
if ($output != "") {
  echo $output .  chr(10).chr(10);
}

?>
