<?php

if (isset($_GET['op']) && $_GET['op']== 'barcode') {
    $command = escapeshellcmd('./devices_script/scanner/readBarCode.py');
    $output = shell_exec('python ' . $command);
    echo $output;
    
} else if (isset($_GET['op']) && $_GET['op']== 'info') {
    $command = escapeshellcmd('./devices_script/scanner/getUserData.py');
    $output = shell_exec('python ' . $command);
    $list = explode(' ',$output);
    echo json_encode($list);

} else if (isset($_GET['op']) && $_GET['op']== 'print') {
    echo $_GET['name'];
    // echo $_GET['name'].','. $_GET['nation'].','. $_GET['sex'].','. $_GET['code'];
    $command = escapeshellcmd('./devices_script/printer/printer.py');
    $output = shell_exec('python ' . $command.' ' . $_GET['name'].' '.  $_GET['nation']);
    echo $output;
}
