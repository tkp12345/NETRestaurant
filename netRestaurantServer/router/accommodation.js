import express from 'express';
import map from '../model/map.js';

const router = express.Router();

router.post('/getGood', (req, res, next) => {
    map.find( { mapId : req.params.mapId, userId : req.params.userId },(err, res) =>{
        res.status(200).json(res);
    } );
});


export default router;