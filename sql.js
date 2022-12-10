let sql = require('mysql');
//require : npm으로 설치된 Module을 사용할 때 사용하는 함수

let cn = sql.createConnection({
    //연결할 DB에 관련된 정보
    host : "localhost",
    user : "root",
    password : "password",
    database : "test_db"
})

cn.connect((e)=>{
    if(e) throw e;
    //connect 결과가 Error라면 throw를 통해 error로 보내준다.
    console.log('DB 연결 성공')
})


//DB에 테이블 생성
let sqlTable = "CREATE TABLE user (id int, password varchar(45), name varchar(45), nick varchar(45), email varchar(45), gender varchar(45), Primary key(id))"
cn.query(sqlTable,(e)=>{
    if(e) throw e;
    console.log('테이블 생성 완료');
})
