import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { HeroSectionPageComponent } from './hero-section-page/hero-section-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChatComponent } from './components/chat/chat.component';

export const routes: Routes = [
  {path: '', component : HeroSectionPageComponent},
  {path : 'home', component: HomePageComponent},
  {path : 'signin', component: SignInPageComponent},
  {path : 'signup', component: SignUpPageComponent},
  {path : 'profile', component: UserProfileComponent},
  {path : 'chat', component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
