const RICHMENU_ALIAS = 'booking'

module.exports = {
  alias: RICHMENU_ALIAS,
  default: false,
  image: 'https://i.imgur.com/y3QmmfN.jpg',
  metadata: {
    chatBarText: '點我線上預約',
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
      { // 線上預約
        bounds: { x: 98, y: 1122, width: 883, height: 369 },
        action: {
          type: 'message',
          text: '我想安排預約',
        },
      },
      { // 地址
        bounds: { x: 1048, y: 1330, width: 1452, height: 356 },
        action: {
          type: 'uri',
          uri: 'https://www.google.com/maps/search/?api=1&query=Urania%E8%89%BE%E8%8A%99%E8%92%82%E4%BA%9E&query_place_id=ChIJhVxzmMirQjQRG3U8FAGtHT4',
        },
      },
    ],
  },
}
