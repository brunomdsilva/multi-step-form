<template>
	<div class="min-h-screen bg-secondary-magnolia flex justify-center items-center p-4">
		<Container>
			<div class="bg-white rounded-2xl shadow-lg p-4 flex min-h-[650px]">
				<Sidebar :steps="steps" :activeStepIndex="activeStepIndex" @change-step="activeStepIndex = $event" />

				<div class="w-full max-w-lg p-6 flex flex-col gap-10 mx-auto">
					<div class="flex flex-col gap-1">
						<h2 v-text="activeStep.title" class="text-primary-marine-blue text-3xl font-bold" />
						<p v-text="activeStep.description" class="text-secondary-cool-gray" />
					</div>

					<div class="flex-grow">
						<Transition
							enter-from-class="opacity-0"
							leave-to-class="opacity-0"
							enter-active-class="transition-opacity duration-300"
							leave-active-class="transition-opacity duration-300"
							mode="out-in"
						>
							<component :is="activeStep.formComponent" />
						</Transition>
					</div>

					<div class="flex items-center gap-4" :class="isFirstStep ? 'justify-end' : 'justify-between'">
						<button
							v-if="!isFirstStep"
							@click.prevent="activeStepIndex--"
							class="p-2 text-secondary-cool-gray hover:text-primary-marine-blue transition-colors duration-300"
						>
							Go Back
						</button>

						<button
							@click.prevent="isLastStep ? submit() : activeStepIndex++"
							v-text="isLastStep ? 'Confirm' : 'Next Step'"
							class="px-8 py-3 rounded-lg text-white"
							:class="isLastStep ? 'bg-primary-purplish-blue' : 'bg-primary-marine-blue'"
						/>
					</div>
				</div>
			</div>
		</Container>
	</div>
</template>

<script setup>
import Container from "@/components/Container.vue";
import Sidebar from "@/components/Sidebar.vue";
import Form1 from "@/components/forms/Form1.vue";
import Form2 from "@/components/forms/Form2.vue";
import Form3 from "@/components/forms/Form3.vue";
import Form4 from "@/components/forms/Form4.vue";
import { computed, ref } from "vue";

const activeStepIndex = ref(0);
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

const activeStep = computed(() => steps.value[activeStepIndex.value]);
const isFirstStep = computed(() => activeStepIndex.value === 0);
const isLastStep = computed(() => activeStepIndex.value === steps.value.length - 1);

function submit() {
	console.log("submit");
}
</script>
