const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENVa
})

// 云函数入口函数
export async function main(event, context) {
 // Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
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
  return await client.GeneralBasicOCR(params).then(
    (data) => {
      console.log(data)
      return data
    },
    (err) => {
      console.error("error", err);
    },
  );
}
