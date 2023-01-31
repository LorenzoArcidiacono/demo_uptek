<?php

if (isset($_GET['op']) && $_GET['op']== 'barcode') {
    $command = escapeshellcmd('../scanner_script/readBarCode.py');
    $output = shell_exec('python ' . $command);
    echo $output;
} else if (isset($_GET['op']) && $_GET['op']== 'info') {
    $command = escapeshellcmd('../scanner_script/getUserData.py');
    $output = shell_exec('python ' . $command);
    $list = explode(' ',$output);
    echo json_encode($list);
}
