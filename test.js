// const {
//   get,
//   post
// } = require("./axios-utils")
// const converter = require('html-to-markdown')
// const fs = require('fs')

// const header_config = {
//   'Content-Type': 'application/json',
//   Cookie: '_ga=GA1.2.599103124.1569156879; LF_ID=1584327865793-7884681-2455271; GCID=a0c61b9-f229637-f7f5b91-c7d4f37; GRID=a0c61b9-f229637-f7f5b91-c7d4f37; gksskpitn=712608bf-ab16-4a39-888a-1dd437e824e5; _gid=GA1.2.945582963.1585209103; GCESS=BAYERknztgwBAQUEAAAAAAkBAQMEL198XgcETA50AQEERuIUAAoEAAAAAAIEL198XgsCBAAIAQMEBAAvDQA-; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1585215326; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1585215354; SERVERID=1fa1f330efedec1559b3abbcb6e30f50|1585215357|1585215327; _gat=1',
//   Host: 'time.geekbang.org',
//   Referer: 'https://time.geekbang.org/column/article/288'
// }

// const get_article_content = async (id, filename) => {
//   try {
//     const data = {
//       id: 288,
//       include_neighbors: true,
//       is_freelyread: true
//     }
//     header_config.Referer = 'https://time.geekbang.org/column/article/183'

//     let result = await post('https://time.geekbang.org/serv/v1/article', data, header_config)
//     let content = result.data.data.article_content
//     // let markdown = converter.convert(content);

//     // save(markdown, filename)
//     console.log("文件保存成功===",  content)
//   } catch (error) {
//     console.error(error)
//   }

// }

// get_article_content(183, 'aaa')

let title = '开篇词  |  洞悉技术的本质，享受科技的乐趣.md'
console.log(title.replace(' ',''))