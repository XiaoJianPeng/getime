const {
  get,
  post
} = require('./axios-utils')
const qs = require('qs')
const converter = require('html-to-markdown')
const fs = require('fs')

const header_config = {
  'Content-Type': 'application/json',
  Cookie: '_ga=GA1.2.599103124.1569156879; LF_ID=1584327865793-7884681-2455271; GCID=a0c61b9-f229637-f7f5b91-c7d4f37; GRID=a0c61b9-f229637-f7f5b91-c7d4f37; gksskpitn=712608bf-ab16-4a39-888a-1dd437e824e5; _gid=GA1.2.945582963.1585209103; GCESS=BAYERknztgwBAQUEAAAAAAkBAQMEL198XgcETA50AQEERuIUAAoEAAAAAAIEL198XgsCBAAIAQMEBAAvDQA-; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1585215326; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1585215354; SERVERID=1fa1f330efedec1559b3abbcb6e30f50|1585235077|1585235076; _gat=1',
  Host: 'time.geekbang.org'
}
const url1 = 'https://time.geekbang.org/serv/v1/article'
const url2 = 'https://time.geekbang.org/column/article'
const url3 = 'https://time.geekbang.org/serv/v1/column/articles'

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

    let result = await post(url1, data, header_config)
    let content = result.data.data.article_content
    let markdown = converter.convert(content);
    if(content){
      save(markdown, filename)
    }
    console.log('文件保存成功')
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
  const path = '左耳听风'
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  fs.writeFile('./左耳听风/' + filename + '.md', fileData, function (error) {
    if (error) {
      console.log('写入失败', error)
    } else {
      console.log('写入成功',filename)
    }
  })
}

// const start = async () => {
//   console.log('开始时间：', Date.now())
//   let list = await get_article_list()
//   console.log('列表获取成功：=========')

//   let promiseeList = []
//   list.forEach(x => {
//     promiseeList.push(get_article_content(x.id, x.article_title.replace(' ','').replace('|','')))
//   })
//   console.log('promiseeList', promiseeList.length)
//   Promise.all(promiseeList)
//   console.log('结束时间：', Date.now())
// }

const start = async () => {
  console.log('开始时间：', Date.now())
  let list = await get_article_list()
  console.log('列表获取成功：=========')

  list.forEach(x => {
    setTimeout(() => {
      get_article_content(x.id, x.article_title.replace(' ', '').replace('|', ''))
    }, 3000);

  })

  console.log('结束时间：', Date.now())
}

// get_article_content(181, 'aaa')
start()
