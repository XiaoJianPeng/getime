const {
  post
} = require('./axios-utils')
const qs = require('qs')
const converter = require('html-to-markdown')
const fs = require('fs')
const {
  log
} = require('./log4js');


const header_config = {
  'Content-Type': 'application/json',
  Host: 'time.geekbang.org'
}
const url1 = 'https://time.geekbang.org/serv/v1/article'
const url2 = 'https://time.geekbang.org/column/article'
const url3 = 'https://time.geekbang.org/serv/v1/column/articles'
const Cookie = '_ga=GA1.2.599103124.1569156879; LF_ID=1584327865793-7884681-2455271; GCID=a0c61b9-f229637-f7f5b91-c7d4f37; GRID=a0c61b9-f229637-f7f5b91-c7d4f37; _gid=GA1.2.945582963.1585209103; GCESS=BAYERknztgwBAQUEAAAAAAkBAQMEL198XgcETA50AQEERuIUAAoEAAAAAAIEL198XgsCBAAIAQMEBAAvDQA-; gksskpitn=8ad5546a-c88e-45c4-929f-356a9c2abe7b; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1585215326,1585277185,1585277268; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1585277312; _gat=1;'

let serverId = 'SERVERID=3431a294a18c59fc8f5805662e2bd51e|'
const loginTime = '|1585290183;'


/**
 * 获取文章目录列表
 */
const get_article_list = async () => {
  const data = {
    cid: 48,
    size: 100,
    prev: 0,
    order: 'earliest',
    sample: false
  }
  header_config.Referer = url2 + '/181'
  let SERVERID = serverId + Date.now() + loginTime
  header_config.Cookie = Cookie + SERVERID;
  var result = await post(url3, data, header_config)
  let list = result.data.data.list.map(x => {
    return {
      id: x.id,
      article_title: x.article_title
    }
  })
  return list
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
    let markdown = converter.convert(content);
    if (content) {
      save(markdown, filename)
    }
    log.info('文件保存成功')
  } catch (error) {
    console.error(error)
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

/**
 * 批量任务执行入口
 */
const start = async () => {
  log.info('开始时间：', Date.now())
  let list = await get_article_list()
  log.info('列表获取成功：=========')

  let promiseeList = []
  list.forEach(x => {
    if (x.id > 10604) {
      promiseeList.push(get_article_content(x.id,
        x.article_title.replace(' ', '').replace('|', '').replace('/', '&')))
    }
  })
  log.info('promiseeList', promiseeList.length)
  Promise.all(promiseeList)
  log.info('结束时间：', Date.now())
}

// const start = async () => {
//   log.info('开始时间：', Date.now())
//   let list = await get_article_list()
//   log.info('列表获取成功：=========')

//   list.forEach(x => {
//     setTimeout(() => {
//       get_article_content(x.id, x.article_title.replace(' ', '').replace('|', ''))
//     }, 3000);

//   })

//   log.info('结束时间：', Date.now())
// }

get_article_content(12486, '89 程序员练级攻略：UI&UX设计')
// start()