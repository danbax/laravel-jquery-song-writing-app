<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class SongController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if(!User::isValidToken($request)){
            $message = "The token is invalid";
            $code = 403;
            return ApiController::errorResponse($message, $code);
        }
        $user = User::getUser();

        $message = "";
        $songs = Song::where("user_id",$user->id)->first();
        if($songs){
            $code = 200;
            return ApiController::successResponse($songs);
        }else{
            $code="100";
            $message = "אין תוצאות";
        }

        
        return ApiController::errorResponse($message);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * input: email,token,name
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(!UserController::isValidToken($request)){
            $message = "The token is invalid";
            $code = 403;
            return ApiController::errorResponse($message,$code);
        }
        $user = UserController::getUser($request);

        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            $messages = "";
            if ($messages->has('name'))
            {
                $message = "שם השיר הוא שדה חובה";
            }
            return ApiController::errorResponse($message);
        }

        $isSuccess = Song::create([
        'name'      => $request->get('name'),
        'user_id'     => $user->id,
        'text'  => "",
        'language'  => ""
        ]);


        if($isSuccess){
            return ApiController::successResponse($isSuccess);
        }else{
            $message = "תקלה בבסיס הנתונים";
            return ApiController::errorResponse($message);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function show(Song $song)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function edit(Song $song)
    {
        
    }

    
    
    /**
     * get songs.
     *
     * input: token, clientId
     */
    public function getSongs(Request $request)
    {
        
        if(!UserController::isValidToken($request)){
            $message = "The token is invalid";
            $code = 403;
            return ApiController::errorResponse($message);
        }
        $user = UserController::getUser($request);

        $songs = DB::table('songs')
                ->where('user_id', '=', $user->id)
                ->where('is_deleted', '=', 0)
                ->get();

        return ApiController::successResponse($songs);
    }

    
    
    /**
     * get songs.
     *
     * input: token, clientId
     */
    public function getSong(Request $request)
    {
        
        if(!UserController::isValidToken($request)){
            $message = "The token is invalid";
            $code = 403;
            return ApiController::errorResponse($message);
        }
        $user = UserController::getUser($request);

        $songs = DB::table('songs')
                ->where('user_id', '=', $user->id)
                ->where('is_deleted', '=', 0)
                ->where('id', '=', $request->get("songId"))
                ->first();

        return ApiController::successResponse($songs);
    }
    

    
    public function deleteSong(Request $request)
    {
        if(!UserController::isValidToken($request)){
            $message = "The token is invalid";
            $code = 403;
            return ApiController::errorResponse($message,$code);
        }
        $user = UserController::getUser($request);

        $song = Song::whereId($request->get("songId"))->first();
        if(!$song){
            // song id error
            $message = "לא קיים שיר כזה";
            return ApiController::errorResponse($message);
        }
        if($song->user_id != $user->id){
            // auth error
            $message = "השיר לא שייך לך";
            return ApiController::errorResponse($message);
        }

        echo $song;
        $song->is_deleted=true;
        $song->save();

        return ApiController::successResponse($song);
    }
    /**
     * Update the specified resource in storage.
     *
     * input: songId,email,token, name, text
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        
        if(!UserController::isValidToken($request)){
            $message = "The token is invalid";
            $code = 403;
            return ApiController::errorResponse($message,$code);
        }
        $user = UserController::getUser($request);

        $song = Song::whereId($request->get("songId"))->first();
        if(!$song){
            // song id error
            $message = "לא קיים שיר כזה";
            return ApiController::errorResponse($message);
        }
        if($song->user_id != $user->id){
            // auth error
            $message = "השיר לא שייך לך";
            return ApiController::errorResponse($message);
        }

        echo $song;
        $song->name=$request->name;
        $song->text=$request->text;
        $song->save();

        return ApiController::successResponse($song);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function destroy(Song $song)
    {
        //
    }
}
