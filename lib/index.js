
module.exports = function logBeautify(api, options, dirname) {
  return {
    visitor: {
      CallExpression(path) {
        if (options && options.closed) {
          return;
        }
        if (api.types.isMemberExpression(path.node.callee) 
        && path.node.callee.object.name === 'console' 
        && ['log', 'info', 'error', 'debug'].includes(path.node.callee.property.name)) {
          const { line, column } = path.node.loc.start;
          path.node.arguments.unshift(api.types.stringLiteral(`行号: ${line}, 列号: ${column} ，详细信息: `));
        }
      }
    }
  };
}
