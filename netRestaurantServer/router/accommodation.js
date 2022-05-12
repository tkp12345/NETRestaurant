import express from 'express';
import Map from '../model/map.js';

const router = express.Router();

router.post('/getGood', (req, response, next) => {
    Map.find( { "mapId" : req.body.mapId, "userId" : req.body.userId },(err, res) => {
        response.status(200).json(res);
    } );
});

router.post('/setGood', (req, response, next) => {
    let a = new Map( { "mapId" : req.body.mapId, "userId" : req.body.userId } );

    Map.find( { "mapId" : req.body.mapId, "userId" : req.body.userId },(err, res) => {
        console.log(res.length);
        if( res.length === 0 ){
            a.save();
        }
    } );
    response.status(200).json();
});

router.delete('/delGood', (req, response, next) => {
    console.log(req.body);
    Map.dele
    Map.deleteOne( { "mapId" : req.body.mapId, "userId" : req.body.userId },(err, res) => {
        response.status(200).json();
    } );
});


export default router;