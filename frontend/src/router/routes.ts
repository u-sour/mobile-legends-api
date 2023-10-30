import HomeView from '../views/HomeView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      pageTitle: 'Home'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/LoginView.vue'),
    meta: { requiresGuest: true }
  },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: () => import('../views/auth/RegisterView.vue'),
  //   meta: { requiresGuest: true }
  // },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/auth/UserView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/heroes',
    name: 'heroes',
    component: () => import('../views/heroes/HeroesView.vue'),
    redirect: { name: 'index.heroes' },
    meta: {
      pageTitle: 'Heroes',
      requiresAuth: true
    },
    children: [
      {
        path: '/heroes/index',
        name: 'index.heroes',
        component: () => import('../views/heroes/IndexHeroesView.vue'),
        meta: { pageTitle: 'Heroes', createBtn: true, requiresAuth: true }
      },
      {
        path: '/heroes/create',
        name: 'create.heroes',
        component: () => import('../views/heroes/CreateHeroesView.vue'),
        meta: { pageTitle: 'Create', backBtn: true, requiresAuth: true }
      },
      {
        path: '/heroes/edit/:id',
        name: 'edit.heroes',
        component: () => import('../views/heroes/EditHeroesView.vue'),
        meta: { pageTitle: 'Edit', backBtn: true, requiresAuth: true }
      }
    ]
  },
  {
    path: '/hero-roles',
    name: 'hero-roles',
    component: () => import('../views/hero_roles/HeroRolesView.vue'),
    redirect: { name: 'index.hero-roles' },
    meta: {
      pageTitle: 'Hero Roles',
      requiresAuth: true
    },
    children: [
      {
        path: '/hero-roles/index',
        name: 'index.hero-roles',
        component: () => import('../views/hero_roles/IndexHeroRolesView.vue'),
        meta: { pageTitle: 'Hero Roles', createBtn: true, requiresAuth: true }
      },
      {
        path: '/hero-roles/create',
        name: 'create.hero-roles',
        component: () => import('../views/hero_roles/CreateHeroRolesView.vue'),
        meta: { pageTitle: 'Create', backBtn: true, requiresAuth: true }
      },
      {
        path: '/hero-roles/edit/:id',
        name: 'edit.hero-roles',
        component: () => import('../views/hero_roles/EditHeroRolesView.vue'),
        meta: { pageTitle: 'Edit', backBtn: true, requiresAuth: true }
      }
    ]
  },
  {
    path: '/hero-specialties',
    name: 'hero-specialties',
    component: () => import('../views/hero_specialties/HeroSpecialtiesView.vue'),
    redirect: { name: 'index.hero-specialties' },
    meta: {
      pageTitle: 'Hero Specialties',
      requiresAuth: true
    },
    children: [
      {
        path: '/hero-specialties/index',
        name: 'index.hero-specialties',
        component: () => import('../views/hero_specialties/IndexHeroSpecialtiesView.vue'),
        meta: { pageTitle: 'Hero Specialties', createBtn: true, requiresAuth: true }
      },
      {
        path: '/hero-specialties/create',
        name: 'create.hero-specialties',
        component: () => import('../views/hero_specialties/CreateHeroSpecialtiesView.vue'),
        meta: { pageTitle: 'Create', backBtn: true, requiresAuth: true }
      },
      {
        path: '/hero-specialties/edit/:id',
        name: 'edit.hero-specialties',
        component: () => import('../views/hero_specialties/EditHeroSpecialtiesView.vue'),
        meta: { pageTitle: 'Edit', backBtn: true, requiresAuth: true }
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
