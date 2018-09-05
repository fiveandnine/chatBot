const util = {
  checkValue (type,value){
        let mobileReg=/^1[3|4|5|6|8|9][0-9]\d{4,8}$/;
        switch (type){
            case 'mobile':
                return mobileReg.test(value);
                break;
            default:
                return false;
                break;
        }
    },
  formatExperience (begin, end) {
    begin = isNaN(begin) ? 0 : begin;
    end = isNaN(end) ? 0 : end;
    const experienceTexts = [
      `${end}年以内`,
      `${begin}-${end}年`,
      `${begin}年以上`,
      '经验不限',
      `${begin}年`
    ];
    if (begin === 0 && end > 0) {
      return experienceTexts[0];
    }
    if (begin > 0 && end > begin) {
      return experienceTexts[1];
    }
    if (begin > 0 && end == begin) {
      return experienceTexts[4];
    }
    if (begin > 0 && end !== 0) {
      return experienceTexts[2];
    }
    return experienceTexts[3];
  },
  formatDegree(data) {
    const degrees_detail = {
      "86": {
        "id": 86,
        "name": "初中"
      },
      "89": {
        "id": 89,
        "name": "高中"
      },
      "90": {
        "id": 90,
        "name": "中专"
      },
      "92": {
        "id": 92,
        "name": "专升本"
      },
      "4": {
        "id": 4,
        "name": "专科"
      },
      "1": {
        "id": 1,
        "name": "本科"
      },
      "2": {
        "id": 2,
        "name": "硕士"
      },
      "3": {
        "id": 3,
        "name": "博士"
      },
      "6": {
        "id": 6,
        "name": "MBA"
      },
      "94": {
        "id": 94,
        "name": "EMBA"
      },
      "95": {
        "id": 95,
        "name": "MPA"
      },
      "99": {
        "id": 99,
        "name": "其他"
      }
    };
    return degrees_detail[ data ].name
  },
  formatRecruitType (data){
        const recruit_type = {'0':'不限','1':'社招','2':'校招','3':'实习生招聘'}
        return recruit_type[data]
  },
  formatTime (time){
      const _time = new Date(time);
      const year = _time.getFullYear();
      const month = _time.getMonth()+1;
      const day = _time.getDate();
      const hour = _time.getHours();
      const minute = _time.getMinutes();
      const second = _time.getSeconds();
      return year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second
  },
};

export default util