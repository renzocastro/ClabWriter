<?php
include('resize-class.php');

/** 
 * Converts human readable file size (e.g. 10 MB, 200.20 GB) into bytes. 
 * http://www.php.net/manual/es/function.filesize.php#92418
 *
 * @param string $str 
 * @return int the result is in bytes 
 * @author Svetoslav Marinov 
 * @author http://slavi.biz 
 */ 
function filesize2bytes($str) { 
    $bytes = 0; 

    $bytes_array = array( 
        'B' => 1, 
        'KB' => 1024, 
        'MB' => 1024 * 1024, 
        'GB' => 1024 * 1024 * 1024, 
        'TB' => 1024 * 1024 * 1024 * 1024, 
        'PB' => 1024 * 1024 * 1024 * 1024 * 1024, 
    ); 

    $bytes = floatval($str); 
	if( substr(strtoupper($str),-1) != 'B' ){
		$str .= 'B';
	}

    if (preg_match('#([KMGTP]?B)$#si', $str, $matches) && !empty($bytes_array[$matches[1]])) { 
        $bytes *= $bytes_array[$matches[1]]; 
    } 

    $bytes = intval(round($bytes, 2)); 

    return $bytes;
} 

ini_set('memory_limit', '200000000'); // 200M
$max_upload = ini_get('upload_max_filesize');
$max_post   = ini_get('post_max_size');
$file_limit = min(filesize2bytes($max_upload), filesize2bytes($max_post));

$data = array(
	'file_is_valid' => false
);

if( isset($_POST['upload_imgur']) && isset($_FILES['imgur']) )
{
	$file = $_FILES['imgur'];
	$data['file_is_valid'] = true;

	$file_type = $file['type'];
	$type_is_valid = preg_match('/^image\/((?:p)?jp(?:e)?g|(?:x\-)?png|gif)$/', $file_type);
	$size_is_valid = ($file['size'] < $file_limit);
	
	$data['type_is_valid'] = $type_is_valid;
	$data['size_is_valid'] = $size_is_valid;

	if( !$type_is_valid || !$size_is_valid )
	{
		break;
	} 

	list($img_width, $img_height, $img_type, $img_attr) = getimagesize($file['tmp_name']);

	$resizeObj = new resize( $file['tmp_name'], $file_type );
	if( $img_width > 600 ){
		$resizeObj->resizeImage(600, null, 'landscape');
	}
	$image = $resizeObj->getImage(80);

	// http://api.imgur.com/examples#uploading_php
		// $data is file data
	    $pvars   = array('image' => base64_encode($image), 'key' => '2aacc973e4c4087b2f6544f35f00bb34');
	    $timeout = 30;
	    $curl    = curl_init();

	    curl_setopt($curl, CURLOPT_URL, 'http://api.imgur.com/2/upload.json');
	    curl_setopt($curl, CURLOPT_TIMEOUT, $timeout);
	    curl_setopt($curl, CURLOPT_POST, 1);
	    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	    curl_setopt($curl, CURLOPT_POSTFIELDS, $pvars);
	    $json = curl_exec($curl);
	    curl_close ($curl);
    //--
    
    echo $json;
    exit;
}
echo json_encode($data);
?>