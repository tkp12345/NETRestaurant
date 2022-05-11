import express from 'express';
import Map from '../model/map.js';

const router = express.Router();

router.post('/getGood', (req, response, next) => {
    console.log(req.body);
    Map.find( { "mapId" : req.body.mapId, "userId" : req.body.userId },(err, res) => {
        response.status(200).json(res);
    } );
});

router.post('/setGood', (req, response, next) => {
    console.log(req.body);
    let a = new Map( { "mapId" : req.body.mapId, "userId" : req.body.userId } );
    a.save();
    response.status(200).json();
});

router.delete('/delGood', (req, response, next) => {
    console.log(req.body);

    Map.deleteOne( { "mapId" : req.body.mapId, "userId" : req.body.userId },(err, res) => {
        response.status(200).json();
    } );
});


export default router;