export const login = ({ loginStatus = 'isLogged' } = {}) => ({
  type: 'LOGIN',
  loginStatus
})

export const logout = ({ loginStatus = 'notLogged' } = {}) => ({
  type: 'LOGOUT',
  loginStatus
})
