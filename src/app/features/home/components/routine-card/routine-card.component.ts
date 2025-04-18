import { NgForOf, NgIf, UpperCasePipe } from "@angular/common";
import { CommonModule } from "@angular/common";
import {
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	SimpleChanges,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { Exercise, SubRoutine } from "@feature/routine/interfaces/routine.interface";
import { ExerciseService } from "@feature/routine/services/exercise.service";
import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonSpinner,
} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { barbellOutline, bedOutline, calendarClearOutline, fitnessOutline, listOutline, trendingUpOutline } from "ionicons/icons";
import { Subject, catchError, forkJoin, of, takeUntil } from "rxjs";
import { ExerciseItemComponent } from "../exercise-item/exercise-item.component";

@Component({
	selector: "app-routine-card",
	templateUrl: "./routine-card.component.html",
	styleUrls: ["./routine-card.component.scss"],
	standalone: true,
	imports: [
		ExerciseItemComponent,
		NgForOf,
		IonCard,
		IonCardHeader,
		IonCardTitle,
		IonIcon,
		IonCardContent,
		NgIf,
		IonSpinner,
		RouterLink,
		CommonModule,
	],
})
export class RoutineCardComponent implements OnInit, OnChanges, OnDestroy {
	@Input() routine!: SubRoutine | null;
	@Input() isRestDay = false;
	@Input() isEnrolled = false;

	loadedExercises: Exercise[] = [];
	isLoading = true;
	private destroy$ = new Subject<void>();

	constructor(
		private exerciseService: ExerciseService,
		private cd: ChangeDetectorRef,
	) {
		addIcons({barbellOutline,fitnessOutline,calendarClearOutline,bedOutline,listOutline,trendingUpOutline});
	}

	ngOnInit(): void {
		this.processExercises();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["routine"]) {
			this.processExercises();
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	/**
	 * Procesa los ejercicios de la rutina, convirtiendo IDs en objetos Exercise si es necesario
	 */
	processExercises(): void {
		if (!this.routine?.exercises) {
			this.loadedExercises = [];
			this.isLoading = false;
			return;
		}

		if (Array.isArray(this.routine.exercises) && this.routine.exercises.length > 0) {
			if (typeof this.routine.exercises[0] === "object") {
				this.loadedExercises = this.routine.exercises as Exercise[];
				this.isLoading = false;
				return;
			}

			this.isLoading = true;
			const exerciseIds = this.routine.exercises as string[];

			if (exerciseIds.length === 0) {
				this.loadedExercises = [];
				this.isLoading = false;
				return;
			}

			const exerciseRequests = exerciseIds.map((id) =>
				this.exerciseService.getExerciseById(id).pipe(catchError(() => of(null))),
			);

			forkJoin(exerciseRequests)
				.pipe(takeUntil(this.destroy$))
				.subscribe({
					next: (exercises) => {
						this.loadedExercises = exercises.filter((exercise) => exercise !== null) as Exercise[];
						this.isLoading = false;
						this.cd.markForCheck();
					},
					error: () => {
						console.error("Error loading exercises");
						this.loadedExercises = [];
						this.isLoading = false;
						this.cd.markForCheck();
					},
				});
		} else {
			this.loadedExercises = [];
			this.isLoading = false;
		}
	}

	/**
	 * Función de utilidad para verificar si los ejercicios son objetos o strings
	 */
	private areExerciseObjects(exercises: Exercise[] | string[]): exercises is Exercise[] {
		return exercises.length === 0 || (exercises.length > 0 && typeof exercises[0] !== "string");
	}

	trackById(index: number, item: Exercise): string {
		return item._id;
	}
}

