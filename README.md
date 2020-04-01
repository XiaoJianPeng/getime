### 使用说明

> 本脚本针对即可时间专栏文章内容，批量下载转为md文档。仅供个人学习使用， **请尊重作者著作权，勿再次售卖获取到专栏文档**。

- 首先  安装依赖

  ```
  npm install
  ```

- html转md使用了 `html-to-markdown`库，由于里面转换的格式，存在不生效问题，对转换的`formatters.js`进行了一些修改，所以在使用之前要替换`node_modules`中的 `html-to-markdown`库的`formatters.js`文件

- 若在使用中对格式另有需求，可以修改`formatters.js`文件，替换`node_modules`中的 `html-to-markdown`库的`formatters.js`文件

- **需要修改的参数**:

  - Cookie：对应下图浏览器开发者工具Network部分
    - 注意Cookie中的SERVERID 中间的时间戳字符串会不定期刷新，这里采用每次请求时使用当前时间戳
    - Cookie内不包含serverId内容，需要在请求时会和serverId进行拼接
  - serverId：Cookie中 SERVERID的前面一部分如下图：`SERVERID=1fa1f330efedec1559b3abbcb6e30f50`
  - loinTime： SERVERID的最后一部分如下图中的`|1585707130`，是为账号登录的时间，也可认为是当前用户开始活跃的时间
  - list_data: 文章目录列表的请求： 下图中左侧`articles`请求内容中的 `Request Payload`
  - id： 是你要获取专栏的 任何一篇文章的id ，我使用的是第一篇的id对应 下图 `articele`请求内容中的 `Request Payload`的id

  ![](https://xiao-files.oss-cn-beijing.aliyuncs.com/picgo/微信图片_20200401102629.png)

  ```js
  // 头信息配置
  const header_config = {
    'Content-Type': 'application/json',
    Host: 'time.geekbang.org'
  }
  // 获取文章内容
  const url1 = 'https://time.geekbang.org/serv/v1/article'
  //头信息 Referer的url配置
  const url2 = 'https://time.geekbang.org/column/article'
  // 获取文章列表
  const url3 = 'https://time.geekbang.org/serv/v1/column/articles'
  
  const Cookie = '_ga=GA1.2.599103124.1569156879; LF_ID=1584327865793-7884681-2455271; GCID=a0c61b9-f229637-f7f5b91-c7d4f37; GRID=a0c61b9-f229637-f7f5b91-c7d4f37; _gid=GA1.2.945582963.1585209103; GCESS=BAYERknztgwBAQUEAAAAAAkBAQMEL198XgcETA50AQEERuIUAAoEAAAAAAIEL198XgsCBAAIAQMEBAAvDQA-; gksskpitn=8ad5546a-c88e-45c4-929f-356a9c2abe7b; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1585215326,1585277185,1585277268; _gat=1; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1585295036; '
  
  let serverId = 'SERVERID=3431a294a18c59fc8f5805662e2bd51e|'
  const loginTime = '|1585290183;'
  
  /**
   * 获取文章列表所需的body
   */
  const list_data = {
    cid: 48,
    size: 100,
    prev: 0,
    order: "earliest",
    sample: false
  }
  
  // 获取文章列表 所使用的id
  const id = '/181'
  ```

- 运行，在server.js所在目录执行命令

  ```
  node server.js
  ```

- 
