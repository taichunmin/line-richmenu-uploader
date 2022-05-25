const _ = require('lodash')
const { enc: { Base64url }, SHA1 } = require('crypto-js')
const Qs = require('qs')

exports.getenv = (key, defaultval) => _.get(process, ['env', key], defaultval)

exports.httpBuildQuery = (obj, overrides = {}) => Qs.stringify(obj, { arrayFormat: 'brackets', ...overrides })

exports.errToPlainObj = (() => {
  const ERROR_KEYS = [
    'address',
    'code',
    'data',
    'dest',
    'errno',
    'info',
    'message',
    'name',
    'originalError.response.data',
    'originalError.response.headers',
    'originalError.response.status',
    'path',
    'port',
    'reason',
    'response.data',
    'response.headers',
    'response.status',
    'stack',
    'status',
    'statusCode',
    'statusMessage',
    'syscall',
  ]
  return err => _.pick(err, ERROR_KEYS)
})()

exports.sha1Base64url = str => Base64url.stringify(SHA1(str))

exports.beautifyFlex = obj => {
  if (_.isArray(obj)) return _.map(obj, exports.beautifyFlex)
  if (!_.isPlainObject(obj)) return obj
  const grp = _.groupBy(_.toPairs(obj), pair => (_.isArray(pair[1]) || _.isPlainObject(pair[1])) ? 'b' : 'a')
  _.each(grp.b, v => { v[1] = exports.beautifyFlex(v[1]) })
  return _.fromPairs([..._.sortBy(grp.a, '0'), ..._.sortBy(grp.b, '0')])
}
