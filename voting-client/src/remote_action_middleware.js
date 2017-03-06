// export default store => next => action => {
//   console.log('in middleware', action);
//   return next(action);
// }

export default socket => store => next => action => {
  socket.emit('action', action);
  return next(action);
}
