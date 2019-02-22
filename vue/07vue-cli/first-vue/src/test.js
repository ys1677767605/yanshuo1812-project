//如果只导出个别，按需导出，前面加export
export function aa(){

}
export function bb(){

}
export let test = [3,4,5,6]

// module.exports = {
//     aa,
//     bb
// }

//默认导出
// export default {
//     aa,
//     bb
// }
export function sum(a,b){
    return a+b
}
export function run(){
    alert('我是test文件');
}

//默认提供aa方法
export default aa

//导入format.js文件
export  {format,run as formatRun}  from './format'

//导出format文件所有变量，前提是没有重名冲突
//export * from './format'