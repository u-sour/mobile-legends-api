import HomeView from '../views/HomeView.vue'
const prefixMetaTitle = 'MLBB API'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: prefixMetaTitle,
      pageTitle: 'MLBB API',
      description:
        "MLBB API is an unoffical mobile legends bang bang api that can be used by any developer and it's free no sign up."
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/LoginView.vue'),
    meta: {
      title: `${prefixMetaTitle} - Login`,
      pageTitle: 'Login',
      description: 'Login',
      requiresGuest: true
    }
  },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: () => import('../views/auth/RegisterView.vue'),
  //   meta: {
  //     title: `${prefixMetaTitle} - Register`,
  //     pageTitle: 'Register',
  //     description: 'Register',
  //     requiresGuest: true
  //   }
  // },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/auth/UserView.vue'),
    meta: {
      title: `${prefixMetaTitle} - User Profile`,
      pageTitle: 'User',
      description: 'User Profile',
      requiresAuth: true
    }
  },
  {
    path: '/heroes',
    name: 'heroes',
    component: () => import('../views/heroes/HeroesView.vue'),
    redirect: { name: 'index.heroes' },
    meta: {
      title: `${prefixMetaTitle} - Heroes`,
      pageTitle: 'Heroes',
      description: 'Heroes',
      requiresAuth: true
    },
    children: [
      {
        path: '/heroes/index',
        name: 'index.heroes',
        component: () => import('../views/heroes/IndexHeroesView.vue'),
        meta: {
          title: `${prefixMetaTitle} - Heroes`,
          pageTitle: 'Heroes',
          description: 'Heroes',
          createBtn: true,
          requiresAuth: true
        }
      },
      {
        path: '/heroes/create',
        name: 'create.heroes',
        component: () => import('../views/heroes/CreateHeroesView.vue'),
        meta: {
          title: `${prefixMetaTitle} - Create Hero`,
          pageTitle: 'Create',
          description: 'Create Hero',
          backBtn: true,
          requiresAuth: true
        }
      },
      {
        path: '/heroes/edit/:id',
        name: 'edit.heroes',
        component: () => import('../views/heroes/EditHeroesView.vue'),
        meta: {
          title: `${prefixMetaTitle} - Edit Hero`,
          pageTitle: 'Edit',
          description: 'Edit Hero',
          backBtn: true,
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/hero-roles',
    name: 'hero-roles',
    component: () => import('../views/hero_roles/HeroRolesView.vue'),
    redirect: { name: 'index.hero-roles' },
    meta: {
      title: `${prefixMetaTitle} - Hero Roles`,
      pageTitle: 'Hero Roles',
      description: 'Hero Roles',
      requiresAuth: true
    },
    children: [
      {
        path: '/hero-roles/index',
        name: 'index.hero-roles',
        component: () => import('../views/hero_roles/IndexHeroRolesView.vue'),
        meta: {
          title: `${prefixMetaTitle} - Hero Roles`,
          pageTitle: 'Hero Roles',
          description: 'Hero Roles',
          createBtn: true,
          requiresAuth: true
        }
      },
      {
        path: '/hero-roles/create',
        name: 'create.hero-roles',
        component: () => import('../views/hero_roles/CreateHeroRolesView.vue'),
        meta: {
          title: `${prefixMetaTitle} - Create Hero Role`,
          pageTitle: 'Create',
          description: 'Create Hero Role',
          backBtn: true,
          requiresAuth: true
        }
      },
      {
        path: '/hero-roles/edit/:id',
        name: 'edit.hero-roles',
        component: () => import('../views/hero_roles/EditHeroRolesView.vue'),
        meta: {
          title: `${prefixMetaTitle} - Edit Hero Role`,
          pageTitle: 'Edit',
          description: 'Edit Hero Role',
          backBtn: true,
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/hero-specialties',
    name: 'hero-specialties',
    component: () => import('../views/hero_specialties/HeroSpecialtiesView.vue'),
    redirect: { name: 'index.hero-specialties' },
    meta: {
      title: `${prefixMetaTitle} - Hero Specialties`,
      pageTitle: 'Hero Specialties',
      description: 'Hero Specialties',
      requiresAuth: true
    },
    children: [
      {
        path: '/hero-specialties/index',
        name: 'index.hero-specialties',
        component: () => import('../views/hero_specialties/IndexHeroSpecialtiesView.vue'),
        meta: {
          title: `${prefixMetaTitle} - Hero Specialties`,
          pageTitle: 'Hero Specialties',
          description: 'Hero Specialties',
          createBtn: true,
          requiresAuth: true
        }
      },
      {
        path: '/hero-specialties/create',
        name: 'create.hero-specialties',
        component: () => import('../views/hero_specialties/CreateHeroSpecialtiesView.vue'),
        meta: {
          title: `${prefixMetaTitle} - Create Hero Specialty`,
          pageTitle: 'Create',
          description: 'Create Hero Specialty',
          backBtn: true,
          requiresAuth: true
        }
      },
      {
        path: '/hero-specialties/edit/:id',
        name: 'edit.hero-specialties',
        component: () => import('../views/hero_specialties/EditHeroSpecialtiesView.vue'),
        meta: {
          title: `${prefixMetaTitle} - Edit Hero Specialty`,
          pageTitle: 'Edit',
          description: 'Edit Hero Specialty',
          backBtn: true,
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'routeChecker',
    component: () => import('../views/NotFoundView.vue')
  }
]

export default routes
