<?php
// READ BARCODE
if (isset($_GET['op']) && $_GET['op'] == 'barcode') {
    $command = escapeshellcmd('./devices_script/scanner/readBarCode.py');
    $output = shell_exec('python ' . $command); 
    if(!isset($output)|| (strpos($output, 'error')>=0 && strpos($output, 'error') !== false) || $output == "\n"){
        if($output == "\n"){
            echo json_encode(['result'=>false, 'data'=>'Error while reading bar code']);
        }else{
            echo json_encode(['result'=>false, 'data'=>$output]);
        }
    }else{
        echo json_encode(['result'=>true, 'data'=>$output]);
    }
} 

// READ MRZ
else if (isset($_GET['op']) && $_GET['op'] == 'info') {
    $command = escapeshellcmd('./devices_script/scanner/getUserData.py');
    $output = shell_exec('python ' . $command.' '.$_GET['type'] );
    if(!isset($output)|| (strpos($output, 'error')>=0 && strpos($output, 'error') !== false )){
        if($output == null){
            echo json_encode(['result'=>false, 'data'=>'Error while reading OCR code']);
            return;
        }else{
            echo json_encode(['result'=>false, 'data'=>$output]);
            return;
        }
    }
    if (isset($output)) {
        $list = explode(' ', $output);
        echo json_encode(['result'=>true, 'data'=>$list]);
    } else {
        echo json_encode(['result'=>false, 'data'=>'Error while reading user data']);
    }
} 

//PRINT RECEIPT
else if (isset($_POST['op']) && $_POST['op'] == 'print') {
    // echo $_GET['name'].','. $_GET['nation'].','. $_GET['sex'].','. $_GET['code'];
    $command = escapeshellcmd('./devices_script/printer/printer.py');
    $output = shell_exec('python ' . $command . ' ' . $_POST['name'] . ' ' .  $_POST['room']);
    
    // echo 'recived:'.$output;

    if(!isset($output)|| (strpos($output, 'error')>=0 && strpos($output, 'error') !== false)){
        echo json_encode(['result'=>false, 'data'=>$output]);
    }else{
        echo json_encode(['result'=>true, 'data'=>$output]);
    }
} 

// SAVE USER DATA
else if (isset($_POST['op']) && $_POST['op'] == 'saveData') {
    $data = [$_POST['name'], $_POST['sex'],$_POST['date'], $_POST['nation'], $_POST['code'], $_POST['room']];
    // open csv file for writing
    $f = @fopen($_SERVER['DOCUMENT_ROOT'] . '/demo_uptek/memory/client-info.csv', 'a');

    if ($f === false) {
        echo json_encode(['result'=>false, 'data'=>'Error while opening file client-info.csv']);
        return;
    }

    $write = fputcsv($f, $data);
    if (!$write) {
        echo json_encode(['result'=>false, 'data'=>'Error while writing on client-info.csv']);
    }
    // close the file
    fclose($f);
    echo json_encode(['result'=>true, 'data'=>''.$_POST['room']]);

} 

// SAVE IMAGE
else if (isset($_POST['op']) && $_POST['op'] == 'saveImage') {

    $title = str_replace(' ', '', $_POST['name']);
    $imgData = str_replace(' ', '+', $_POST['image']);
    $imgData =  substr($imgData, strpos($imgData, ",") + 1);
    $imgData = base64_decode($imgData);

    // Path where the image is going to be saved
    $filePath = $_SERVER['DOCUMENT_ROOT'] . '/demo_uptek/memory/client-pictures/' . $title . '.jpeg';
    // Write $imgData into the image file
    $file = @fopen($filePath, 'w');

    if ($file === false) {
        echo json_encode(['result'=>false, 'data'=>'Error while opening file '.$filePath]);
        return;
    }

    $write = fwrite($file, $imgData);
    if (!$write) {
        echo json_encode(['result'=>false, 'data'=>'Error while saving client photo']);
        return;
    }
    fclose($file);
    echo json_encode(['result'=>true, 'data'=>'']);
}
