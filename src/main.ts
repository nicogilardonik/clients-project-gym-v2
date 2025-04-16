import { provideHttpClient } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { PreloadAllModules, RouteReuseStrategy, provideRouter, withPreloading } from "@angular/router";
import { IonicRouteStrategy, provideIonicAngular } from "@ionic/angular/standalone";

import { APP_INITIALIZER, importProvidersFrom } from "@angular/core";
import { AuthInitializerService } from "@feature/auth/services/auth-initializer.service";
import { AuthState } from "@feature/auth/state/auth.state";
import { HomeState } from "@feature/home/state/home.state";
import { UserState } from "@feature/profile/state/user.state";
import { RoutineState } from "@feature/routine/state/routine.state";
import { ScheduleState } from "@feature/schedule/state/schedule.state";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsModule } from "@ngxs/store";
import { register } from "swiper/element/bundle";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import { environment } from "./environments/environment";
import { OnboardingState } from "@feature/onboarding/state/onboarding.state";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
register();

// Factory para el inicializador de autenticación
export function initializeAuthFactory(authInitializer: AuthInitializerService) {
	return () => authInitializer.init();
}

bootstrapApplication(AppComponent, {
	providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		provideIonicAngular(),
		provideRouter(routes, withPreloading(PreloadAllModules)),
		provideHttpClient(),
		// Proveedor para inicializar la autenticación al arranque
		{
			provide: APP_INITIALIZER,
			useFactory: initializeAuthFactory,
			deps: [AuthInitializerService],
			multi: true,
		},
		importProvidersFrom(
			NgxsModule.forRoot([HomeState, ScheduleState, RoutineState, UserState, AuthState, OnboardingState,], {
				developmentMode: !environment.production,
				selectorOptions: {
					suppressErrors: false,
					injectContainerState: false,
				},
			}),
			NgxsReduxDevtoolsPluginModule.forRoot(),
		), provideFirebaseApp(() => initializeApp({ projectId: "project-gym-e5005", appId: "1:437288461955:web:cf931e31562c7601059db6", storageBucket: "project-gym-e5005.firebasestorage.app", apiKey: "AIzaSyCa5LaZB6Gscv5V7Du-bH01oBkx0dUBLUo", authDomain: "project-gym-e5005.firebaseapp.com", messagingSenderId: "437288461955", measurementId: "G-3GKPHZY9M7" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
	],
});
