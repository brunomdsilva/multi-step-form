<template>
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
				@click.prevent="store.backStep()"
				class="p-2 text-secondary-cool-gray hover:text-primary-marine-blue transition-colors duration-300"
			>
				Go Back
			</button>

			<button
				@click.prevent="isLastStep ? $emit('submit') : store.nextStep()"
				v-text="isLastStep ? 'Confirm' : 'Next Step'"
				class="px-8 py-3 rounded-lg text-white hover:bg-opacity-80 transition-colors duration-300"
				:class="isLastStep ? 'bg-primary-purplish-blue ' : 'bg-primary-marine-blue '"
			/>
		</div>
	</div>
</template>

<script setup>
import { useFormStore } from "@/stores/form";
import { computed } from "vue";

const props = defineProps({
	steps: Array,
});

const store = useFormStore();

const activeStep = computed(() => props.steps[store.activeStepIndex]);
const isFirstStep = computed(() => store.activeStepIndex === 0);
const isLastStep = computed(() => store.activeStepIndex === props.steps.length - 1);
</script>
