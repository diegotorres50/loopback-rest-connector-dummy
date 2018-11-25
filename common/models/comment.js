'use strict';

module.exports = function(Comment) {

    Comment.getTheUsers = function() {
        Comment.app.models.MyRestUserModel.getUsers()
        .then(result => {
        console.log(result);
        return result;
        })      
        .catch((err) => {
        // Handle any error that occurred in any of the previous
        // promises in the chain.
        console.error('Hay un error 2');
        console.error(err)

        // Aqui deberiamos retornar el error
        //cb(err)
        })      
    
  }   


  Comment.getTheComments = function(cb) {
    Comment.app.models.MyRestModel.getComments()
    .then(result => {
      console.log(result);
      //cb(null, result);
      return result
    })
    .then(result => {

        //usuarios = Comment.getTheUsers()

        //console.log(result)

        //cb(null, Comment.getTheUsers())

        Comment.app.models.MyRestUserModel.getUsers()
        .then(result2 => {
        console.log(result2);
        var test = result.users = result

        var data = {
            comentarios: result,
            usuarios: result2
        };

        cb(null, data);
        })      
        .catch((err) => {
        // Handle any error that occurred in any of the previous
        // promises in the chain.
        console.error('Hay un error 2');
        console.error(err)

        // Aqui deberiamos retornar el error
        //cb(err)
        })         

      })    
    .catch((err) => {
        // Handle any error that occurred in any of the previous
        // promises in the chain.
        console.error('Hay un error');
        console.error(err)
        cb(err)
      })
      
  }

  Comment.remoteMethod (
        'getTheComments',
        {
          http: {path: '/getthecomments', verb: 'get'},
          returns: {arg: 'comments', type: 'object'}
        }
    );
};