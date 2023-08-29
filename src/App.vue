<template>
	<div class="md:hidden min-h-screen bg-secondary-magnolia flex flex-col justify-between gap-8">
		<div class="py-10 px-4 flex flex-col gap-8">
			<div
				class="bg-primary-purplish-blue bg-[url('/imgs/bg-sidebar-desktop.svg')] bg-cover bg-bottom bg-no-repeat w-full absolute inset-x-0 top-0 h-52"
			/>

			<div class="flex justify-center gap-2 relative text-white">
				<button
					v-for="(_, index) in steps"
					@click.prevent="store.goToStep(index)"
					class="p-2 rounded-lg hover:bg-white/10 transition-colors duration-300 text-left"
					:class="{ 'bg-white/10': index === store.activeStepIndex }"
				>
					<div
						class="w-10 h-10 flex justify-center items-center rounded-full border border-white font-medium transition-colors duration-300"
						:class="
							index === store.activeStepIndex
								? 'bg-primary-light-blue text-primary-marine-blue shadow'
								: 'bg-primary-marine-blue'
						"
					>
						<span v-text="index + 1" />
					</div>
				</button>
			</div>

			<div class="px-4 py-6 rounded-xl bg-white shadow-xl relative">
				<StepsContent :isFormSubmitted="isFormSubmitted" :activeStep="activeStep" :steps="steps" />
			</div>
		</div>

		<StepsNavigation
			v-show="!isFormSubmitted"
			:isFirstStep="isFirstStep"
			:isLastStep="isLastStep"
			class="p-4 bg-white"
			@submit="submit()"
		/>
	</div>

	<div class="min-h-screen bg-secondary-magnolia flex justify-center items-center p-4 max-md:hidden">
		<Container>
			<div class="bg-white rounded-2xl shadow-lg p-4 flex min-h-[650px]">
				<StepsSidebar
					:steps="steps"
					:activeStepIndex="store.activeStepIndex"
					@change-step="store.goToStep($event)"
				/>

				<div
					class="w-full max-w-lg p-4 mx-auto flex flex-col gap-12"
					:class="isFormSubmitted ? 'justify-center' : 'justify-between'"
				>
					<StepsContent :isFormSubmitted="isFormSubmitted" :activeStep="activeStep" />

					<StepsNavigation
						v-show="!isFormSubmitted"
						:isFirstStep="isFirstStep"
						:isLastStep="isLastStep"
						@submit="submit()"
					/>
				</div>
			</div>
		</Container>
	</div>
</template>

<script setup>
import Container from "@/components/Container.vue";
import StepsSidebar from "@/components/StepsSidebar.vue";
import StepsContent from "@/components/StepsContent.vue";
import StepsNavigation from "@/components/StepsNavigation.vue";
import Form1 from "@/components/forms/Form1.vue";
import Form2 from "@/components/forms/Form2.vue";
import Form3 from "@/components/forms/Form3.vue";
import Form4 from "@/components/forms/Form4.vue";
import { computed, ref } from "vue";
import { useFormStore } from "@/stores/form";

const store = useFormStore();

const isFormSubmitted = ref(false);
const steps = ref([
	{
		label: "YOUR INFO",
		title: "Personal Info",
		description: "Please provide your name, email address, and phone number.",
		formComponent: Form1,
	},
	{
		label: "SELECT PLAN",
		title: "Select Your Plan",
		description: "You have the option of monthly or yearly billing.",
		formComponent: Form2,
	},
	{
		label: "ADD-ONS",
		title: "Pick add-ons",
		description: "Add-ons help enhance your gaming experience.",
		formComponent: Form3,
	},
	{
		label: "SUMMARY",
		title: "Finishing up",
		description: "Double-check everything looks OK before confirming.",
		formComponent: Form4,
	},
]);

const activeStep = computed(() => steps.value[store.activeStepIndex]);
const isFirstStep = computed(() => store.activeStepIndex === 0);
const isLastStep = computed(() => store.activeStepIndex === steps.value.length - 1);

function submit() {
	if (!store.validatePersonalInfo()) return;

	isFormSubmitted.value = true;
}
</script>
