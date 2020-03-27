/**
 * npm install log4js
 * 源码及文档地址：https://github.com/nomiddlename/log4js-node
 */
const log4js = require('log4js');

/**
 * 第一种：
 * configure方法为配置log4js对象，内部有levels、appenders、categories三个属性
 * levels:
 *         配置日志的输出级别,共ALL<TRACE<DEBUG<INFO<WARN<ERROR<FATAL<MARK<OFF八个级别,default level is OFF
 *         只有大于等于日志配置级别的信息才能输出出来，可以通过category来有效的控制日志输出级别
 * appenders:
 *         配置文件的输出源，一般日志输出type共有console、file、dateFile三种
 *         console:普通的控制台输出
 *         file:输出到文件内，以文件名-文件大小-备份文件个数的形式rolling生成文件
 *         dateFile:输出到文件内，以pattern属性的时间格式，以时间的生成文件
 * replaceConsole:
 *         是否替换控制台输出，当代码出现console.log，表示以日志type=console的形式输出
 *
 */

// log4js.configure({
//   levels: 'trace',
//   appenders: [{
//       type: 'console',
//       category: "console"
//     },
//     {
//       type: 'stdout'
//     },
//     {
//       type: 'file',
//       filename: __dirname + '\\logs\\test.log', //文件目录，当目录文件或文件夹不存在时，会自动创建
//       maxLogSize: 10, //文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件test.log.1的序列自增长的文件
//       backups: 3, //default value = 5.当文件内容超过文件存储空间时，备份文件的数量
//       //compress : true,//default false.是否以压缩的形式保存新文件,默认false。如果true，则新增的日志文件会保存在gz的压缩文件内，并且生成后将不被替换，false会被替换掉
//       encoding: 'utf-8', //default "utf-8"，文件的编码
//       category: 'log_file'
//     },
//     {
//       type: "dateFile",
//       filename: __dirname + '\\logs\\dateFileTest', //您要写入日志文件的路径
//       alwaysIncludePattern: true, //（默认为false） - 将模式包含在当前日志文件的名称以及备份中
//       //compress : true,//（默认为false） - 在滚动期间压缩备份文件（备份文件将具有.gz扩展名）
//       pattern: "-yyyy-MM-dd-hh.log", //（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
//       encoding: 'utf-8', //default "utf-8"，文件的编码
//       category: "log_date",
//     }
//   ],
//   replaceConsole: true
// });

/**
 * 第二种
 * appenders:
 *         一个JS对象，key为上面的category，value是一些其他属性值
 * categories：
 *         default表示log4js.getLogger()获取找不到对应的category时，使用default中的日志配置
 *
 */
log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: __dirname + '\\logs\\test.log', //文件目录，当目录文件或文件夹不存在时，会自动创建
      maxLogSize: 1000, //文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件test.log.1的序列自增长的文件
      backups: 3, //当文件内容超过文件存储空间时，备份文件的数量
      //compress : true,//是否以压缩的形式保存新文件,默认false。如果true，则新增的日志文件会保存在gz的压缩文件内，并且生成后将不被替换，false会被替换掉
      encoding: 'utf-8', //default "utf-8"，文件的编码
      category: 'log_file',
      numBackups: 10, // keep five backup files
      compress: true, // compress the backups
      encoding: 'utf-8',
    },
    dateFile: {
      type: 'dateFile',
      filename: 'more-important-things.log',
      pattern: 'yyyy-MM-dd-hh',
      compress: true
    },
    out: {
      type: 'stdout'
    }
  },
  categories: {
    default: {
      appenders: ['file', 'dateFile', 'out'],
      level: 'trace'
    }
  }
});

var log = log4js.getLogger('log_file');
var logger1 = log4js.getLogger('log_date');

log.info("this is a log4js test1111111111111!");
logger1.info("this is a log4js test1111111111111!");
console.log("test test!!");

module.exports = {
  log
}