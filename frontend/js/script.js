// const
const apiUrl = "http://127.0.0.1:8000/api/";
const siteUrl = "http://localhost/godbapps/dbSongWrite";
var token = "";
var clientId = 0;
var mySongs = [];

var allWindows = "#intro,#login-window,#show_my_data,#addSong,#changeLanguageWindow,#signup-window";
var editSongId = 0;

 var languages = ["russian","italian","german","french","swedish","english","afrikaans","albanian","bulgarian"
 ,"catalan","czech","danish","estonian","finnish","hungarian","greek","kazakh","indonesian"
 ,"latvian","lithuanian","macedonian","norwegian","polish","portuguese","romanian","serbian","slovak","slovenian",
 "spanish","turkish","ukrainian","vietnamese","hebrew","arabic"];

var urlParams = new URLSearchParams(window.location.search);
var languageSelected = urlParams.get('language')
if(jQuery.inArray(languageSelected,languages) === -1) {
    languageSelected = "english";
}


var languageName = languageSelected;




 $( document ).ready(function() {

    /**
     * is user logged
     */
    if (!!$.cookie('token')) {
        // have cookie
        token = $.cookie('token');
        clientId = $.cookie('clientId');


        $(allWindows).hide();
        $("#show_my_data").show("slow");
        
        getMySongs(clientId,token);
    } 


    var wto;
    var songText;
    $('#songText').keyup(function() {
        if(editSongId){
            clearTimeout(wto);
            wto = setTimeout(function() {
                songText = $('#songText').val();                
                $.ajax({
                type: 'POST',
                url: apiUrl+'songs/update',
                dataType: 'json',
                data: { 
                    'clientId':clientId,
                    'token':token,
                    'songId': editSongId,
                    'text': songText
                },
                success: function(answer){
                    console.log(answer);
                    var dt = new Date();
                    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

                   if(answer.status=='Success'){
                       $('#savedText').html('<span style="color:green">'+language["addSong_dataSaved"]+' '+time+'</span>');
                   }
                   else{
                       $('#savedText').html('<span style="color:red">'+language["addSong_dataSaved_error"]+' '+time+'<</span>');
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
        }
      });
     
    $( "#writeSong" ).click(function() {
        editSongId = 0;
        $(allWindows).hide("slow");
        $("#addSong").show("slow");
        
        $.ajaxSetup({
            cache: true
          });

          $.getScript( "js/languages/"+languageName+".js", function( data, textStatus, jqxhr ) {
            console.log( "Load was performed." );
            $("#loadingRhymesText").text("");
          });
    });

    $( "#header-change-language" ).click(function() {
        $(allWindows).hide("slow");
        $("#changeLanguageWindow").show("slow");
    });
    
    
    
    $(document).on("click","#showMore",function() {
            songText = $('#songText').val();
            word = getLastWord(songText);
            $('#rhymesTitle').html(language["addSong_rhymesFor"]+' "'+word+'"');
            $('#rhymesData').html(language["addSong_loading"]);
            $('#rhymesData').html(getRhymes(word,0).join(', '));
    });
    
    
    $( "#mySongs" ).click(function() {
            $(allWindows).hide("slow");
            $("#show_my_data").show("slow");
    });
    
    var wtoRhymes;
    var songText
    var word
    
    $('#songText').keyup(function() {
        songText = $('#songText').val();
		if(songText!=""){
			word = getLastWord(songText);
			$('#rhymesTitle').html(language["addSong_rhymesFor"]+' "'+word+'"');
			$('#rhymesData').html(language["addSong_loading"]);
			var wordsArray = getRhymes(word,30);
                        $('#rhymesData').html(wordsArray.join(', '));
                        if(wordsArray.length > 0){
                                $('#rhymesData').append('<br><a class="btn btn-info" id="showMore"><i class="fa fa-eye"></i></a>');
                        }
		}
      });

      function getMySongs(clientId,token){
        $.ajax({
            type: 'POST',
            url: apiUrl+'songs',
            dataType: "json",
            data: { 
                'token': token,
                'clientId': clientId
            },
            success: function(answer){
            if(answer.status==='Success'){
                console.log(answer);
                var data = answer.data;
                mySongs = [];
                jQuery.each(data, function(index, song) {
                    var songObject = [];
                    songObject["songId"] = song.id;
                    songObject["songName"] = song.name;
                    songObject["text"] = song.text;
                    mySongs.push(songObject);
                });

                var songsHtml = generateSongsList(mySongs);
                $("#songList").html(songsHtml);
            } 
            },
            error: function(jqXHR, exception) {

            }
        });
      }

      if(token && clientId){
        getMySongs(clientId,token);
        }
      
function generateSongsList(songListArray){
    var songId="";
    var songName="";
    var html="";
    songListArray.forEach(function(song) {
        songId = song.songId;
        songName = song.songName;
    html += '<div class="card mx-auto  col-lg-8 col-md-8" id="song'+songId+'">';
   html += '<div class="card-body text-center">';
        html += '<div class="dropdown" style="display: inline-block; float:left; cursor:pointer;">';
          html += '<div id="dropdownMenu2" data-toggle="dropdown" ';
               html += 'aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></div>';

          html += '<div class="dropdown-menu dropdown-primary">';
            html += '<a class="dropdown-item deleteSong" data-id="'+songId+'">'+language["getSong_delete"]+'</a>';
          html += '</div>';
        html += '</div>';
       html += '<h3 class="text-center">'+songName+'</h3>';
       html += '<hr>';
       
    
       html += '<a  class="btn btn-primary editSong" id="editSong'+songId+'" data-id="'+songId+'">'+language["getSong_edit"]+'</a>';
    
  html += '</div>';
html += '</div><br>';
    });
    return html;
}

var searchInput;
$( "#searchInput" ).keyup(function() {
    searchInput = $( this).val();
    if( searchInput === "" ){
        $( "#songList" ).html(generateSongsList(mySongs));
    }
    else{
        var arrayOfSongs = []
        mySongs.forEach(function(song) {
            var songName = song.songName;
            var songText = song.text;
            if(songName.indexOf(searchInput)>=0 || songText.indexOf(searchInput)>=0){
                arrayOfSongs.push(song);
            }
        });
        $( "#songList" ).html(generateSongsList(arrayOfSongs));
    }
})

function getRhymes(word,wordAmount){
	var length = word.length;
	var wordPart;
	var wordsArray = [];
	
	for(var i=0; i<length; i++){
		wordPart = word.substring(i, length);
		//var res = words.filter(el => el.indexOf(wordPart+'#') > -1);
		
		var wordsCount = 0;
		var res = [];
		var wordsArrayLength = words.length;
		for (var j = 0; j < wordsArrayLength; j++) {
			if(words[j].indexOf(wordPart+'#') > -1){
				res.push(words[j]);
				wordsCount++;
				if(wordAmount!=0 && wordsCount > wordAmount){
					j=wordsArrayLength+1;
					i=length+1;
				}
			}
		}
		
		wordsArray = wordsArray.concat(res);
	}
	
	var uniqueWords = [];
	$.each(wordsArray, function(i, el){
		if($.inArray(el, uniqueWords) === -1 && el!==word) uniqueWords.push(el);
	});
	
	$.each(uniqueWords, function(i, el){
		uniqueWords[i] = el.substring(1, el.length-1);
	});
	
	
	return uniqueWords;
}

    $( ".login_btn" ).click(function() {
        $(allWindows).hide("slow");
        $("#login-window").show("slow");
    });

    $( "#header-signup" ).click(function() {
        $(allWindows).hide("slow");
        $("#signup-window").show("slow");
    });


    
    
    $( "#changeLanguage" ).click(function() {
        var languageSelectChange = $( "#changeLanguageSelect" ).val();
        window.location.href = "index.php?language="+languageSelectChange;
    });
    
    
    
    // login
    
    $( "#loginButton" ).click(function() {
        var email=$("#email").val();
        var password=$("#password").val();
        
        var error = "";
        
        if(!password){
            error += language["login_errors_password"]+"<br>";
        }
        if(!email){
            error += language["login_errors_email"]+"<br>";
        }
        
        if(error!=""){
            console.log('personalDataSubmit error');
            $("#errorText").html(error);
            $('#errorModal').modal('show');
        }
        else{
        $.ajax({
            type: 'POST',
            url: apiUrl+'users/login',
            dataType: "json",
            data: { 
                'password': password,
                'email': email
            },
            success: function(answer){
                console.log(answer);
               if(answer.status==='Success'){
                    // move to personal data page
                    answer = answer.data;
                    token = answer.token;
                    clientId = answer.clientId;

                    $.cookie("token", answer.token, { expires : 365,secure  : true  });
                    $.cookie("clientId", answer.clientId, { expires : 365,secure  : true  });
                    
                    $(allWindows).hide("slow");
                    $("#show_my_data").show("slow");
                    
                    $("#not-logged-menu").hide();
                    $("#logged-menu").show();
                    
                    getMySongs(clientId,token);
               }
               else{
                    // user exists
                    $("#errorText").html(language["login_errors_password_or_email_incorrect"]);
                    $('#errorModal').modal('show');
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
        }
    });
    
    
    $( "#logout-button" ).click(function() {
        token = "";
        clientId = "";
        $.cookie("token", "", { expires : 365,secure  : true  });
        $.cookie("clientId", "", { expires : 365,secure  : true  });
        
        $(allWindows).hide("slow");
        $("#intro").show("slow");
        });
    
    // register
    
    $( "#signup-button" ).click(function() {
        $(this).attr("disabled","disabled");

        var email=$("#signup-email").val();
        var password=$("#signup-password").val();
        var name=$("#signup-name").val();
        
        var error = "";
        
        if(!password){
            error += language["login_errors_password"]+"<br>";
        }
        if(!email){
            error += language["login_errors_email"]+"<br>";
        }
        
        if(error!=""){
            console.log('personalDataSubmit error');
            $("#errorText").html(error);
            $('#errorModal').modal('show');
        }
        else{
        $.ajax({
            type: 'POST',
            url: apiUrl+'users',
            dataType: "json",
            data: { 
                'password': password,
                'name': name,
                'email': email
            },
            success: function(answer){
                $(this).removeAttr("disabled","disabled");
               if(answer.status==='Success'){
                    // move to personal data page
                    $(allWindows).hide("slow");
                    $("#login-window").show("slow");
               }
               else{
                    // user exists
                    $("#errorText").html(language["login_errors_password_or_email_incorrect"]);
                    $('#errorModal').modal('show');
               }  
            },
            error: function(jqXHR, exception) {
                $(this).removeAttr("disabled","disabled");
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
        }
    });
    
     $( "#addSongMenu" ).click(function() {
            $('#songNameModal').modal('toggle');
        });
        
        $( "#selectNameButton" ).click(function() {
            
            var language = $('#languageName').val();
            
            // check input
            var songName = $('#songName').val();
            if(!songName){
                alert(language["smd_songNameError"]);
            }
            else{
                $('#songNameModal').modal('toggle');
                $.ajax({
                    type: 'POST',
                    url: apiUrl+'songs/create',
                    dataType:"json",
                    data: { 
                        'name': songName,
                        'clientId':clientId,
                        'token':token
                    },
                    success: function(answer){
                       if(answer.status=='Success'){
                        answer = answer.data;
                        console.log(answer);
                          $(allWindows).hide();
                            editSongId = answer.id
                            
                          $("#songNameH3").html('<i class="fa fa-music"></i>'+ songName);
                          $("#addSong").show();
                          $(".add-song-window").show();
                          
                          $.ajaxSetup({
                            cache: true
                          });

                          $.getScript( "js/languages/"+languageName+".js", function( data, textStatus, jqxhr ) {
                            console.log( "Load was performed." );
                          });
                       }
                       else{
                            $("#errorText").html(language["error_creating_new_song"]);
                            $('#errorModal').modal('show');
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
            }
        });
        
        $(document).on('click','.editSong',function(){
        var songId = $(this).data("id");
        editSongId = songId;
        console.log(editSongId);
        
         $(allWindows).hide('slow');
         $.ajax({
                    type: 'POST',
                    url: apiUrl+'songs/getSong',
                    dataType:"json",
                    data: { 
                        'clientId' : clientId,
                        'token':token,
                        'songId': songId
                    },
                    success: function(answer){
                       if(answer.status=='Success'){
                          var song = answer.data;
                          $("#songNameH3").html('<i class="fa fa-music"></i>'+ song.name);
                          $("#songText").val(song.text);
                          
                          $.ajaxSetup({
                            cache: true
                          });

                          $.getScript( "js/languages/"+languageName+".js", function( data, textStatus, jqxhr ) {
                            console.log( "Load was performed." );
                          });
                       }
                       else{
                            $("#errorText").html(language["error_updating_new_song"]);
                            $('#errorModal').modal('show');
                       }  
                    },
                    error: function(jqXHR, exception) {}
                });
         
         $("#addSong").show('slow');
    });
    
    
    
        $(document).on('click','.deleteSong',function(){
        var songId = $(this).data("id");
        
         $.ajax({
                    type: 'POST',
                    url: apiUrl+'songs/delete',
                    dataType: 'json',
                    data: { 
                        'songId': songId,
                        'clientId': clientId,
                        'token': token
                    },
                    success: function(answer){
                        console.log(answer);
                       if(answer.status=='Success'){
                          $('#song'+songId).hide('slow');
                       }
                       else{
                            // user exists
                            console.log(answer.data);
                            $("#errorText").html(language["error_deleting_new_song"]);
                            $('#errorModal').modal('show');
                       }  
                    },
                    error: function(jqXHR, exception) {
                    console.log('error');
                }
                });
        });
        
        function getLastWord(words) {
            var word;
            var n = words.split(" ");
            if(n[n.length - 1] == ""){
                return n[n.length - 2];
            }
            word = n[n.length - 1];
            word = word.trim();

            return word;
        }

    $('#songText').autosize();
     
     $( "#skipLanguage" ).click(function() {
        $("#pageContent").load("includes/show_my_data.php");
    }); 
});
