import mongoose from "mongoose"
import { Injectable } from "@nestjs/common"


/**
 *  DTO를 통해서 이런 값이 있을거야 라는 걸 코드에게 알려주고
 * 몽구스를 이용해서 아틀라스와 연결.
 * 몽구스를 이용해서 아틀라스에서 받아 온 데이터를 순환해야 하나?
 * 몽구스 자체 지원 쿼리문을 사용하면 조금 더 간편하게 가능하지 않을까?
 * 유저가 입력한 쿼리(/book?title={UserInputQuery})의 쿼리 값을 이용해서
 * 아틀라스에서 받아온 데이터를 for of문을 이용해서 순환.
 * 각 엘리먼트의 title에 해당하는 vlaue가 쿼리와 같으면, 혹은 쿼리를 포함하고 있다면
 * 해당 엘리먼트를 빈 값으로 초기화 된 배열에 담고, 최종적으로 리턴을 받음.
 * 인스턴스 내부에서 호출된 메서드는, 인스턴스 생성 시 호출되는 특징을 이용해야 하나?
 * 서치, 즉.. 찾는다는 서비스를 위해서 필요한 몽구스의 기능은. 보통 Find()에서 정의할 수 있다.
 * 많은 부분을 구현하려고 하지 말고 Search에 필요한 부분만 취사선택 해서 숏 스코프로 치고 나갈 수 있도록 조합해야 한다.
 */
@Injectable()
export class Mongoose{
  constructor(){}
  connect(){}
  findMany(){}
  insertMany(){}
}