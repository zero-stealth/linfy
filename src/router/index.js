import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AdminLoginView from '@/views/AdminLoginView.vue';
import AdminSigninView from '@/views/AdminSigninView.vue';
import SupportView from '@/views/SupportView.vue';
import PanelView from '@/views/PanelView.vue';
import PolicyView from '@/views/PolicyView.vue';
import DisclaimerView from '@/views/DisclaimerView.vue';
import TermsView from '@/views/TermsView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: "linkify - Home",
    }
  },
  {
    path: '/p-login',
    name: 'AdminLogin',
    component: AdminLoginView,
    meta: {
      title: "linkify - Admin Login",
    }
  },
  {
    path: '/p-signup',
    name: 'AdminSignin',
    component: AdminSigninView,
    meta: {
      title: "linkify - Admin Signin",
    }
  },
  {
    path: '/support',
    name: 'Support',
    component: SupportView,
    meta: {
      title: "linkify - Support",
    }
  },
  {
    path: '/panel',
    name: 'Panel',
    component: PanelView,
    meta: {
      isAdmin: false,
      title: "linkify - Admin Panel",
    }
  },
  {
    path: '/policy',
    name: 'Policy',
    component: PolicyView,
    meta: {
      title: "linkify - Privacy Policy",
    }
  },
  {
    path: '/disclaimer',
    name: 'Disclaimer',
    component: DisclaimerView,
    meta: {
      title: "linkify - Disclaimer",
    }
  },
  {
    path: '/terms',
    name: 'Terms',
    component: TermsView,
    meta: {
      title: "linkify - Terms and Conditions",
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView,
    meta: {
      title: "404 - Page not found",
    }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const isAdmin = () => {
  const admin = localStorage.getItem('admin');
  return admin === 'true'; 
};

const dynamicTitleGuard = (to, from, next) => {
  document.title = to.meta.title || 'Linkfy | Get links to different groups';
  next();
};

const adminGuard = (to, from, next) => {
  if (to.matched.some((record) => record.meta.isAdmin)) {
    if (isAdmin()) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
};

router.beforeEach(dynamicTitleGuard);
router.beforeEach(adminGuard);

export default router;
