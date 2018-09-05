/**
 * Created by xiaolei on 2018/4/18.
 */
import request from '../util/request';

export async function editChatboxList(parmas) {
  return request({
    url: '/chatbot/manager/Perusal',
    method: "POST",
    data: { ...parmas }
  });
}

export async function editChatboxListDetail(parmas) {
  return request({
    url: '/chatbot/manager/Perusal',
    method: "GET",
    data: { ...parmas }
  });
}

export async function getChatbotLogoList(parmas) {
  return request({
    url: '/chatbot/manager/Logs',
    method: "GET",
    data: { ...parmas }
  });
}

export async function getChatbotList(parmas) {
  return request({
    url: '/chatbot/manager/List',
    method: "GET",
    data: { ...parmas }
  });
}

export async function getChatBoxQuestion(parmas) {
  return request({
    url: '/chatbot/manager/UserInterviewList',
    method: "GET",
    data: { ...parmas }
  });
}

export async function getAnswerFile(parmas) {
  return request({
    method: "GET",
    url: '/chatbot/manager/mp3text',
    data: { ...parmas }
  })
}

export async function viewSubmitDetail(params) {
  return request({
    url: '/chatbot/manager/detail',
    method: 'GET',
    data: { ...params }
  })
}

export async function handlerSubmitPublic(parmas) {
  return request({
    url: '/chatbot/manager/publish',
    method: 'POST',
    data: { ...parmas }
  })
}

export async function getOilCoupon(params) {
  return request({
    project: 'yxcat-yyh-server',
    url: 'yyh/giftCouponTemp',
    data: { ...params }
  })
}