const RICHMENU_ALIAS = 'default'

module.exports = {
  alias: RICHMENU_ALIAS,
  default: true,
  image: 'https://i.imgur.com/LbddGT8.jpg',
  metadata: {
    chatBarText: '美甲美睫進修',
    selected: true,
    size: { width: 2500, height: 1686 },
    areas: [
      { // 美甲美睫進修
        bounds: { x: 0, y: 0, width: 830, height: 180 },
        action: {
          type: 'richmenuswitch',
          richMenuAliasId: 'default',
          data: JSON.stringify({ from: RICHMENU_ALIAS, to: 'default' }),
        },
      },
      { // 人才招募
        bounds: { x: 830, y: 0, width: 836, height: 180 },
        action: {
          type: 'richmenuswitch',
          richMenuAliasId: 'people',
          data: JSON.stringify({ from: RICHMENU_ALIAS, to: 'people' }),
        },
      },
      { // 線上預約
        bounds: { x: 1666, y: 0, width: 834, height: 180 },
        action: {
          type: 'richmenuswitch',
          richMenuAliasId: 'booking',
          data: JSON.stringify({ from: RICHMENU_ALIAS, to: 'booking' }),
        },
      },
      { // 線上課程網頁
        bounds: { x: 0, y: 180, width: 1666, height: 1253 },
        action: {
          type: 'uri',
          uri: 'http://www.urania.com.tw/class.html',
        },
      },
      { // 線上影音平台
        bounds: { x: 1666, y: 180, width: 834, height: 1253 },
        action: {
          type: 'uri',
          uri: 'https://www.youtube.com/channel/UCM0STDX-_tOg9NNfd5aoQew',
        },
      },
      { // 最新活動
        bounds: { x: 0, y: 1433, width: 618, height: 253 },
        action: {
          type: 'uri',
          uri: 'https://www.urania.com.tw/news.html',
        },
      },
      { // 關於我們
        bounds: { x: 618, y: 1433, width: 632, height: 253 },
        action: {
          type: 'uri',
          uri: 'https://www.urania.com.tw/share_it.html',
        },
      },
      { // 作品集
        bounds: { x: 1250, y: 1433, width: 634, height: 253 },
        action: {
          type: 'uri',
          uri: 'https://www.urania.com.tw/',
        },
      },
      { // ＦＡＱ
        bounds: { x: 1884, y: 1433, width: 616, height: 253 },
        action: {
          type: 'uri',
          uri: 'https://www.urania.com.tw/q_and_a.html',
        },
      },
    ],
  },
}
