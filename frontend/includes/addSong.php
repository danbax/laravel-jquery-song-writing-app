<?php
session_start();
include "../language/".htmlspecialchars($_SESSION['language'])."/addSong.php";
include '../sqlConnect.php';
$songId = 0;
if(isset($_GET['songId'])){
    $songId= htmlspecialchars($_GET['songId']);
    
    $query = "select name,text from songs where id='$songId'";
    $result = mysqli_query($con, $query);
    $row = mysqli_fetch_array($result);
    $songName = $row['name'];
    $songText = $row['text'];
}
?>




<script>
 $( document ).ready(function() {
     
     
    
 
 <?php 
if(isset($_SESSION['u_id'])){
  ?>
    var wto;
    var songText;
    $('#songText').keyup(function() {
        clearTimeout(wto);
        wto = setTimeout(function() {
            songText = $('#songText').val();
            $.ajax({
            type: 'POST',
            url: 'server/saveSong.php',
            dataType: 'json',
            data: { 
                'songId': <?=$songId?>,
                'songText': songText
            },
            success: function(answer){
                console.log(answer);
                var dt = new Date();
                var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
                
               if(answer.status=='ok'){
                   $('#savedText').html('<span style="color:green"><?=$lang["addSong_dataSaved"]?>'+' '+time+'</span>');
               }
               else{
                   $('#savedText').html('<span style="color:red"><?=$lang["addSong_dataSavedError"]?>'+' '+time+'<</span>');
               }  
            },
            error: function(jqXHR, exception) {
            if (jqXHR.status === 0) {
                console.log('Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404) {
                console.log('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                console.log('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                console.log('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                console.log('Time out error.');
            } else if (exception === 'abort') {
                console.log('Ajax request aborted.');
            } else {
                console.log('Uncaught Error.\n' + jqXHR.responseText);
            }
        }
        });
        }, 1500);
      });
    
    <?php } ?>
    
	  
	  
	  $(document).ready(function() {
			// This WILL work because we are listening on the 'document', 
			// for a click on an element with an ID of #test-element
			
		});
   

});
</script>  
<script>


</script>