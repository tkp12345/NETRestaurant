export class AuthController{
    callBackCatch(callback){
        this.callback = callback;
    }
    errorCatch(err){
        this.callback(err);
    }

}