const mongoose = require('mongoose');

class MongoDB {

  /**
   * * 생성자 함수를 통해 몽고 DB에 접속합니다. 
   * @param {*} serverUrl : 서버 주소
   */
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
    this.schemaMap = new Map();
  }

  async Connect() {
    mongoose.connect(this.serverUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.log('Connected to the database!');
    });
  }

  //* schema에 해당 데이터베이스 삽입.
  InsertSchema(schemaName, schemaDefinition) {
    const { Schema, model} = mongoose;

    const schema = new Schema(schemaDefinition);

    //* 이미 존재하는 컬렉션이 있을 경우 기존 꺼 사용, 아닐 경우 새로 생성합니다.
    const value = model(schemaName, schema, schemaName);

    this.schemaMap.set(schemaName, value);
  }

  //* scehma 가져오기
  GetSchema(schemaName) {
    if (this.schemaMap.has(schemaName) === false) throw new Error(`Don't have key: ${schemaName}`);
    return this.schemaMap.get(schemaName);
  }
}

module.exports = MongoDB