import noConsoleLog from './no-console-log.js'
import noVar from './no-var.js'
import onlyCamelCase from './only-camel-case.js'
import tooShort from './no-short-names.js'

export default {
    rules: {
        'no-console-log': noConsoleLog,
        'only-camel-case': onlyCamelCase,
        'no-var': noVar,
        'too-short': tooShort
    }
};
