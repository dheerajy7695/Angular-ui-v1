import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { AdminsComponent } from './features/admins/admins.component';
import { DoctorsComponent } from './features/doctor/doctors/doctors.component';
import { CreateEditDoctorComponent } from './features/doctor/create-edit-doctor/create-edit-doctor.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [authGuard]
            },
            {
                path: 'home',
                component: HomeComponent,
                canActivate: [authGuard]
            },
            {
                path: 'user',
                component: UsersComponent,
                canActivate: [authGuard]
            },
            {
                path: 'admins',
                loadComponent: () => import('./features/admins/admins.component').then(m => m.AdminsComponent),
                canActivate: [authGuard]
            },
            {
                path: 'doctors',
                loadComponent: () => import('./features/doctor/doctors/doctors.component').then(m => m.DoctorsComponent),
                canActivate: [authGuard]
            },
            {
                path: 'doctors/create',
                loadComponent: () => import('./features/doctor/create-edit-doctor/create-edit-doctor.component').then(m => m.CreateEditDoctorComponent),
                canActivate: [authGuard]
            },
            {
                path: 'doctors/edit/:id',
                loadComponent: () => import('./features/doctor/create-edit-doctor/create-edit-doctor.component').then(m => m.CreateEditDoctorComponent),
                canActivate: [authGuard]
            },
            {
                path: 'doctors/profile/:id',
                loadComponent: () => import('./features/doctor/details/details.component').then(m => m.DetailsComponent),
                canActivate: [authGuard]
            }
        ]
    }
];
