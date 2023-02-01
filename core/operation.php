<?php

if (isset($_GET['op']) && $_GET['op'] == 'barcode') {
    $command = escapeshellcmd('./devices_script/scanner/readBarCode.py');
    $output = shell_exec('python ' . $command);
    echo $output;
} else if (isset($_GET['op']) && $_GET['op'] == 'info') {
    $command = escapeshellcmd('./devices_script/scanner/getUserData.py');
    $output = shell_exec('python ' . $command);
    if (isset($output)) {
        $list = explode(' ', $output);
        echo json_encode($list);
    } else {
        echo 'error';
    }
} else if (isset($_POST['op']) && $_POST['op'] == 'print') {
    echo $_GET['name'];
    // echo $_GET['name'].','. $_GET['nation'].','. $_GET['sex'].','. $_GET['code'];
    $command = escapeshellcmd('./devices_script/printer/printer.py');
    $output = shell_exec('python ' . $command . ' ' . $_GET['name'] . ' ' .  $_GET['nation']);
    echo $output;
} else if (isset($_POST['op']) && $_POST['op'] == 'saveData') {
    echo 'sono qui';
    $data = [$_POST['name'], $_POST['sex'], $_POST['nation'], $_POST['code']];
    // open csv file for writing
    $f = fopen($_SERVER['DOCUMENT_ROOT'] .'/memory/client-info.csv', 'a');

    if ($f === false) {
        die('Error opening the file ' . $filename);
    }
    fputcsv($f, $data);
    // close the file
    fclose($f);

} else if (isset($_POST['op']) && $_POST['op'] == 'saveImage') {

    $title = str_replace(' ', '', $_POST['name']);
    echo $title;
    // echo 'image: '.$_POST['image'];
    $imgData = str_replace(' ', '+', $_POST['image']);
    $imgData =  substr($imgData, strpos($imgData, ",") + 1);
    $imgData = base64_decode($imgData);
    // Path where the image is going to be saved
    $filePath = $_SERVER['DOCUMENT_ROOT'] . '/memory/client-pictures/' . $title . '.jpeg';
    // Write $imgData into the image file
    $file = fopen($filePath, 'w');
    fwrite($file, $imgData);
    fclose($file);
}
