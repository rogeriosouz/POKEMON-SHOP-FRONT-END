const APP_ROUTER = {
  private: {
    // person: '/user/person',
    // my_pokemons: '/user/pokemons',
    login: '/login',
    register: '/register',
  },

  public: {
    home: '/',
    pokemons: '/pokemon',
    pokemon: '/pokemon/',
    forget_password: '/forget-password',
  },
}

export function privateRouter(routerPath: string) {
  const appPublicRoutes = Object.values(APP_ROUTER.private)

  return appPublicRoutes.includes(routerPath)
}
