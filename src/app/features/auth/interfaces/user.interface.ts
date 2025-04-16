export interface RegisterCredentials {
	email: string;
	password: string;
}

export interface RegisterResponse {
	success: boolean;
	data: {
		_id: string;
		identifier: string;
		role: string;
	};
}

export interface FirebaseRegisterResponse {
	user: any;
}
export interface User {
	_id: string;
	role: UserRole;
	email: string;
	userInfo: UserInfo;
	planId?: string;
	routineId?: string;
	refreshToken?: string;
	onboardingCompleted?: boolean;
}

export enum UserRole {
	ADMIN = "Admin",
	USER = "User",
	TRAINER = "Trainer",
}

export interface UserInfo {
	_id: string;
	name: string;
	password?: string;
	identifier: string;
	dateBirthday: Date | string;
	sex: string;
	phone: string;
	address: string;
	historyofPathologicalLesions: string;
	medicalSociety: string;
	cardiacHistory: string;
	bloodPressure: string;
	frequencyOfPhysicalExercise: string;
	respiratoryHistory: string;
	surgicalHistory: string;
	CI: string;
}

export interface AuthResponse {
	user: User;
	token: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
}
