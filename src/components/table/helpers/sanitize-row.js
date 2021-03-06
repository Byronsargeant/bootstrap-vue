import { keys } from '../../../utils/object'
import { arrayIncludes } from '../../../utils/array'
import { isFunction } from '../../../utils/inspect'
import { IGNORED_FIELD_KEYS } from './constants'

// Return a copy of a row after all reserved fields have been filtered out
const sanitizeRow = (row, ignoreFields, includeFields, fieldsObj = {}) =>
  keys(row).reduce((obj, key) => {
    // Ignore special fields that start with `_`
    // Ignore fields in the `ignoreFields` array
    // Include only fields in the `includeFields` array
    if (
      !IGNORED_FIELD_KEYS[key] &&
      !(ignoreFields && ignoreFields.length > 0 && arrayIncludes(ignoreFields, key)) &&
      !(includeFields && includeFields.length > 0 && !arrayIncludes(includeFields, key))
    ) {
      const f = fieldsObj[key] || {}
      const val = row[key]
      const filterByFormatted = f.filterByFormatted
      const formatter = isFunction(filterByFormatted)
        ? filterByFormatted
        : filterByFormatted
          ? this.getFieldFormatter(key)
          : null
      obj[key] = formatter ? formatter(val, key, row) : val
    }
    return obj
  }, {})

export default sanitizeRow
