import express from 'express';
import {connection as mariadb} from '../mariadb.js';

const router = express.Router();
/**
 * 해야 할 것
 * 1.좋아요 기능에 트랜잭션
 * 2.이미 좋아요 눌렀으면 못하는 기능(로그인 기능이 있어야 함)
 *  └ 로그인 기능 직접 해보자.
 * 3. 순위 리스트
*/

/*
-- restaurant.res_kakao_map_data definition

CREATE TABLE restaurant.res_kakao_map_data (
  ID varchar(20) NOT NULL COMMENT 'KAKAO_MAP_DATA의ID',
  SCORE decimal(9,0) DEFAULT '0' COMMENT '점수',
  REG_USER_NO decimal(9,0) NOT NULL DEFAULT '1' COMMENT '등록사용자번호',
  REG_DTTM datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록번호',
  ALT_USER_NO decimal(9,0) DEFAULT NULL COMMENT '수정사용자번호',
  ALT_DTTM datetime DEFAULT NULL COMMENT '수정일시',
  PRIMARY KEY (ID)
)
COMMENT='KAKAO_MAP_DATA에 추가정보를 넣는다.'
ENGINE=InnoDB 
;
*/

/**
 * 1. kakao API에서 가져온 kakaoMapData의 id를 RES_KAKAO_MAP_DATA에 저장한다. ( 이미 저장된 경우 무시 )
 * 2. ID로 SCORE 데이터를 조회하여 kakaoMapData에 넣어 같이 반환한다.
 */
router.post('/getKakaoListWithScore', (req, res, next) => {
    console.log('req url : /pharmacy/getKakaoListWithScore');
    
    let kakaoMapData = req.body.kakaoMapData;
    let kakaoMapDataIdList = [];
    // mariadb.connect();
    for(let i=0; i<kakaoMapData.length; i++) {
        let id = kakaoMapData[i].id;
        
        let sql1 = 'INSERT IGNORE RES_KAKAO_MAP_DATA(ID) VALUES(?);';
        let datas1 = [id];
        mariadb.query(sql1, datas1, (error, rows, fields) => {
            if (error) throw error;
        });

        kakaoMapDataIdList.push(id);
    }

    let sql2 = 'SELECT ID, SCORE FROM RES_KAKAO_MAP_DATA WHERE ID IN (?);';
    let datas2 = [kakaoMapDataIdList];
    let execSql = mariadb.query(sql2, datas2, (error, rows, fields) => {
        if (error) throw error;

        for (let i=0; i<kakaoMapData.length; i++) {
            for (let j=0; j<rows.length; j++) {
                if (kakaoMapData[i].id == rows[j].ID) {
                    kakaoMapData[i].score = rows[j].SCORE;
                    break;
                }
            }

        }
        res.status(200).json(kakaoMapData);
    });
    
    // mariadb.end();
});



/**
 * id로 RES_KAKAO_MAP_DATA 조회하여 score를 수정한다.
 */
router.post('/modifyKakaoScore', (req, res, next)=>{
    console.log('req url : /pharmacy/modifyKakaoScore');

    let reqBody = req.body;
    let id = reqBody.id;
    let score = reqBody.score;

    let sql = 'UPDATE RES_KAKAO_MAP_DATA SET SCORE = ? WHERE ID = ?';
    let datas = [score, id];
    let execSql = mariadb.query(sql, datas, (error, rows, fields) =>{
        if (error) throw error;

        res.status(200).json("success");
    });
});

export default router;