const {
  post
} = require('./axios-utils')
const qs = require('qs')
const converter = require('html-to-markdown')
const fs = require('fs')
const {
  log
} = require('./log4js');

//#region 参数
// 头信息配置
const header_config = {
'Host': 'time.geekbang.org',
'Connection': 'keep-alive',
'Content-Length': '58',
'Accept': 'application/json, text/plain, */*',
'Sec-Fetch-Dest': 'empty',
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36',
'Content-Type': 'application/json',
'Origin': 'https://time.geekbang.org',
'Sec-Fetch-Site': 'same-origin',
'Sec-Fetch-Mode': 'cors',
'Referer': 'https://time.geekbang.org/column/article/291',
'Accept-Encoding': 'gzip, deflate, br',
'Accept-Language': 'zh-CN,zh;q=0.9',
}
// 获取文章内容
const url1 = 'https://time.geekbang.org/serv/v1/article'
//头信息 Referer的配置
const url2 = 'https://time.geekbang.org/column/article'
// 获取文章列表
const url3 = 'https://time.geekbang.org/serv/v1/column/articles'
const Cookie = '_ga=GA1.2.599103124.1569156879; LF_ID=1584327865793-7884681-2455271; GCID=a0c61b9-f229637-f7f5b91-c7d4f37; GRID=a0c61b9-f229637-f7f5b91-c7d4f37; gksskpitn=301ee4bc-60e6-4cdf-893a-0ea30d345016; _gid=GA1.2.395141861.1585707133; GCESS=BAwBAQUEAAAAAAoEAAAAAAgBAwEERuIUAAYERknztgsCBAAHBPXLh1IDBNk1hF4CBNk1hF4EBAAvDQAJAQE-; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1585721094,1585722806,1585722819,1585722843; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1585722860; _gat=1;'

let serverId = 'SERVERID=3431a294a18c59fc8f5805662e2bd51e|'
const loginTime = '|1585730784;'

/**
 * 获取文章列表所需的body
 */
const list_data = {
  cid: 116,
  size: 100,
  prev: 0,
  order: "earliest",
  sample: false
}

// 获取文章列表 所使用的id
const id = '/14252'

//#endregion

//#region 处理文章的函数
/**
 * 获取文章目录列表
 */
const get_article_list = async () => {
  try {
    header_config.Referer = url2 + id
    let SERVERID = serverId + Date.now() + loginTime
    header_config.Cookie = Cookie + SERVERID;
    var result = await post(url3, list_data, header_config)
    let list = result.data.data.list.map(x => {
      return {
        id: x.id,
        article_title: x.article_title
      }
    })
    return list
  } catch (error) {
    console.error('列表异常信息：=========', error)
  }

}

/**
 * 请求某一篇的内容
 * @param {*} id
 */
const get_article_content = async (id, filename) => {
  try {
    const data = {
      id,
      include_neighbors: true,
      is_freelyread: true
    }
    header_config.Referer = url2 + '/' + id
    let SERVERID = serverId + Date.now() + loginTime
    header_config.Cookie = Cookie + SERVERID;
    let result = await post(url1, data, header_config)
    let content = result.data.data.article_content
    if (content) {
      let markdown = converter.convert(content);
      save(markdown, filename)
      log.info('文件保存成功')
    }
  } catch (error) {
    log.error('异常信息：=========' + filename, error)
  }

}

/**
 * 保存文件
 * @param {*} fileData
 * @param {*} filename
 */
const save = (fileData, filename) => {
  const path = 'article'
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  fs.writeFile('./article/' + filename + '.md', fileData, function (error) {
    if (error) {
      log.error('写入失败', error)
    } else {
      log.info('写入成功', filename)
    }
  })
}
//#endregion

/**
 * 任务执行入口
 */
const start = async () => {
  log.info('开始时间：', Date.now())
  let list = await get_article_list()
  log.info('列表获取成功：=========', list)
  let promiseeList = []
  list.forEach(x => {
    // 用于目录太多一次获取不完的情况，分多次获取
    // if (x.id > 5612) {
    promiseeList.push(get_article_content(x.id,
      x.article_title.replace(' ', '').replace('|', '').replace('/', '&')))
    // }
  })
  log.info('promiseeList', promiseeList.length)
  Promise.all(promiseeList)
  log.info('结束时间：', Date.now())
}

// 单个文章获取
// get_article_content(291, 'test')

start()
