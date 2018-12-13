import { commonParams, options } from './config'
import axios from 'axios'
import jsonp from './jsonp'

export function getDiscList () {
  const url = 'api/getList'
  const data = Object.assign({}, commonParams, {
    picmid: 1,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29,
    format: 'json'
  })
  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
}

export function getSingerList () {
  const url =
    'https://u.y.qq.com/cgi-bin/musicu.fcg?callback=getUCGI9038205217242072&g_tk=5381&jsonpCallback=getUCGI9038205217242072&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'
  const data = {
    comm: { ct: 24, cv: 10000 },
    singerList: {
      module: 'Music.SingerListServer',
      method: 'get_singer_list',
      param: {
        area: -100,
        sex: -100,
        genre: -100,
        index: -100,
        sin: 0,
        cur_page: 1
      }
    }
  }
  return jsonp(url, options, data)
}
