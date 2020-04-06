import { exportExcel } from "@/until/excel.js";
export default class BaseService {
  /**
   * 导出Excel
   * @param { } config
   *  config ={
   * tHeader,
   * fileName :[],
   * colone:[
   *
   */
  static exportExcel(config) {
    const { tHeader, tHeaderKeys, fileName, data } = config;
    const result = exportExcel(tHeader, tHeaderKeys, data, fileName);
    return result;
  }

  /**
   *   上传文件
   */

  static uploadFile() {}
}