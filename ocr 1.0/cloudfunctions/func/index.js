// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const tencentcloud = require("tencentcloud-sdk-nodejs");
  const OcrClient = tencentcloud.ocr.v20181119.Client;
  const clientConfig = {
    credential: {
      secretId: "AKIDd6JGwKZXEengJgmb9QQAcnhKglY4KJRJ",
      secretKey: "cx1pMddMnysVquiFWWFhsmPlqeBSR9al",
    },
    region: "ap-shanghai",
    profile: {
      httpProfile: {
        endpoint: "ocr.tencentcloudapi.com",
      },
    },
  };
  const client = new OcrClient(clientConfig);
  const params = {
      "ImageBase64": event.image
  };
}