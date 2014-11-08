// find a value in an object by giving a path
// pathValue(user, "profile.name") --> user['profile']['name']
property = function(obj, path) {
  var paths = path.split('.')
  var current = obj;
  _.each(paths, function(path) {
    if (!_.isObject(current)) 
      return current = undefined;
    current = current[path];
  }); 
  return current;
}