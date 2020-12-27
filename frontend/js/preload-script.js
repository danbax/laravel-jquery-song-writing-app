var isLogged = false;


/**
 * is user logged
 */
if (!!$.cookie('token')) {
    // have cookie
    isLogged = true;
} 



$( document ).ready(function() {
if(isLogged){
    $("#not-logged-menu").hide();
    $("#logged-menu").show();
  }else{
    $("#logged-menu").hide();
    $("#not-logged-menu").show();
  }
  
});

/**
 * get url params
 */

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};


function loadjs(file) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = file;
    script.onload = function(){
        alert("Script is ready!"); 
        console.log(test.defult_id);
    };
    document.body.appendChild(script);
 }

 


  /** create languages select */
 var languages = ["russian","italian","german","french","swedish","english","afrikaans","albanian","bulgarian"
 ,"catalan","czech","danish","estonian","finnish","hungarian","greek","kazakh","indonesian"
 ,"latvian","lithuanian","macedonian","norwegian","polish","portuguese","romanian","serbian","slovak","slovenian",
 "spanish","turkish","ukrainian","vietnamese","hebrew","arabic"];

var urlParams = new URLSearchParams(window.location.search);
var languageSelected = urlParams.get('language')
if(jQuery.inArray(languageSelected,languages) === -1) {
    languageSelected = "english";
}

 var languagesSelectHtml = "";
 $.each(languages, function( index, value ) {
    languagesSelectHtml += "<option value='"+value+"'";
    if(value ==  languageSelected){
        languagesSelectHtml+= " selected ";
    }
    languagesSelectHtml += ">"+value+"</option>";
  });

  $("#changeLanguageSelect").html(languagesSelectHtml);

 

  var languageFile = 'js/language/'+languageSelected+'.js';
  var languageRhymesFile = 'js/languages/'+languageSelected+'.js';
  
  
  
$( document ).ready(function() {
[languageFile,languageRhymesFile].forEach(function(src) {
    var script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.head.appendChild(script);

    
    script.onload = function(){
        $("#page-title").text(language['index_title']);
        //intro
        $("#welcome").text(language['welcome']);
        $("#intro-text").html(language['intro_text']);
        $("#writeSong").text(language['writeSong']);
        $("#login").text(language['login']);
        $("#searchInput").attr("placeholder",language['searchText']);
        $("#html-tag").attr("dir",language['direction']);

        //menu
        $("#header-my-songs").text(language['header_mySongs']);
        $("#logout-button").text(language['header_logout']);
        $("#header-login").text(language['login']);
        $("#header-change-language, .change-language").text(language['changeLanguage']);

        //add song
        $("#selectNameButton").text(language['smd_writeSong']);
        $("#song-modal-close").text(language['smd_close']);
        $("#select-song-name").text(language['smd_selectSongName']);
        $("#addSongMenu").text(language['smd_addSong']);
        $("#songName").attr("placeholder",language['smd_songName']);

        $("#songNameH3").text(language['addSong_writeSong']);
        $("#songText").attr("placeholder",language['addSong_textAreaPlaceHolder']);
        $("#language-errors").text(language['language_errors']);
        $("#language-ok").text(language['language_ok']);


        $("#loadingRhymesText").text(language['loadingRhymesText']);
        $("#language-errors-modal").text(language['language_errors']);
        $("#language-ok-modal").text(language['language_ok']);

        // login
        $("#login-title").text(language['login_title']);
        $("#email").attr("placeholder",language['login_email']);
        $("#password").attr("placeholder",language['login_password']);
        $("#loginButton").text(language['login_loginButton']);

        
        $("#signup-title").text(language['signup']);
        $("#signup-email").attr("placeholder",language['login_email']);
        $("#signup-name").attr("placeholder",language['first_name']);
        $("#signup-password").attr("placeholder",language['login_password']);
        $("#signup-button").text(language['signup_button']);
        $("#header-signup").text(language['signup']);
        
        $("#loading-spinner").hide();
        $("#body").show();
    };

    });
});
