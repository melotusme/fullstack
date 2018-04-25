import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import ArticleList from '@/components/ArticleList';
import Article from '@/components/Article';
import Layout from '@/components/Layout';
import LandPage from '@/components/LandPage';
import About from '@/components/About';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      component: Login
    }, {
      path: '/login',
      component: Login
    },
    {
      path: '',
      component: Layout,
      children: [
        {path: '/index', name: 'LandPage', component: LandPage},
        {path: '/articles', name: 'Articles', component: ArticleList},
        {path: '/articles/:id', name: 'Article', component: Article},
        {path: '/about', name: 'About', component: About},
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
});
