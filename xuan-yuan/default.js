const RICHMENU_ALIAS = 'default'

module.exports = {
  alias: RICHMENU_ALIAS,
  default: true,
  image: 'https://i.imgur.com/ehpHwsb.jpeg',
  metadata: {
    chatBarText: '宣源車體防護',
    selected: true,
    size: { width: 2500, height: 1684 },
    areas: [
      { // 店家地址
        bounds: { x: 0, y: 0, width: 833, height: 843 },
        action: {
          type: 'uri',
          uri: 'https://www.google.com/maps/dir/?api=1&destination=105%E5%8F%B0%E5%8C%97%E5%B8%82%E6%9D%BE%E5%B1%B1%E5%8D%80%E6%92%AB%E9%81%A0%E8%A1%97401%E5%B7%B72%E8%99%9F',
        },
      },
      { // 洽詢內容
        bounds: { x: 833, y: 0, width: 834, height: 843 },
        action: {
          data: '洽詢內容',
          fillInText: '宣源車體防護-洽詢卡\n\n車主姓名：\n車主電話：\n車型年份/顏色/版本：\n本次預算：\n想做的項目：\n想貼的顏色：',
          inputOption: 'openKeyboard',
          type: 'postback',
        },
      },
      { // 服務範圍
        bounds: { x: 1667, y: 0, width: 833, height: 843 },
        action: {
          type: 'uri',
          uri: 'https://line.me/R/home/public/profile?id=x.y.uan',
        },
      },
      { // instagram
        bounds: { x: 0, y: 843, width: 833, height: 843 },
        action: {
          type: 'uri',
          uri: 'https://instagram.com/x.y.uan?openExternalBrowser=1',
        },
      },
      // { // 蝦皮
      //   bounds: { x: 833, y: 843, width: 834, height: 843 },
      //   action: {
      //     type: 'uri',
      //     uri: 'https://instagram.com/x.y.uan?openExternalBrowser=1',
      //   },
      // },
      { // facebook
        bounds: { x: 1667, y: 843, width: 833, height: 843 },
        action: {
          type: 'uri',
          uri: 'https://www.facebook.com/%E5%AE%A3%E6%BA%90%E8%BB%8A%E9%AB%94%E9%98%B2%E8%AD%B7-101377102591812/?openExternalBrowser=1',
        },
      },
    ],
  },
}
