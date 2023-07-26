const _ = require('lodash')
const { beautifyFlex, errToPlainObj, getenv, sha1Base64url } = require('./utils')
const { Client: Line, OAuth: LineOAuth } = require('@line/bot-sdk')
const { promises: fsPromises } = require('fs')
const axios = require('axios')
const fg = require('fast-glob')
const JSON5 = require('json5')
const path = require('path')

const logError = (prefix, err) => {
  err = beautifyFlex(errToPlainObj(err))
  err.message = err?.response?.data?.message ?? err?.originalError?.response?.data?.message ?? err.message
  console.log(`${prefix} = ${JSON5.stringify(err, null, 2)}`)
}

exports.upload = async () => {
  try {
    let channelAccessToken = getenv('LINEOA_ACCESS_TOKEN')
    const channelId = getenv('LINEOA_CHANNEL_ID')
    const channelSecret = getenv('LINEOA_CHANNEL_SECRET')
    if (!channelAccessToken && (channelId && channelSecret)) {
      try { // try to issue access token by channel id and channel secret
        const lineOAuth = new LineOAuth()
        channelAccessToken = (await lineOAuth.issueAccessToken())?.access_token
      } catch (err) {}
    }
    if (!channelAccessToken) throw new Error('invalid access token')
    const line = new Line({ channelAccessToken })

    // 先取得舊的 richmenu
    const [oldMenus, newMenus, oldAliases] = await Promise.all([
      line.getRichMenuList(),
      exports.loadMenus(),
      (async () => _.get(await line.getRichMenuAliasList(), 'aliases', []))(),
    ])
    console.log(`成功讀取到 ${newMenus.length} 筆圖文選單設定`)
    const oldAliasToId = _.fromPairs(_.map(oldAliases, menu => [menu.richMenuAliasId, menu.richMenuId]))
    console.log(`設定前圖文選單別名與圖文選單 ID 的對應 = ${JSON5.stringify(oldAliasToId, null, 2)}`)
    const oldIdToHash = _.fromPairs(_.map(oldMenus, menu => [menu.richMenuId, menu.name]))
    console.log(`設定前圖文選單 ID 與圖文選單 HASH 的對應 = ${JSON5.stringify(oldIdToHash, null, 2)}`)

    // 新增 menu
    await Promise.all(_.map(newMenus, async menu => {
      try {
        // 檢查 menu 是否已存在
        const oldId = oldAliasToId[menu.alias]
        const oldHash = oldId ? oldIdToHash[oldId] : null
        if (oldHash === menu.metadata.name) {
          menu.richMenuId = oldId
          return
        }
        // 上傳新的 richMenu
        menu.richMenuId = await line.createRichMenu(menu.metadata)
        console.log(`上傳新的圖文選單 = ${JSON5.stringify({ alias: menu.alias, hash: menu.metadata.name, richMenuId: menu.richMenuId }, null, 2)}`)
        // 上傳圖
        const image = await axios.get(menu.image, { responseType: 'arraybuffer' })
        await line.setRichMenuImage(menu.richMenuId, image.data, image.headers['content-type'])
        // 設定為預設 richMenu
        if (menu.default) await line.setDefaultRichMenu(menu.richMenuId)
        // 新增或更新 alias
        if (!oldId) await line.createRichMenuAlias(menu.richMenuId, menu.alias)
        else if (oldId !== menu.richMenuId) await line.updateRichMenuAlias(menu.alias, menu.richMenuId)
      } catch (err) {
        _.set(err, 'data.menu', menu)
        logError('圖文選單上傳失敗', err)
      }
    }))
    const newAliasToId = _.fromPairs(_.map(newMenus, menu => [menu.alias, menu.richMenuId]))
    console.log(`設定後圖文選單別名對應 = ${JSON5.stringify(newAliasToId, null, 2)}`)

    // 刪除不需要的 menu 和 alias
    const delMenuIds = _.difference(_.map(oldMenus, 'richMenuId'), _.map(newMenus, 'richMenuId'))
    const delAlias = _.difference(_.map(oldAliases, 'richMenuAliasId'), _.map(newMenus, 'alias'))
    await Promise.all([
      ..._.map(delMenuIds, async menuId => {
        console.log(`刪除不需要的圖文選單 = ${JSON5.stringify({ menuId, hash: oldIdToHash[menuId] }, null, 2)}`)
        await line.deleteRichMenu(menuId)
      }),
      ..._.map(delAlias, async alias => {
        console.log(`刪除不需要的圖文選單別名 = ${alias}`)
        await line.deleteRichMenuAlias(alias)
      }),
    ])
  } catch (err) {
    logError('發生錯誤', err)
  }
}

exports.loadMenus = async () => {
  const dir = path.relative(__dirname, getenv('RICHMENU_DIRECTORY'))
  console.log(`圖文選單設定檔目錄 = ${dir}`)
  if (!((await fsPromises.stat(dir)).isDirectory())) throw new Error('invalid richmenu directory')
  const menus = []
  for (const filename of await fg(`${dir}/*.js`)) {
    const menu = require(`./${filename}`)
    if (!menu.image) continue
    const areas = menu?.metadata?.areas
    if (_.isArray(areas)) {
      menu.metadata.areas = _.sortBy(areas, [
        'bounds.x',
        'bounds.y',
        'bounds.width',
        'bounds.height',
        'action.type',
      ])
    }
    _.set(menu, 'metadata.name', '') // 避免不小心指定 menu.metadata.name
    const sha1 = sha1Base64url(JSON5.stringify(beautifyFlex(menu)))
    _.set(menu, 'metadata.name', sha1)
    menus.push(menu)
  }
  return menus
}
