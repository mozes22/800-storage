import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home - 800 Storage'
  },
  {
    path: 'users',
    component: UsersComponent,
    title: 'Users - 800 Storage'
  },
  {
    path: 'users/:id',
    component: UserDetailsComponent,
    title: 'User Details - 800 Storage'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About - 800 Storage'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact - 800 Storage'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
