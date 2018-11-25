'use strict';

module.exports = function(Contentprofiling) {

    Contentprofiling.getTheProfiling = function(cb) {

    // Armamos la data de la respuesta profiling
    var data = {};

    // Pedimos primero los comentarios    
    Contentprofiling.app.models.MyRestCommentModel.getComments()
    .then(function(comments) {
      data.myComments = comments
      return Contentprofiling.app.models.MyRestUserModel.getUsers()
    })
    .catch((err) => {
        // Handle any error that occurred in any of the previous
        // promises in the chain.
        console.error('Hay un error de comentarios');
        console.error(err)
        data.myComments = "no comments"
        return Contentprofiling.app.models.MyRestUserModel.getUsers()
    })    
    .then(function(users) {
        data.myUsers = users
        return Contentprofiling.app.models.MyRestAlbumModel.getAlbums()
    })                
    .catch((err) => {
        // Handle any error that occurred in any of the previous
        // promises in the chain.
        console.error('Hay un error de usuarios');
        console.error(err)
        data.myComments = "no users"
        return Contentprofiling.app.models.MyRestUserModel.getUsers()
    })
    .then(function(albums) {
        data.myAlbums = albums
        cb(null, data);
    })                
    .catch((err) => {
      // Handle any error that occurred in any of the previous
      // promises in the chain.
      console.error('Hay un error de albums');
      console.error(err)
      data.myAbums = "no albums"
      
      // Comentamos los errores de callbacks porque si rompe un datasource imprimimos lo que venga
      // en el json
      // cb(err)
    })    
  }

  Contentprofiling.remoteMethod (
        'getTheProfiling',
        {
          http: {path: '/gettheprofiling', verb: 'get'},
          returns: {arg: 'data', type: 'object'}
        }
    );
};